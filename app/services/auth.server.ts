import { redirect } from '@remix-run/node';
import { type Params } from '@remix-run/react';
import { Authenticator } from 'remix-auth';
import { GoogleStrategy } from 'remix-auth-google';
import { unauthorized } from 'remix-utils';
import { route } from 'routes-gen';
import { z } from 'zod';
import { zx } from 'zodix';
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
      onConflict: { constraint: user_email_key, update_columns: [imageUrl] }
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
      createdAt
      email
      imageUrl
      id
      name
      stripeAccountId
      stripeCustomerId
      ownerOfWorkplaces {
        id
        title
        updatedAt
        ownerId
        createdAt
      }
      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {
        workplace {
          createdAt
          id
          ownerId
          title
          updatedAt
        }
      }
    }
  }
`);

const UPDATEUSERNAME = graphql(`
  mutation UpdateUserName($id: uuid!, $name: String!) {
    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {
      name
    }
  }
`);

const DELETEUSER = graphql(`
  mutation DeleteUser($userId: uuid!) {
    deleteUserByPk(id: $userId) {
      id
    }
  }
`);

export const deleteUser = async ({ user, request }: { user: UserType; request: Request }) => {
  const deletedUser = await hasuraClient({ token: user.token }).request(DELETEUSER, { userId: user.id });

  if (deletedUser.deleteUserByPk?.id) {
    await authenticator.logout(request, { redirectTo: '/' });

    return deletedUser.deleteUserByPk?.id;
  }
  return { error: 'Error' };
};

export const updateUserName = async ({ user, name }: { user: UserType; name: string }) => {
  return await hasuraClient({ token: user.token }).request(UPDATEUSERNAME, { id: user.id, name });
};

export type UserType = Awaited<ReturnType<typeof requireUser>>;

export const requireUser = async ({
  request,
  params,
  noRedirect
}: {
  request: Request;
  params: Params<string>;
  noRedirect?: boolean;
}) => {
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

    if (!noRedirect) {
      const { workplaceId } = zx.parseParams(params, {
        workplaceId: z.string().optional()
      });
      const workplaceIds = [
        ...user.ownerOfWorkplaces.map((i) => i.id),
        ...user.memberOfWorkplaces.map((i) => i.workplace.id)
      ];
      if (workplaceIds.length <= 0) {
        throw redirect(route('/app'));
      }
      if (workplaceId && !workplaceIds.includes(workplaceId)) {
        throw redirect(route('/app/:workplaceId', { workplaceId: workplaceIds[0] }));
      }
    }
    return { ...user, token: sessionUser.token };
  } catch (error) {
    if (error instanceof Response) {
      throw error;
    }
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
