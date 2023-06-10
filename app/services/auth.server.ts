import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { unauthorized } from 'remix-utils';
import { graphql } from '~/_gql';
import { sessionStore } from '~/services/session.server';
import { env } from './env.server';
import { createHasuraToken, hasuraAdminClient, hasuraClient } from './hasura.server';

export type UserSession = {
  id: string;
  email: string;
  token: string;
};

export const authenticator = new Authenticator<UserSession>(sessionStore);

const CREATEORUPDATEUSER = graphql(`
  mutation AddUser($email: String, $name: String, $image: String) {
    insertUser(
      objects: { email: $email, name: $name, imageUrl: $image }
      onConflict: { constraint: user_email_key, update_columns: [name, imageUrl] }
    ) {
      returning {
        id
        email
        name
      }
    }
  }
`);

const GETUSERBYID = graphql(`
  query GetUserById($userId: uuid!) {
    user: userByPk(id: $userId) {
      id
      createdAt
      updatedAt
      name
      email
      imageUrl
    }
  }
`);

export type UserType = Awaited<ReturnType<typeof requireUser>>;

export const requireUser = async (request: Request) => {
  try {
    const sessionUser = await authenticator.isAuthenticated(request);

    if (!sessionUser || !sessionUser.id) {
      throw unauthorized({ messege: 'Unauthorized' });
    }

    const { user } = await hasuraClient({ token: sessionUser.token }).request(GETUSERBYID, {
      userId: sessionUser.id
    });

    if (user === undefined || !user || !user?.id) {
      throw unauthorized({ messege: 'Unauthorized' });
    }
    return { ...user, token: sessionUser.token };
  } catch (error) {
    await authenticator.logout(request, { redirectTo: '/' });
    throw error;
  }
};

export const createOrUpdateUser = async ({ email, name, image }: { email: string; name: string; image: string }) => {
  const newUser = await hasuraAdminClient().request(CREATEORUPDATEUSER, {
    name,
    email,
    image
  });

  const user = newUser.insertUser?.returning?.[0];

  if (!user?.id) {
    throw unauthorized({ messege: 'Unauthorized' });
  }
  const token = createHasuraToken(user.id);

  return { id: user.id, email: user.email, token };
};

const googleStrategy = new GoogleStrategy(
  {
    clientID: env.GOOGLE_CLIENT_ID!,
    clientSecret: env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${env.SITE_URL}/auth/google/callback`
  },
  async ({ profile }) => {
    const {
      displayName: name,
      _json: { email }
    } = profile;
    const image = profile.photos[0].value;
    return await createOrUpdateUser({
      email,
      name,
      image
    });
  }
);

authenticator.use(googleStrategy, 'google');
