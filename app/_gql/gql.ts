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
    "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: userEmailKey, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  query GetUserById($userId: Uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation UpdateUserName($id: Uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n": types.UpdateUserNameDocument,
    "\n  mutation DeleteUser($userId: Uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation CreateGiftCard($amount: Int!, $isActive: Boolean!, $workplaceId: Uuid!, $customerEmail: String) {\n    insertGiftCard(\n      objects: { amount: $amount, isActive: $isActive, workplaceId: $workplaceId, customerEmail: $customerEmail }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n": types.CreateGiftCardDocument,
    "\n  query GetGiftCards($workplaceId: Uuid!) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetGiftCardsDocument,
    "\n  query GetGiftCardsByCustomer($workplaceId: Uuid!, $email: String) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId }, customerEmail: { _ilike: $email } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          id\n          imageUrl\n          name\n        }\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetGiftCardsByCustomerDocument,
    "\n  query GetGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      workplace {\n        organization {\n          imageUrl\n        }\n      }\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          imageUrl\n          name\n        }\n      }\n      creator {\n        email\n        imageUrl\n        name\n      }\n    }\n  }\n": types.GetGiftCardByIdDocument,
    "\n  query GetPublicGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n    }\n  }\n": types.GetPublicGiftCardByIdDocument,
    "\n  mutation InsertGiftCardUsageLine($giftCardId: Uuid!, $amount: Int!) {\n    insertGiftCardUsageLine(objects: { giftCardId: $giftCardId, amount: $amount }) {\n      returning {\n        id\n      }\n    }\n  }\n": types.InsertGiftCardUsageLineDocument,
    "\n  query GetPublicOrganizations {\n    organization {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.GetPublicOrganizationsDocument,
    "\n  mutation UpdateOrganizationImage($id: Uuid!, $imageUrl: String!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { imageUrl: $imageUrl }) {\n      imageUrl\n      id\n    }\n  }\n": types.UpdateOrganizationImageDocument,
    "\n  query GetOwnedOrganizations($userId: Uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n    }\n  }\n": types.GetOwnedOrganizationsDocument,
    "\n  query GetOrganizationById($organizationId: Uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n": types.GetOrganizationByIdDocument,
    "\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: addressPkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        imageUrl\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n": types.CreateOrganizationDocument,
    "\n  mutation UpdateWorkplaceorganizationId($id: Uuid!, $organizationId: Uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n": types.UpdateWorkplaceorganizationIdDocument,
    "\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n": types.CreateAddressDocument,
    "\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: Uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n": types.UpdateOrgranizationsStripeCustomerIdDocument,
    "\n  mutation UpdateOrganizationsChargesEnabled($id: Uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n": types.UpdateOrganizationsChargesEnabledDocument,
    "\n  mutation UpdateOrganizationStripeAccount($organizationId: Uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n": types.UpdateOrganizationStripeAccountDocument,
    "\n  query SubscriptionStatus {\n    subscriptionStatus {\n      status\n      description\n    }\n  }\n": types.SubscriptionStatusDocument,
    "\n  mutation UpdateSubscriptionStatus($organizationId: Uuid!, $status: SubscriptionStatusEnum!) {\n    updateOrganization(where: { id: { _eq: $organizationId } }, _set: { stripeSubscriptionStatus: $status }) {\n      returning {\n        id\n      }\n    }\n  }\n": types.UpdateSubscriptionStatusDocument,
    "\n  mutation UpdateSubscriptionId($organizationId: Uuid!, $subscriptionId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeSubscriptionId: $subscriptionId }) {\n      id\n    }\n  }\n": types.UpdateSubscriptionIdDocument,
    "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n": types.GetAllWorkplacesDocument,
    "\n  mutation createWokrplace($title: String, $userId: Uuid!, $organizationId: Uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n": types.CreateWokrplaceDocument,
    "\n  mutation DeleteWorkplace($workplaceId: Uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n": types.DeleteWorkplaceDocument,
    "\n  query GetWorkplaceMembers($workplaceId: Uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceMembersDocument,
    "\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceInvitationsDocument,
    "\n  mutation CancelInvitation($invitationId: Uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.CancelInvitationDocument,
    "\n  mutation AcceptInvitation($userId: Uuid!, $workplaceId: Uuid!, $invitationId: Uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.AcceptInvitationDocument,
    "\n  mutation InviteUser($email: String!, $workplaceId: Uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n": types.InviteUserDocument,
    "\n  query GetWorkplaceOrganization($id: Uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceOrganizationDocument,
    "\n  mutation DeleteWorkplaceMember($userId: Uuid!, $workplaceId: Uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n": types.DeleteWorkplaceMemberDocument,
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
export function graphql(source: "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: userEmailKey, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: userEmailKey, updateColumns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: Uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: Uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      organizations {\n        id\n        createdAt\n        updatedAt\n        name\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n      }\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserName($id: Uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserName($id: Uuid!, $name: String!) {\n    updateUserByPk(pkColumns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($userId: Uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($userId: Uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGiftCard($amount: Int!, $isActive: Boolean!, $workplaceId: Uuid!, $customerEmail: String) {\n    insertGiftCard(\n      objects: { amount: $amount, isActive: $isActive, workplaceId: $workplaceId, customerEmail: $customerEmail }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGiftCard($amount: Int!, $isActive: Boolean!, $workplaceId: Uuid!, $customerEmail: String) {\n    insertGiftCard(\n      objects: { amount: $amount, isActive: $isActive, workplaceId: $workplaceId, customerEmail: $customerEmail }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGiftCards($workplaceId: Uuid!) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGiftCards($workplaceId: Uuid!) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGiftCardsByCustomer($workplaceId: Uuid!, $email: String) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId }, customerEmail: { _ilike: $email } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          id\n          imageUrl\n          name\n        }\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGiftCardsByCustomer($workplaceId: Uuid!, $email: String) {\n    giftCard(where: { workplaceId: { _eq: $workplaceId }, customerEmail: { _ilike: $email } }) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          id\n          imageUrl\n          name\n        }\n      }\n      creator {\n        name\n        id\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      workplace {\n        organization {\n          imageUrl\n        }\n      }\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          imageUrl\n          name\n        }\n      }\n      creator {\n        email\n        imageUrl\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n      workplace {\n        organization {\n          imageUrl\n        }\n      }\n      usageLines {\n        amount\n        createdAt\n        createdBy\n        giftCardId\n        id\n        updatedAt\n        creator {\n          email\n          imageUrl\n          name\n        }\n      }\n      creator {\n        email\n        imageUrl\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPublicGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n    }\n  }\n"): (typeof documents)["\n  query GetPublicGiftCardById($id: Uuid!) {\n    giftCardByPk(id: $id) {\n      amount\n      createdAt\n      createdBy\n      id\n      isActive\n      stripePaymentId\n      updatedAt\n      workplaceId\n      customerEmail\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InsertGiftCardUsageLine($giftCardId: Uuid!, $amount: Int!) {\n    insertGiftCardUsageLine(objects: { giftCardId: $giftCardId, amount: $amount }) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation InsertGiftCardUsageLine($giftCardId: Uuid!, $amount: Int!) {\n    insertGiftCardUsageLine(objects: { giftCardId: $giftCardId, amount: $amount }) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPublicOrganizations {\n    organization {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetPublicOrganizations {\n    organization {\n      id\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganizationImage($id: Uuid!, $imageUrl: String!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { imageUrl: $imageUrl }) {\n      imageUrl\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganizationImage($id: Uuid!, $imageUrl: String!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { imageUrl: $imageUrl }) {\n      imageUrl\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOwnedOrganizations($userId: Uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetOwnedOrganizations($userId: Uuid!) {\n    organizations: organization(where: { ownerId: { _eq: $userId } }) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetOrganizationById($organizationId: Uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetOrganizationById($organizationId: Uuid!) {\n    organization: organizationByPk(id: $organizationId) {\n      id\n      createdAt\n      updatedAt\n      name\n      email\n      ownerId\n      stripeAccountId\n      stripeCustomerId\n      stripeSubscriptionId\n      stripeSubscriptionStatus\n      chargesEnabled\n      imageUrl\n      address {\n        line1\n        line2\n        city\n        state\n        postalCode\n        country\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: addressPkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        imageUrl\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrganization($name: String!, $email: String!, $address: AddressInsertInput!) {\n    insertOrganization(\n      objects: {\n        name: $name\n        email: $email\n        address: { data: $address, onConflict: { constraint: addressPkey, updateColumns: [] } }\n      }\n    ) {\n      returning {\n        id\n        createdAt\n        updatedAt\n        name\n        email\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        chargesEnabled\n        imageUrl\n        address {\n          line1\n          line2\n          city\n          state\n          postalCode\n          country\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWorkplaceorganizationId($id: Uuid!, $organizationId: Uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateWorkplaceorganizationId($id: Uuid!, $organizationId: Uuid!) {\n    updateWorkplaceByPk(pkColumns: { id: $id }, _set: { organizationId: $organizationId }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAddress(\n    $state: String\n    $postalCode: String\n    $line2: String\n    $line1: String\n    $country: String\n    $city: String\n  ) {\n    insertAddress(\n      objects: { city: $city, country: $country, line1: $line1, postalCode: $postalCode, state: $state, line2: $line2 }\n    ) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: Uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrgranizationsStripeCustomerId($organizationId: Uuid!, $stripeCustomerId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      stripeCustomerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganizationsChargesEnabled($id: Uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganizationsChargesEnabled($id: Uuid!) {\n    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOrganizationStripeAccount($organizationId: Uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateOrganizationStripeAccount($organizationId: Uuid!, $stripeAccountId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubscriptionStatus {\n    subscriptionStatus {\n      status\n      description\n    }\n  }\n"): (typeof documents)["\n  query SubscriptionStatus {\n    subscriptionStatus {\n      status\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubscriptionStatus($organizationId: Uuid!, $status: SubscriptionStatusEnum!) {\n    updateOrganization(where: { id: { _eq: $organizationId } }, _set: { stripeSubscriptionStatus: $status }) {\n      returning {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubscriptionStatus($organizationId: Uuid!, $status: SubscriptionStatusEnum!) {\n    updateOrganization(where: { id: { _eq: $organizationId } }, _set: { stripeSubscriptionStatus: $status }) {\n      returning {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSubscriptionId($organizationId: Uuid!, $subscriptionId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeSubscriptionId: $subscriptionId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSubscriptionId($organizationId: Uuid!, $subscriptionId: String!) {\n    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeSubscriptionId: $subscriptionId }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"): (typeof documents)["\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWokrplace($title: String, $userId: Uuid!, $organizationId: Uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createWokrplace($title: String, $userId: Uuid!, $organizationId: Uuid) {\n    insertWorkplace(\n      objects: { title: $title, organizationId: $organizationId, workplaceMembers: { data: { userId: $userId } } }\n    ) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplace($workplaceId: Uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplace($workplaceId: Uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affectedRows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceMembers($workplaceId: Uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceMembers($workplaceId: Uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplace {\n        ownerId\n      }\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CancelInvitation($invitationId: Uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CancelInvitation($invitationId: Uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AcceptInvitation($userId: Uuid!, $workplaceId: Uuid!, $invitationId: Uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptInvitation($userId: Uuid!, $workplaceId: Uuid!, $invitationId: Uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affectedRows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InviteUser($email: String!, $workplaceId: Uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n"): (typeof documents)["\n  mutation InviteUser($email: String!, $workplaceId: Uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affectedRows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceOrganization($id: Uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceOrganization($id: Uuid!) {\n    workplaceByPk(id: $id) {\n      ownerId\n      organization {\n        name\n        id\n        email\n        createdAt\n        addressId\n        ownerId\n        stripeAccountId\n        stripeCustomerId\n        stripeSubscriptionId\n        stripeSubscriptionStatus\n        updatedAt\n        chargesEnabled\n        imageUrl\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplaceMember($userId: Uuid!, $workplaceId: Uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplaceMember($userId: Uuid!, $workplaceId: Uuid!) {\n    deleteWorkplaceMember(where: { workplaceId: { _eq: $workplaceId }, userId: { _eq: $userId } }) {\n      returning {\n        userId\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;