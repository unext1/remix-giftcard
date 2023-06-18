import { graphql } from '~/_gql';
import { type UserSession } from './auth.server';
import { hasuraClient } from './hasura.server';

const GETALLWORKPLACES = graphql(`
  query GetAllWorkplaces {
    workplace {
      id
      title
      createdAt
      updatedAt
      ownerId
    }
  }
`);

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

const GETWORKPLACEMEMBERS = graphql(`
  query GetWorkplaceMembers($workplaceId: uuid!) {
    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {
      workplaceId
      workplaceMembers: user {
        id
        name
        email
        imageUrl
      }
    }
  }
`);

const GETWORKPLACEINVITATIONS = graphql(`
  query GetWorkplaceInvitations {
    workplaceInvitation {
      id
      workplaceId
      createdAt
      workplace {
        title
      }
      workplaceInvitations: user {
        id
        name
        email
        imageUrl
      }
    }
  }
`);

const CANCELINVITATION = graphql(`
  mutation CancelInvitation($invitationId: uuid!) {
    deleteWorkplaceInvitationByPk(id: $invitationId) {
      id
    }
  }
`);

const ACCEPTINVITATION = graphql(`
  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {
    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {
      affected_rows
    }
    deleteWorkplaceInvitationByPk(id: $invitationId) {
      id
    }
  }
`);

const ADDWORKPLACEMEMBER = graphql(`
  mutation InviteUser($email: String!, $workplaceId: uuid!) {
    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {
      affected_rows
    }
  }
`);

export const getAllWorkplaces = async ({ token }: { token: string }) => {
  const { workplace } = await hasuraClient({ token }).request(GETALLWORKPLACES);

  return workplace;
};

export const addWorkplaceMember = async ({
  token,
  email,
  workplaceId
}: {
  workplaceId: string;
  token: string;
  email: string;
}) => {
  const data = await hasuraClient({ token }).request(ADDWORKPLACEMEMBER, {
    email,
    workplaceId
  });

  if (data && data.insertWorkplaceInvitation) {
    return data.insertWorkplaceInvitation.affected_rows;
  }
};

export const acceptInvitation = async ({
  user,
  workplaceId,
  invitationId
}: {
  user: UserSession;
  workplaceId: string;
  invitationId: string;
}) => {
  const data = await hasuraClient({ token: user.token }).request(ACCEPTINVITATION, {
    userId: user.id,
    workplaceId,
    invitationId
  });

  if (data && data.insertWorkplaceMember) {
    return data.insertWorkplaceMember.affected_rows;
  }
};

export const cancelInvitation = async ({ invitationId, token }: { invitationId: string; token: string }) => {
  const data = await hasuraClient({ token }).request(CANCELINVITATION, {
    invitationId
  });

  if (data && data.deleteWorkplaceInvitationByPk) {
    return data.deleteWorkplaceInvitationByPk.id;
  }
};

export type InvitationsType = Awaited<ReturnType<typeof getYourInvitations>>;
export const getYourInvitations = async ({ token }: { token: string }) => {
  const data = await hasuraClient({ token }).request(GETWORKPLACEINVITATIONS);

  if (data && data.workplaceInvitation) {
    return data.workplaceInvitation.filter((invitation) => invitation.workplaceInvitations !== null);
  }
};

export const getWorkplaceMembers = async ({ workplaceId, token }: { workplaceId: string; token: string }) => {
  const data = await hasuraClient({ token }).request(GETWORKPLACEMEMBERS, {
    workplaceId: workplaceId
  });

  if (data && data.workplaceMember) {
    return data.workplaceMember;
  }
};

export const deleteWorkplace = async ({ workplaceId, token }: { workplaceId: string; token: string }) => {
  const data = await hasuraClient({ token }).request(DELETEWORKPLACE, {
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
