/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** ordering argument of a cursor */
export type CursorOrdering =
  /** ascending ordering of the cursor */
  | 'ASC'
  /** descending ordering of the cursor */
  | 'DESC';

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** column ordering options */
export type OrderBy =
  /** in ascending order, nulls last */
  | 'ASC'
  /** in ascending order, nulls first */
  | 'ASC_NULLS_FIRST'
  /** in ascending order, nulls last */
  | 'ASC_NULLS_LAST'
  /** in descending order, nulls first */
  | 'DESC'
  /** in descending order, nulls first */
  | 'DESC_NULLS_FIRST'
  /** in descending order, nulls last */
  | 'DESC_NULLS_LAST';

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user" */
export type User = {
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** An aggregate relationship */
  memberOfWorkplacesAggregate: WorkplaceMemberAggregate;
  /** An array relationship */
  member_of_workplaces: Array<WorkplaceMember>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "user" */
export type UserMemberOfWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "user" */
export type UserMember_Of_WorkplacesArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};

/** aggregated selection of "user" */
export type UserAggregate = {
  aggregate?: Maybe<UserAggregateFields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type UserAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<UserMaxFields>;
  min?: Maybe<UserMinFields>;
};


/** aggregate fields of "user" */
export type UserAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UserSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type UserBoolExp = {
  _and?: InputMaybe<Array<UserBoolExp>>;
  _not?: InputMaybe<UserBoolExp>;
  _or?: InputMaybe<Array<UserBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  imageUrl?: InputMaybe<StringComparisonExp>;
  member_of_workplaces?: InputMaybe<WorkplaceMemberBoolExp>;
  member_of_workplaces_aggregate?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp>;
  name?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "user" */
export type UserConstraint =
  /** unique or primary key constraint on columns "email" */
  | 'user_email_key'
  /** unique or primary key constraint on columns "id" */
  | 'user_pkey';

/** input type for inserting data into table "user" */
export type UserInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  member_of_workplaces?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type UserMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type UserMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  imageUrl?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "user" */
export type UserMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type UserObjRelInsertInput = {
  data: UserInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UserOnConflict>;
};

/** on_conflict condition type for table "user" */
export type UserOnConflict = {
  constraint: UserConstraint;
  update_columns?: Array<UserUpdateColumn>;
  where?: InputMaybe<UserBoolExp>;
};

/** Ordering options when selecting data from "user". */
export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  imageUrl?: InputMaybe<OrderBy>;
  member_of_workplacesAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: user */
export type UserPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user" */
export type UserSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'imageUrl'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "user" */
export type UserSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "user" */
export type UserStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: UserStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type UserStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  imageUrl?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "user" */
export type UserUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'imageUrl'
  /** column name */
  | 'name'
  /** column name */
  | 'updatedAt';

export type UserUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UserSetInput>;
  where: UserBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "workplace" */
export type Workplace = {
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  ownerId: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An aggregate relationship */
  workplaceMembersAggregate: WorkplaceMemberAggregate;
  /** An array relationship */
  workplace_members: Array<WorkplaceMember>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceMembersAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplace_MembersArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};

/** aggregated selection of "workplace" */
export type WorkplaceAggregate = {
  aggregate?: Maybe<WorkplaceAggregateFields>;
  nodes: Array<Workplace>;
};

/** aggregate fields of "workplace" */
export type WorkplaceAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<WorkplaceMaxFields>;
  min?: Maybe<WorkplaceMinFields>;
};


/** aggregate fields of "workplace" */
export type WorkplaceAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "workplace". All fields are combined with a logical 'AND'. */
export type WorkplaceBoolExp = {
  _and?: InputMaybe<Array<WorkplaceBoolExp>>;
  _not?: InputMaybe<WorkplaceBoolExp>;
  _or?: InputMaybe<Array<WorkplaceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplace_members?: InputMaybe<WorkplaceMemberBoolExp>;
  workplace_members_aggregate?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "workplace" */
export type WorkplaceConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'workplace_pkey';

/** input type for inserting data into table "workplace" */
export type WorkplaceInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  workplace_members?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
};

/** aggregate max on columns */
export type WorkplaceMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** columns and relationships of "workplace_member" */
export type WorkplaceMember = {
  /** An object relationship */
  user: User;
  userId: Scalars['uuid']['output'];
  /** An object relationship */
  workplace: Workplace;
  workplaceId: Scalars['uuid']['output'];
};

/** aggregated selection of "workplace_member" */
export type WorkplaceMemberAggregate = {
  aggregate?: Maybe<WorkplaceMemberAggregateFields>;
  nodes: Array<WorkplaceMember>;
};

/** aggregate fields of "workplace_member" */
export type WorkplaceMemberAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<WorkplaceMemberMaxFields>;
  min?: Maybe<WorkplaceMemberMinFields>;
};


/** aggregate fields of "workplace_member" */
export type WorkplaceMemberAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workplace_member" */
export type WorkplaceMemberAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Workplace_Member_Max_Order_By>;
  min?: InputMaybe<Workplace_Member_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workplace_member" */
export type WorkplaceMemberArrRelInsertInput = {
  data: Array<WorkplaceMemberInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};

/** Boolean expression to filter rows from the table "workplace_member". All fields are combined with a logical 'AND'. */
export type WorkplaceMemberBoolExp = {
  _and?: InputMaybe<Array<WorkplaceMemberBoolExp>>;
  _not?: InputMaybe<WorkplaceMemberBoolExp>;
  _or?: InputMaybe<Array<WorkplaceMemberBoolExp>>;
  user?: InputMaybe<UserBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
  workplace?: InputMaybe<WorkplaceBoolExp>;
  workplaceId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "workplace_member" */
export type WorkplaceMemberConstraint =
  /** unique or primary key constraint on columns "workplace_id", "user_id" */
  | 'workplace_member_pkey';

/** input type for inserting data into table "workplace_member" */
export type WorkplaceMemberInsertInput = {
  user?: InputMaybe<UserObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']['input']>;
  workplace?: InputMaybe<WorkplaceObjRelInsertInput>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type WorkplaceMemberMaxFields = {
  userId?: Maybe<Scalars['uuid']['output']>;
  workplaceId?: Maybe<Scalars['uuid']['output']>;
};

/** aggregate min on columns */
export type WorkplaceMemberMinFields = {
  userId?: Maybe<Scalars['uuid']['output']>;
  workplaceId?: Maybe<Scalars['uuid']['output']>;
};

/** response of any mutation on the table "workplace_member" */
export type WorkplaceMemberMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkplaceMember>;
};

/** on_conflict condition type for table "workplace_member" */
export type WorkplaceMemberOnConflict = {
  constraint: WorkplaceMemberConstraint;
  update_columns?: Array<WorkplaceMemberUpdateColumn>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};

/** Ordering options when selecting data from "workplace_member". */
export type WorkplaceMemberOrderBy = {
  user?: InputMaybe<UserOrderBy>;
  userId?: InputMaybe<OrderBy>;
  workplace?: InputMaybe<WorkplaceOrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: workplace_member */
export type WorkplaceMemberPkColumnsInput = {
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
};

/** select columns of table "workplace_member" */
export type WorkplaceMemberSelectColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

/** input type for updating data in table "workplace_member" */
export type WorkplaceMemberSetInput = {
  userId?: InputMaybe<Scalars['uuid']['input']>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "workplace_member" */
export type WorkplaceMemberStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkplaceMemberStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkplaceMemberStreamCursorValueInput = {
  userId?: InputMaybe<Scalars['uuid']['input']>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "workplace_member" */
export type WorkplaceMemberUpdateColumn =
  /** column name */
  | 'userId'
  /** column name */
  | 'workplaceId';

export type WorkplaceMemberUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  where: WorkplaceMemberBoolExp;
};

/** aggregate min on columns */
export type WorkplaceMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "workplace" */
export type WorkplaceMutationResponse = {
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Workplace>;
};

/** input type for inserting object relation for remote table "workplace" */
export type WorkplaceObjRelInsertInput = {
  data: WorkplaceInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};

/** on_conflict condition type for table "workplace" */
export type WorkplaceOnConflict = {
  constraint: WorkplaceConstraint;
  update_columns?: Array<WorkplaceUpdateColumn>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

/** Ordering options when selecting data from "workplace". */
export type WorkplaceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplace_membersAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
};

/** primary key columns input for table: workplace */
export type WorkplacePkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "workplace" */
export type WorkplaceSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'title'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "workplace" */
export type WorkplaceSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "workplace" */
export type WorkplaceStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkplaceStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkplaceStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "workplace" */
export type WorkplaceUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'title'
  /** column name */
  | 'updatedAt';

export type WorkplaceUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceSetInput>;
  where: WorkplaceBoolExp;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "user" */
  deleteUser?: Maybe<UserMutationResponse>;
  /** delete single row from the table: "user" */
  deleteUserByPk?: Maybe<User>;
  /** delete data from the table: "workplace" */
  deleteWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** delete single row from the table: "workplace" */
  deleteWorkplaceByPk?: Maybe<Workplace>;
  /** delete data from the table: "workplace_member" */
  deleteWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** delete single row from the table: "workplace_member" */
  deleteWorkplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** insert data into the table: "user" */
  insertUser?: Maybe<UserMutationResponse>;
  /** insert a single row into the table: "user" */
  insertUserOne?: Maybe<User>;
  /** insert data into the table: "workplace" */
  insertWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** insert data into the table: "workplace_member" */
  insertWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** insert a single row into the table: "workplace_member" */
  insertWorkplaceMemberOne?: Maybe<WorkplaceMember>;
  /** insert a single row into the table: "workplace" */
  insertWorkplaceOne?: Maybe<Workplace>;
  /** update data of the table: "user" */
  updateUser?: Maybe<UserMutationResponse>;
  /** update single row of the table: "user" */
  updateUserByPk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  updateUserMany?: Maybe<Array<Maybe<UserMutationResponse>>>;
  /** update data of the table: "workplace" */
  updateWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** update single row of the table: "workplace" */
  updateWorkplaceByPk?: Maybe<Workplace>;
  /** update multiples rows of table: "workplace" */
  updateWorkplaceMany?: Maybe<Array<Maybe<WorkplaceMutationResponse>>>;
  /** update data of the table: "workplace_member" */
  updateWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** update single row of the table: "workplace_member" */
  updateWorkplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** update multiples rows of table: "workplace_member" */
  updateWorkplaceMemberMany?: Maybe<Array<Maybe<WorkplaceMemberMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteUserArgs = {
  where: UserBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUserByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceArgs = {
  where: WorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceMemberArgs = {
  where: WorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsertUserArgs = {
  objects: Array<UserInsertInput>;
  onConflict?: InputMaybe<UserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUserOneArgs = {
  object: UserInsertInput;
  onConflict?: InputMaybe<UserOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceArgs = {
  objects: Array<WorkplaceInsertInput>;
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceMemberArgs = {
  objects: Array<WorkplaceMemberInsertInput>;
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceMemberOneArgs = {
  object: WorkplaceMemberInsertInput;
  onConflict?: InputMaybe<WorkplaceMemberOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceOneArgs = {
  object: WorkplaceInsertInput;
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _set?: InputMaybe<UserSetInput>;
  where: UserBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserByPkArgs = {
  _set?: InputMaybe<UserSetInput>;
  pk_columns: UserPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUserManyArgs = {
  updates: Array<UserUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceArgs = {
  _set?: InputMaybe<WorkplaceSetInput>;
  where: WorkplaceBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceByPkArgs = {
  _set?: InputMaybe<WorkplaceSetInput>;
  pk_columns: WorkplacePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceManyArgs = {
  updates: Array<WorkplaceUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberArgs = {
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  where: WorkplaceMemberBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberByPkArgs = {
  _set?: InputMaybe<WorkplaceMemberSetInput>;
  pk_columns: WorkplaceMemberPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberManyArgs = {
  updates: Array<WorkplaceMemberUpdates>;
};

export type Query_Root = {
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "workplace" */
  workplace: Array<Workplace>;
  /** fetch aggregated fields from the table: "workplace" */
  workplaceAggregate: WorkplaceAggregate;
  /** fetch data from the table: "workplace" using primary key columns */
  workplaceByPk?: Maybe<Workplace>;
  /** fetch data from the table: "workplace_member" */
  workplaceMember: Array<WorkplaceMember>;
  /** fetch aggregated fields from the table: "workplace_member" */
  workplaceMemberAggregate: WorkplaceMemberAggregate;
  /** fetch data from the table: "workplace_member" using primary key columns */
  workplaceMemberByPk?: Maybe<WorkplaceMember>;
};


export type Query_RootUserArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Query_RootUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Query_RootUserByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Query_RootWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Query_RootWorkplaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Query_RootWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Query_RootWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
};

export type Subscription_Root = {
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: UserAggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  userStream: Array<User>;
  /** fetch data from the table: "workplace" */
  workplace: Array<Workplace>;
  /** fetch aggregated fields from the table: "workplace" */
  workplaceAggregate: WorkplaceAggregate;
  /** fetch data from the table: "workplace" using primary key columns */
  workplaceByPk?: Maybe<Workplace>;
  /** fetch data from the table: "workplace_member" */
  workplaceMember: Array<WorkplaceMember>;
  /** fetch aggregated fields from the table: "workplace_member" */
  workplaceMemberAggregate: WorkplaceMemberAggregate;
  /** fetch data from the table: "workplace_member" using primary key columns */
  workplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** fetch data from the table in a streaming manner: "workplace_member" */
  workplaceMemberStream: Array<WorkplaceMember>;
  /** fetch data from the table in a streaming manner: "workplace" */
  workplaceStream: Array<Workplace>;
};


export type Subscription_RootUserArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootUserAggregateArgs = {
  distinctOn?: InputMaybe<Array<UserSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<UserOrderBy>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootUserByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUserStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<UserStreamCursorInput>>;
  where?: InputMaybe<UserBoolExp>;
};


export type Subscription_RootWorkplaceArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Subscription_RootWorkplaceAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


export type Subscription_RootWorkplaceByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkplaceMemberArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceMemberAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceMemberByPkArgs = {
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
};


export type Subscription_RootWorkplaceMemberStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<WorkplaceMemberStreamCursorInput>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


export type Subscription_RootWorkplaceStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<WorkplaceStreamCursorInput>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

export type Workplace_Member_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workplace_Member_Aggregate_Bool_Exp_Count>;
};

export type Workplace_Member_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<WorkplaceMemberBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "workplace_member" */
export type Workplace_Member_Max_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "workplace_member" */
export type Workplace_Member_Min_Order_By = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

export type AddUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddUserMutation = { insertUser?: { returning: Array<{ id: string, email: string, name: string }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type GetUserByIdQuery = { user?: { id: string, createdAt: string, updatedAt: string, name: string, email: string, imageUrl?: string | null } | null };


export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"user_email_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"name"},{"kind":"EnumValue","value":"imageUrl"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"userByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;