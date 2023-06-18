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
    "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      stripeAccountId\n      stripeCustomerId\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n": types.UpdateUserNameDocument,
    "\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n": types.DeleteUserDocument,
    "\n  mutation UpdateUserStripeAccount($id: uuid!, $stripeAccountId: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n": types.UpdateUserStripeAccountDocument,
    "\n  query GetStripeAccount($userId: uuid!) {\n    userByPk(id: $userId) {\n      stripeAccount {\n        ... on Account {\n          id\n          email\n          settings {\n            dashboard {\n              display_name\n            }\n          }\n          charges_enabled\n        }\n      }\n    }\n  }\n": types.GetStripeAccountDocument,
    "\n  mutation UpdateCustomerId($userId: uuid!, $stripeCustomerId: String!) {\n    updateUserByPk(pk_columns: { id: $userId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      id\n    }\n  }\n": types.UpdateCustomerIdDocument,
    "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n": types.GetAllWorkplacesDocument,
    "\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n": types.CreateWokrplaceDocument,
    "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n": types.DeleteWorkplaceDocument,
    "\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceMembersDocument,
    "\n  query GetWorkplaceInvitations {\n    workplaceInvitation {\n      id\n      workplaceId\n      createdAt\n      workplace {\n        title\n      }\n      workplaceInvitations: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n": types.GetWorkplaceInvitationsDocument,
    "\n  mutation CancelInvitation($invitationId: uuid!) {\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.CancelInvitationDocument,
    "\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affected_rows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n": types.AcceptInvitationDocument,
    "\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affected_rows\n    }\n  }\n": types.InviteUserDocument,
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
export function graphql(source: "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      stripeAccountId\n      stripeCustomerId\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      stripeAccountId\n      stripeCustomerId\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteUser($userId: uuid!) {\n    deleteUserByPk(id: $userId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserStripeAccount($id: uuid!, $stripeAccountId: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserStripeAccount($id: uuid!, $stripeAccountId: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { stripeAccountId: $stripeAccountId }) {\n      stripeAccountId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetStripeAccount($userId: uuid!) {\n    userByPk(id: $userId) {\n      stripeAccount {\n        ... on Account {\n          id\n          email\n          settings {\n            dashboard {\n              display_name\n            }\n          }\n          charges_enabled\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetStripeAccount($userId: uuid!) {\n    userByPk(id: $userId) {\n      stripeAccount {\n        ... on Account {\n          id\n          email\n          settings {\n            dashboard {\n              display_name\n            }\n          }\n          charges_enabled\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCustomerId($userId: uuid!, $stripeCustomerId: String!) {\n    updateUserByPk(pk_columns: { id: $userId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateCustomerId($userId: uuid!, $stripeCustomerId: String!) {\n    updateUserByPk(pk_columns: { id: $userId }, _set: { stripeCustomerId: $stripeCustomerId }) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"): (typeof documents)["\n  query GetAllWorkplaces {\n    workplace {\n      id\n      title\n      createdAt\n      updatedAt\n      ownerId\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetWorkplaceMembers($workplaceId: uuid!) {\n    workplaceMember(where: { workplaceId: { _eq: $workplaceId } }) {\n      workplaceId\n      workplaceMembers: user {\n        id\n        name\n        email\n        imageUrl\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affected_rows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AcceptInvitation($userId: uuid!, $workplaceId: uuid!, $invitationId: uuid!) {\n    insertWorkplaceMember(objects: { workplaceId: $workplaceId, userId: $userId }) {\n      affected_rows\n    }\n    deleteWorkplaceInvitationByPk(id: $invitationId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affected_rows\n    }\n  }\n"): (typeof documents)["\n  mutation InviteUser($email: String!, $workplaceId: uuid!) {\n    insertWorkplaceInvitation(objects: { email: $email, workplaceId: $workplaceId }) {\n      affected_rows\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;