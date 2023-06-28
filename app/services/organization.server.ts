import { graphql } from '~/_gql';
import { type UserType, type UserSession } from './auth.server';
import { hasuraClient } from './hasura.server';
import { createStripeAccount, updateOrganizationsCustomerId } from './stripe.server';

const GETOWNEDORGANIZATIONS = graphql(`
  query GetOwnedOrganizations($userId: uuid!) {
    organizations: organization(where: { ownerId: { _eq: $userId } }) {
      id
      createdAt
      updatedAt
      name
      email
      ownerId
      stripeAccountId
      stripeCustomerId
      stripeSubscriptionId
      stripeSubscriptionStatus
    }
  }
`);

const GETORGANIZATIONBYID = graphql(`
  query GetOrganizationById($organizationId: uuid!) {
    organization: organizationByPk(id: $organizationId) {
      id
      createdAt
      updatedAt
      name
      email
      ownerId
      stripeAccountId
      stripeCustomerId
      stripeSubscriptionId
      stripeSubscriptionStatus
      address {
        line1
        line2
        city
        state
        postalCode
        country
      }
    }
  }
`);

const CREATEORGANIZATION = graphql(`
  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {
    insertOrganization(
      objects: {
        name: $name
        email: $email
        address: { data: $address, onConflict: { constraint: address_pkey, update_columns: [] } }
      }
    ) {
      returning {
        id
        createdAt
        updatedAt
        name
        email
        ownerId
        stripeAccountId
        stripeCustomerId
        stripeSubscriptionId
        stripeSubscriptionStatus
        address {
          line1
          line2
          city
          state
          postalCode
          country
        }
      }
    }
  }
`);

const UPDATEWORKPLACEORGID = graphql(`
  mutation UpdateWorkplaceorganizationId($id: uuid!, $organizationId: uuid!) {
    updateWorkplaceByPk(pk_columns: { id: $id }, _set: { organizationId: $organizationId }) {
      id
    }
  }
`);

const CREATEADRESS = graphql(`
  mutation CreateAddress(
    $state: String
    $postalCode: String
    $line2: String
    $line1: String
    $country: String
    $city: String
  ) {
    insertAddress(
      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }
    ) {
      returning {
        id
      }
    }
  }
`);

export type OrganizationType = Awaited<ReturnType<typeof getOrganizationById>>;

export const getOrganizationById = async ({ user, organizationId }: { user: UserSession; organizationId: string }) => {
  const { organization } = await hasuraClient({ token: user.token }).request(GETORGANIZATIONBYID, {
    organizationId
  });
  if (!organization) {
    throw new Error('organization not found');
  }

  return organization;
};

export const getOwnedOrganizations = async ({ user }: { user: UserType }) => {
  const { organizations } = await hasuraClient({ token: user.token }).request(GETOWNEDORGANIZATIONS, {
    userId: user.id
  });

  return organizations;
};

export const createNewOrganization = async ({
  user,
  name,
  email,
  business_type,
  workplaceId,
  address
}: {
  user: UserType;
  name: string;
  email: string;
  business_type: 'individual' | 'company';
  workplaceId: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}) => {
  if (user.organizations.length > 0) {
    throw new Error('user already has an organization');
  }

  const organization = await hasuraClient({ token: user.token }).request(CREATEORGANIZATION, {
    name: name,
    email: email,
    address: address
  });
  if (!organization.insertOrganization?.returning) {
    throw new Error('organization was not created');
  }
  console.log(organization.insertOrganization.returning[0].id);

  console.log({
    id: workplaceId,
    organizationId: organization.insertOrganization?.returning[0].id
  });
  const created = await hasuraClient({ token: user.token }).request(UPDATEWORKPLACEORGID, {
    id: workplaceId,
    organizationId: organization.insertOrganization?.returning[0].id
  });
  console.log(created);

  await updateOrganizationsCustomerId({
    email: email,
    user: user,
    organizationId: organization.insertOrganization?.returning[0].id
  });

  console.log('PADARYRTA');

  const stipeAccountLink = await createStripeAccount({
    organization: organization.insertOrganization?.returning[0],
    user,
    business_type,
    return_url: `http://localhost:3000/app/${workplaceId}/settings/organization`
  });

  return stipeAccountLink;
};
