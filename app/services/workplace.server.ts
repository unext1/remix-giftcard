import { graphql } from '~/_gql';
import { type UserSession, type UserType } from './auth.server';
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
  mutation createWokrplace($title: String, $userId: Uuid!, $organizationId: Uuid) {
    insertWorkplace(
      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }
    ) {
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
  mutation DeleteWorkplace($workplaceId: Uuid!) {
    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {
      affectedRows
    }
  }
`);

const GETWORKPLACEMEMBERS = graphql(`
  query GetWorkplaceMembers($workplaceId: Uuid!) {
    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {
      workplaceId
      workplace {
        ownerId
      }
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
  mutation CancelInvitation($invitationId: Uuid!) {
    deleteWorkplaceInvitationByPk(id: $invitationId) {
      id
    }
  }
`);

const ACCEPTINVITATION = graphql(`
  mutation AcceptInvitation($userId: Uuid!, $workplaceId: Uuid!, $invitationId: Uuid!) {
    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {
      affectedRows
    }
    deleteWorkplaceInvitationByPk(id: $invitationId) {
      id
    }
  }
`);

const ADDWORKPLACEMEMBER = graphql(`
  mutation InviteUser($email: String!, $workplaceId: Uuid!) {
    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {
      affectedRows
    }
  }
`);

const GETWORKPLACESORGANIZATION = graphql(`
  query GetWorkplaceOrganization($id: Uuid!) {
    workplaceByPk(id: $id) {
      ownerId
      organization {
        name
        id
        email
        createdAt
        addressId
        ownerId
        stripeAccountId
        stripeCustomerId
        stripeSubscriptionId
        stripeSubscriptionStatus
        updatedAt
        chargesEnabled
        imageUrl
      }
    }
  }
`);

const DELETEWORKPLACEMEMBER = graphql(`
  mutation DeleteWorkplaceMember($userId: Uuid!, $workplaceId: Uuid!) {
    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {
      returning {
        userId
      }
    }
  }
`);

export const deleteWorkplaceMember = async ({
  token,
  userId,
  workplaceId
}: {
  token: string;
  userId: string;
  workplaceId: string;
}) => {
  const data = await hasuraClient({ token }).request(DELETEWORKPLACEMEMBER, {
    userId: userId,
    workplaceId: workplaceId
  });
  return data;
};

export const getWorkplaceOrganization = async ({ workplaceId, token }: { workplaceId: string; token: string }) => {
  const { workplaceByPk } = await hasuraClient({ token }).request(GETWORKPLACESORGANIZATION, { id: workplaceId });

  return workplaceByPk;
};

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
    return data.insertWorkplaceInvitation.affectedRows;
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
    return data.insertWorkplaceMember.affectedRows;
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
    return data.deleteWorkplace.affectedRows;
  }
};

export const createWorkplace = async ({
  title,
  user,
  organizationId
}: {
  title: string;
  user: UserType;
  organizationId?: string | null;
}) => {
  const workplaceCount = user?.organizations?.stripeSubscriptionId ? 3 : 1;
  if (workplaceCount > user.ownerOfWorkplaces.length) {
    const data = await hasuraClient({ token: user.token }).request(CREATEWORKPLACE, {
      title: title,
      userId: user.id,
      organizationId: organizationId
    });

    if (data && data.insertWorkplace) {
      return data.insertWorkplace.returning;
    }
  }
  throw new Error(`You cannot create more than ${workplaceCount} ${workplaceCount === 1 ? 'workplace' : 'workplaces'}`);
};
