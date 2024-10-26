/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "#graphql\n    mutation CreateTweet($data: CreateTweetData!) {\n        CreateTweet(data: $data) {\n            id\n            content\n        }\n    }\n": types.CreateTweetDocument,
    "#graphql\n    mutation signupUser($user: SignupUser) {\n    SignupUser(user: $user)\n  }\n  ": types.SignupUserDocument,
    "#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            author {\n            firstName\n            lastName\n            id\n            }\n        }\n    }\n\n": types.GetAllTweetsDocument,
    "#graphql\n    query loginUser($loginCred: LoginCred) {\n    LoginUser(loginCred: $loginCred)\n}\n": types.LoginUserDocument,
    "#graphql\n    query getCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    password\n  }\n}": types.GetCurrentUserDocument,
    "#graphql\n  query getUserById($id: ID) {\n    getUserById(Id: $id) {\n      id\n      firstName\n      lastName\n      tweets {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n": types.GetUserByIdDocument,
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
export function graphql(source: "#graphql\n    mutation CreateTweet($data: CreateTweetData!) {\n        CreateTweet(data: $data) {\n            id\n            content\n        }\n    }\n"): (typeof documents)["#graphql\n    mutation CreateTweet($data: CreateTweetData!) {\n        CreateTweet(data: $data) {\n            id\n            content\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    mutation signupUser($user: SignupUser) {\n    SignupUser(user: $user)\n  }\n  "): (typeof documents)["#graphql\n    mutation signupUser($user: SignupUser) {\n    SignupUser(user: $user)\n  }\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            author {\n            firstName\n            lastName\n            id\n            }\n        }\n    }\n\n"): (typeof documents)["#graphql\n    query GetAllTweets {\n        getAllTweets {\n            id\n            content\n            author {\n            firstName\n            lastName\n            id\n            }\n        }\n    }\n\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query loginUser($loginCred: LoginCred) {\n    LoginUser(loginCred: $loginCred)\n}\n"): (typeof documents)["#graphql\n    query loginUser($loginCred: LoginCred) {\n    LoginUser(loginCred: $loginCred)\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query getCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    password\n  }\n}"): (typeof documents)["#graphql\n    query getCurrentUser {\n  getCurrentUser {\n    id\n    firstName\n    lastName\n    email\n    password\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n  query getUserById($id: ID) {\n    getUserById(Id: $id) {\n      id\n      firstName\n      lastName\n      tweets {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"): (typeof documents)["#graphql\n  query getUserById($id: ID) {\n    getUserById(Id: $id) {\n      id\n      firstName\n      lastName\n      tweets {\n        id\n        content\n        author {\n          id\n          firstName\n          lastName\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;