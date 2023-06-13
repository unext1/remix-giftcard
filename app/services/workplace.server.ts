import { Authenticator } from 'remix-auth';
import { graphql } from '~/_gql';
import { hasuraClient } from './hasura.server';
import { sessionStore } from './session.server';

export type UserSession = {
  id: string;
  email: string;
  token: string;
};

export const authenticator = new Authenticator<UserSession>(sessionStore);

const CREATEWORKPLACE = graphql(`
  mutation createWokrplace($title: String, $userId: uuid!) {
    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {
      returning {
        title
        id
        createdAt
        ownerId
        updatedAt
      }
    }
  }
`);

const DELETEWORKPLACE = graphql(`
  mutation DeleteWorkplace($workplaceId: uuid!) {
    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {
      affected_rows
    }
  }
`);

export const deleteWorkplace = async ({ workplaceId, user: user }: { workplaceId: string; user: UserSession }) => {
  const data = await hasuraClient({ token: user.token }).request(DELETEWORKPLACE, {
    workplaceId: workplaceId
  });

  if (data && data.deleteWorkplace) {
    return data.deleteWorkplace.affected_rows;
  }
};

export const createWorkplace = async ({ title, sessionUser }: { title: string; sessionUser: UserSession }) => {
  const data = await hasuraClient({ token: sessionUser.token }).request(CREATEWORKPLACE, {
    title: title,
    userId: sessionUser.id
  });

  if (data && data.insertWorkplace) {
    return data.insertWorkplace.returning;
  }
};
