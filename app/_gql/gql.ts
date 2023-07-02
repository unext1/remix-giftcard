/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n": types.UpdateUserNameDocument,
    "\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  query GetOwnedOrganizations($userId: uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n    }\n  }\n": types.GetOwnedOrganizationsDocument,
    "\n  query GetOrganizationById($organizationId: uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n": types.GetOrganizationByIdDocument,
    "\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: address_pkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n": types.CreateOrganizationDocument,
    "\n  mutation UpdateWorkplaceorganizationId($id: uuid!, $organizationId: uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n": types.UpdateWorkplaceorganizationIdDocument,
    "\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n": types.CreateAddressDocument,
    "\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n": types.UpdateOrgranizationsStripeCustomerIdDocument,
    "\n  mutation UpdateOrganizationsChargesEnabled($id: uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n": types.UpdateOrganizationsChargesEnabledDocument,
    "\n  mutation UpdateOrganizationStripeAccount($organizationId: uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n": types.UpdateOrganizationStripeAccountDocument,
    "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n": types.GetAllWorkplacesDocument,
    "\n  mutation createWokrplace($title: String, $userId: uuid!, $organizationId: uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n": types.CreateWokrplaceDocument,
    "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n": types.DeleteWorkplaceDocument,
    "\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceMembersDocument,
    "\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceInvitationsDocument,
    "\n  mutation CancelInvitation($invitationId: uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.CancelInvitationDocument,
    "\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.AcceptInvitationDocument,
    "\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n": types.InviteUserDocument,
    "\n  query GetWorkplaceOrganization($id: uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n      }\n    }\n  }\n": types.GetWorkplaceOrganizationDocument,
    "\n  mutation DeleteWorkplaceMember($userId: uuid!, $workplaceId: uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n": types.DeleteWorkplaceMemberDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOwnedOrganizations($userId: uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n    }\n  }\n"): (typeof documents)["\n  query GetOwnedOrganizations($userId: uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrganizationById($organizationId: uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrganizationById($organizationId: uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: address_pkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: address_pkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkplaceorganizationId($id: uuid!, $organizationId: uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkplaceorganizationId($id: uuid!, $organizationId: uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganizationsChargesEnabled($id: uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganizationsChargesEnabled($id: uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganizationStripeAccount($organizationId: uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganizationStripeAccount($organizationId: uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"): (typeof documents)["\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWokrplace($title: String, $userId: uuid!, $organizationId: uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createWokrplace($title: String, $userId: uuid!, $organizationId: uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelInvitation($invitationId: uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CancelInvitation($invitationId: uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n"): (typeof documents)["\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceOrganization($id: uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceOrganization($id: uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplaceMember($userId: uuid!, $workplaceId: uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplaceMember($userId: uuid!, $workplaceId: uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;