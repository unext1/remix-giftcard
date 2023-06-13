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
    "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [name, imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n": types.AddUserDocument,
    "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
    "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n": types.UpdateUserNameDocument,
    "\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n": types.CreateWokrplaceDocument,
    "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n": types.DeleteWorkplaceDocument,
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
export function graphql(source: "\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [name, imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddUser($email: String, $name: String, $image: String) {\n    insertUser(\n      objects: { email: $email, name: $name, imageUrl: $image }\n      onConflict: { constraint: user_email_key, update_columns: [name, imageUrl] }\n    ) {\n      returning {\n        id\n        email\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUserById($userId: uuid!) {\n    user: userByPk(id: $userId) {\n      createdAt\n      email\n      imageUrl\n      id\n      name\n      ownerOfWorkplaces {\n        id\n        title\n        updatedAt\n        ownerId\n        createdAt\n      }\n      memberOfWorkplaces(where: { workplace: { ownerId: { _neq: $userId } } }) {\n        workplace {\n          createdAt\n          id\n          ownerId\n          title\n          updatedAt\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUserName($id: uuid!, $name: String!) {\n    updateUserByPk(pk_columns: { id: $id }, _set: { name: $name }) {\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createWokrplace($title: String, $userId: uuid!) {\n    insertWorkplace(objects: { title: $title, workplaceMembers: { data: { userId: $userId } } }) {\n      returning {\n        title\n        id\n        createdAt\n        ownerId\n        updatedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteWorkplace($workplaceId: uuid!) {\n    deleteWorkplace(where: { id: { _eq: $workplaceId } }) {\n      affected_rows\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;