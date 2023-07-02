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
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** columns and relationships of "address" */
export type Address = {
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  organizations: Array<Organization>;
  /** An aggregate relationship */
  organizationsAggregate: OrganizationAggregate;
  postalCode: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "address" */
export type AddressOrganizationsArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


/** columns and relationships of "address" */
export type AddressOrganizationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};

/** aggregated selection of "address" */
export type AddressAggregate = {
  aggregate?: Maybe<AddressAggregateFields>;
  nodes: Array<Address>;
};

/** aggregate fields of "address" */
export type AddressAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<AddressMaxFields>;
  min?: Maybe<AddressMinFields>;
};


/** aggregate fields of "address" */
export type AddressAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<AddressSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "address". All fields are combined with a logical 'AND'. */
export type AddressBoolExp = {
  _and?: InputMaybe<Array<AddressBoolExp>>;
  _not?: InputMaybe<AddressBoolExp>;
  _or?: InputMaybe<Array<AddressBoolExp>>;
  city?: InputMaybe<StringComparisonExp>;
  country?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  line1?: InputMaybe<StringComparisonExp>;
  line2?: InputMaybe<StringComparisonExp>;
  organizations?: InputMaybe<OrganizationBoolExp>;
  organizationsAggregate?: InputMaybe<OrganizationAggregateBoolExp>;
  postalCode?: InputMaybe<StringComparisonExp>;
  state?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "address" */
export type AddressConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'address_pkey';

/** input type for inserting data into table "address" */
export type AddressInsertInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<OrganizationArrRelInsertInput>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type AddressMaxFields = {
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type AddressMinFields = {
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  line1?: Maybe<Scalars['String']['output']>;
  line2?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "address" */
export type AddressMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Address>;
};

/** input type for inserting object relation for remote table "address" */
export type AddressObjRelInsertInput = {
  data: AddressInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<AddressOnConflict>;
};

/** on_conflict condition type for table "address" */
export type AddressOnConflict = {
  constraint: AddressConstraint;
  updateColumns?: Array<AddressUpdateColumn>;
  where?: InputMaybe<AddressBoolExp>;
};

/** Ordering options when selecting data from "address". */
export type AddressOrderBy = {
  city?: InputMaybe<OrderBy>;
  country?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  line1?: InputMaybe<OrderBy>;
  line2?: InputMaybe<OrderBy>;
  organizationsAggregate?: InputMaybe<OrganizationAggregateOrderBy>;
  postalCode?: InputMaybe<OrderBy>;
  state?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: address */
export type AddressPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "address" */
export type AddressSelectColumn =
  /** column name */
  | 'city'
  /** column name */
  | 'country'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'line1'
  /** column name */
  | 'line2'
  /** column name */
  | 'postalCode'
  /** column name */
  | 'state'
  /** column name */
  | 'updatedAt';

/** input type for updating data in table "address" */
export type AddressSetInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "address" */
export type AddressStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: AddressStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type AddressStreamCursorValueInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "address" */
export type AddressUpdateColumn =
  /** column name */
  | 'city'
  /** column name */
  | 'country'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'id'
  /** column name */
  | 'line1'
  /** column name */
  | 'line2'
  /** column name */
  | 'postalCode'
  /** column name */
  | 'state'
  /** column name */
  | 'updatedAt';

export type AddressUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<AddressSetInput>;
  /** filter the rows which have to be updated */
  where: AddressBoolExp;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type BooleanComparisonExp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
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

/** columns and relationships of "organization" */
export type Organization = {
  /** An object relationship */
  address: Address;
  addressId: Scalars['uuid']['output'];
  chargesEnabled?: Maybe<Scalars['Boolean']['output']>;
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  /** An object relationship */
  owner: User;
  ownerId: Scalars['uuid']['output'];
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionStatus?: Maybe<SubscriptionStatusEnum>;
  updatedAt: Scalars['timestamptz']['output'];
  /** An array relationship */
  workplaces: Array<Workplace>;
  /** An aggregate relationship */
  workplacesAggregate: WorkplaceAggregate;
};


/** columns and relationships of "organization" */
export type OrganizationWorkplacesArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


/** columns and relationships of "organization" */
export type OrganizationWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

/** aggregated selection of "organization" */
export type OrganizationAggregate = {
  aggregate?: Maybe<OrganizationAggregateFields>;
  nodes: Array<Organization>;
};

export type OrganizationAggregateBoolExp = {
  bool_and?: InputMaybe<OrganizationAggregateBoolExpBool_And>;
  bool_or?: InputMaybe<OrganizationAggregateBoolExpBool_Or>;
  count?: InputMaybe<OrganizationAggregateBoolExpCount>;
};

/** aggregate fields of "organization" */
export type OrganizationAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<OrganizationMaxFields>;
  min?: Maybe<OrganizationMinFields>;
};


/** aggregate fields of "organization" */
export type OrganizationAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<OrganizationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "organization" */
export type OrganizationAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<OrganizationMaxOrderBy>;
  min?: InputMaybe<OrganizationMinOrderBy>;
};

/** input type for inserting array relation for remote table "organization" */
export type OrganizationArrRelInsertInput = {
  data: Array<OrganizationInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<OrganizationOnConflict>;
};

/** Boolean expression to filter rows from the table "organization". All fields are combined with a logical 'AND'. */
export type OrganizationBoolExp = {
  _and?: InputMaybe<Array<OrganizationBoolExp>>;
  _not?: InputMaybe<OrganizationBoolExp>;
  _or?: InputMaybe<Array<OrganizationBoolExp>>;
  address?: InputMaybe<AddressBoolExp>;
  addressId?: InputMaybe<UuidComparisonExp>;
  chargesEnabled?: InputMaybe<BooleanComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  owner?: InputMaybe<UserBoolExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  stripeAccountId?: InputMaybe<StringComparisonExp>;
  stripeCustomerId?: InputMaybe<StringComparisonExp>;
  stripeSubscriptionId?: InputMaybe<StringComparisonExp>;
  stripeSubscriptionStatus?: InputMaybe<SubscriptionStatusEnumComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplaces?: InputMaybe<WorkplaceBoolExp>;
  workplacesAggregate?: InputMaybe<WorkplaceAggregateBoolExp>;
};

/** unique or primary key constraints on table "organization" */
export type OrganizationConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'organization_pkey';

/** input type for inserting data into table "organization" */
export type OrganizationInsertInput = {
  address?: InputMaybe<AddressObjRelInsertInput>;
  addressId?: InputMaybe<Scalars['uuid']['input']>;
  chargesEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<UserObjRelInsertInput>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  stripeAccountId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionStatus?: InputMaybe<SubscriptionStatusEnum>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  workplaces?: InputMaybe<WorkplaceArrRelInsertInput>;
};

/** aggregate max on columns */
export type OrganizationMaxFields = {
  addressId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "organization" */
export type OrganizationMaxOrderBy = {
  addressId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  stripeAccountId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type OrganizationMinFields = {
  addressId?: Maybe<Scalars['uuid']['output']>;
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  stripeAccountId?: Maybe<Scalars['String']['output']>;
  stripeCustomerId?: Maybe<Scalars['String']['output']>;
  stripeSubscriptionId?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "organization" */
export type OrganizationMinOrderBy = {
  addressId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  stripeAccountId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "organization" */
export type OrganizationMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Organization>;
};

/** input type for inserting object relation for remote table "organization" */
export type OrganizationObjRelInsertInput = {
  data: OrganizationInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<OrganizationOnConflict>;
};

/** on_conflict condition type for table "organization" */
export type OrganizationOnConflict = {
  constraint: OrganizationConstraint;
  updateColumns?: Array<OrganizationUpdateColumn>;
  where?: InputMaybe<OrganizationBoolExp>;
};

/** Ordering options when selecting data from "organization". */
export type OrganizationOrderBy = {
  address?: InputMaybe<AddressOrderBy>;
  addressId?: InputMaybe<OrderBy>;
  chargesEnabled?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  owner?: InputMaybe<UserOrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  stripeAccountId?: InputMaybe<OrderBy>;
  stripeCustomerId?: InputMaybe<OrderBy>;
  stripeSubscriptionId?: InputMaybe<OrderBy>;
  stripeSubscriptionStatus?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplacesAggregate?: InputMaybe<WorkplaceAggregateOrderBy>;
};

/** primary key columns input for table: organization */
export type OrganizationPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "organization" */
export type OrganizationSelectColumn =
  /** column name */
  | 'addressId'
  /** column name */
  | 'chargesEnabled'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'stripeAccountId'
  /** column name */
  | 'stripeCustomerId'
  /** column name */
  | 'stripeSubscriptionId'
  /** column name */
  | 'stripeSubscriptionStatus'
  /** column name */
  | 'updatedAt';

/** select "organizationAggregateBoolExpBool_andArgumentsColumns" columns of table "organization" */
export type OrganizationSelectColumnOrganizationAggregateBoolExpBool_AndArgumentsColumns =
  /** column name */
  | 'chargesEnabled';

/** select "organizationAggregateBoolExpBool_orArgumentsColumns" columns of table "organization" */
export type OrganizationSelectColumnOrganizationAggregateBoolExpBool_OrArgumentsColumns =
  /** column name */
  | 'chargesEnabled';

/** input type for updating data in table "organization" */
export type OrganizationSetInput = {
  addressId?: InputMaybe<Scalars['uuid']['input']>;
  chargesEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  stripeAccountId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionStatus?: InputMaybe<SubscriptionStatusEnum>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "organization" */
export type OrganizationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: OrganizationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type OrganizationStreamCursorValueInput = {
  addressId?: InputMaybe<Scalars['uuid']['input']>;
  chargesEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  stripeAccountId?: InputMaybe<Scalars['String']['input']>;
  stripeCustomerId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionId?: InputMaybe<Scalars['String']['input']>;
  stripeSubscriptionStatus?: InputMaybe<SubscriptionStatusEnum>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "organization" */
export type OrganizationUpdateColumn =
  /** column name */
  | 'addressId'
  /** column name */
  | 'chargesEnabled'
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'name'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'stripeAccountId'
  /** column name */
  | 'stripeCustomerId'
  /** column name */
  | 'stripeSubscriptionId'
  /** column name */
  | 'stripeSubscriptionStatus'
  /** column name */
  | 'updatedAt';

export type OrganizationUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<OrganizationSetInput>;
  /** filter the rows which have to be updated */
  where: OrganizationBoolExp;
};

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

/** columns and relationships of "subscription_status" */
export type SubscriptionStatus = {
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
};

/** aggregated selection of "subscription_status" */
export type SubscriptionStatusAggregate = {
  aggregate?: Maybe<SubscriptionStatusAggregateFields>;
  nodes: Array<SubscriptionStatus>;
};

/** aggregate fields of "subscription_status" */
export type SubscriptionStatusAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<SubscriptionStatusMaxFields>;
  min?: Maybe<SubscriptionStatusMinFields>;
};


/** aggregate fields of "subscription_status" */
export type SubscriptionStatusAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<SubscriptionStatusSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "subscription_status". All fields are combined with a logical 'AND'. */
export type SubscriptionStatusBoolExp = {
  _and?: InputMaybe<Array<SubscriptionStatusBoolExp>>;
  _not?: InputMaybe<SubscriptionStatusBoolExp>;
  _or?: InputMaybe<Array<SubscriptionStatusBoolExp>>;
  description?: InputMaybe<StringComparisonExp>;
  status?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "subscription_status" */
export type SubscriptionStatusConstraint =
  /** unique or primary key constraint on columns "status" */
  | 'subscription_status_pkey';

export type SubscriptionStatusEnum =
  /** The subscription is in good standing and the most recent payment is successful. It’s safe to provision your product for your customer. */
  | 'ACTIVE'
  /** The subscription has been canceled. During cancellation, automatic collection for all unpaid invoices is disabled (auto_advance=false). This is a terminal state that can’t be updated. */
  | 'CANCELED'
  /** The initial payment on the subscription failed and no successful payment was made within 23 hours of creating the subscription. These subscriptions don’t bill customers. This status exists so you can track customers that failed to activate their subscriptions. */
  | 'INCOMPLETE_EXPIRED'
  /** Payment on the latest finalized invoice either failed or wasn’t attempted. The subscription continues to create invoices. Your subscription settings determine the subscription’s next state. If the invoice is still unpaid after all Smart Retries have been attempted, you can configure the subscription to move to canceled, unpaid, or leave it as past_due. To move the subscription to active, pay the most recent invoice before its due date. */
  | 'PAST_DUE'
  /** The subscription has ended its trial period without a default payment method and the trial_settings.end_behavior.missing_payment_method is set to pause. Invoices will no longer be created for the subscription. After a default payment method has been attached to the customer, you can resume the subscription. */
  | 'PAUSED'
  /** The subscription is currently in a trial period and it’s safe to provision your product for your customer. The subscription transitions automatically to active when the first payment is made. */
  | 'TRIALING'
  /** The latest invoice hasn’t been paid but the subscription remains in place. The latest invoice remains open and invoices continue to be generated but payments aren’t attempted. You should revoke access to your product when the subscription is unpaid since payments were already attempted and retried when it was past_due. To move the subscription to active, pay the most recent invoice before its due date. */
  | 'UNPAID';

/** Boolean expression to compare columns of type "SubscriptionStatusEnum". All fields are combined with logical 'AND'. */
export type SubscriptionStatusEnumComparisonExp = {
  _eq?: InputMaybe<SubscriptionStatusEnum>;
  _in?: InputMaybe<Array<SubscriptionStatusEnum>>;
  _isNull?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<SubscriptionStatusEnum>;
  _nin?: InputMaybe<Array<SubscriptionStatusEnum>>;
};

/** input type for inserting data into table "subscription_status" */
export type SubscriptionStatusInsertInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type SubscriptionStatusMaxFields = {
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** aggregate min on columns */
export type SubscriptionStatusMinFields = {
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** response of any mutation on the table "subscription_status" */
export type SubscriptionStatusMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<SubscriptionStatus>;
};

/** on_conflict condition type for table "subscription_status" */
export type SubscriptionStatusOnConflict = {
  constraint: SubscriptionStatusConstraint;
  updateColumns?: Array<SubscriptionStatusUpdateColumn>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
};

/** Ordering options when selecting data from "subscription_status". */
export type SubscriptionStatusOrderBy = {
  description?: InputMaybe<OrderBy>;
  status?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: subscription_status */
export type SubscriptionStatusPkColumnsInput = {
  status: Scalars['String']['input'];
};

/** select columns of table "subscription_status" */
export type SubscriptionStatusSelectColumn =
  /** column name */
  | 'description'
  /** column name */
  | 'status';

/** input type for updating data in table "subscription_status" */
export type SubscriptionStatusSetInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "subscription_status" */
export type SubscriptionStatusStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: SubscriptionStatusStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type SubscriptionStatusStreamCursorValueInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "subscription_status" */
export type SubscriptionStatusUpdateColumn =
  /** column name */
  | 'description'
  /** column name */
  | 'status';

export type SubscriptionStatusUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<SubscriptionStatusSetInput>;
  /** filter the rows which have to be updated */
  where: SubscriptionStatusBoolExp;
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
  /** An array relationship */
  memberOfWorkplaces: Array<WorkplaceMember>;
  /** An aggregate relationship */
  memberOfWorkplacesAggregate: WorkplaceMemberAggregate;
  name: Scalars['String']['output'];
  /** An array relationship */
  organizations: Array<Organization>;
  /** An aggregate relationship */
  organizationsAggregate: OrganizationAggregate;
  /** An array relationship */
  ownerOfWorkplaces: Array<Workplace>;
  /** An aggregate relationship */
  ownerOfWorkplacesAggregate: WorkplaceAggregate;
  updatedAt: Scalars['timestamptz']['output'];
};


/** columns and relationships of "user" */
export type UserMemberOfWorkplacesArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
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
export type UserOrganizationsArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


/** columns and relationships of "user" */
export type UserOrganizationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


/** columns and relationships of "user" */
export type UserOwnerOfWorkplacesArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
};


/** columns and relationships of "user" */
export type UserOwnerOfWorkplacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceOrderBy>>;
  where?: InputMaybe<WorkplaceBoolExp>;
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
  memberOfWorkplaces?: InputMaybe<WorkplaceMemberBoolExp>;
  memberOfWorkplacesAggregate?: InputMaybe<WorkplaceMemberAggregateBoolExp>;
  name?: InputMaybe<StringComparisonExp>;
  organizations?: InputMaybe<OrganizationBoolExp>;
  organizationsAggregate?: InputMaybe<OrganizationAggregateBoolExp>;
  ownerOfWorkplaces?: InputMaybe<WorkplaceBoolExp>;
  ownerOfWorkplacesAggregate?: InputMaybe<WorkplaceAggregateBoolExp>;
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
  memberOfWorkplaces?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
  name?: InputMaybe<Scalars['String']['input']>;
  organizations?: InputMaybe<OrganizationArrRelInsertInput>;
  ownerOfWorkplaces?: InputMaybe<WorkplaceArrRelInsertInput>;
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
  affectedRows: Scalars['Int']['output'];
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
  updateColumns?: Array<UserUpdateColumn>;
  where?: InputMaybe<UserBoolExp>;
};

/** Ordering options when selecting data from "user". */
export type UserOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  imageUrl?: InputMaybe<OrderBy>;
  memberOfWorkplacesAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
  name?: InputMaybe<OrderBy>;
  organizationsAggregate?: InputMaybe<OrganizationAggregateOrderBy>;
  ownerOfWorkplacesAggregate?: InputMaybe<WorkplaceAggregateOrderBy>;
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
  /** filter the rows which have to be updated */
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
  /** An object relationship */
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  owner: User;
  ownerId: Scalars['uuid']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An array relationship */
  workplaceInvitations: Array<WorkplaceInvitation>;
  /** An aggregate relationship */
  workplaceInvitationsAggregate: WorkplaceInvitationAggregate;
  /** An array relationship */
  workplaceMembers: Array<WorkplaceMember>;
  /** An aggregate relationship */
  workplaceMembersAggregate: WorkplaceMemberAggregate;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceInvitationsArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceInvitationsAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceMembersArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceMemberOrderBy>>;
  where?: InputMaybe<WorkplaceMemberBoolExp>;
};


/** columns and relationships of "workplace" */
export type WorkplaceWorkplaceMembersAggregateArgs = {
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

export type WorkplaceAggregateBoolExp = {
  count?: InputMaybe<WorkplaceAggregateBoolExpCount>;
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

/** order by aggregate values of table "workplace" */
export type WorkplaceAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<WorkplaceMaxOrderBy>;
  min?: InputMaybe<WorkplaceMinOrderBy>;
};

/** input type for inserting array relation for remote table "workplace" */
export type WorkplaceArrRelInsertInput = {
  data: Array<WorkplaceInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceOnConflict>;
};

/** Boolean expression to filter rows from the table "workplace". All fields are combined with a logical 'AND'. */
export type WorkplaceBoolExp = {
  _and?: InputMaybe<Array<WorkplaceBoolExp>>;
  _not?: InputMaybe<WorkplaceBoolExp>;
  _or?: InputMaybe<Array<WorkplaceBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  organization?: InputMaybe<OrganizationBoolExp>;
  organizationId?: InputMaybe<UuidComparisonExp>;
  owner?: InputMaybe<UserBoolExp>;
  ownerId?: InputMaybe<UuidComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  workplaceInvitations?: InputMaybe<WorkplaceInvitationBoolExp>;
  workplaceInvitationsAggregate?: InputMaybe<WorkplaceInvitationAggregateBoolExp>;
  workplaceMembers?: InputMaybe<WorkplaceMemberBoolExp>;
  workplaceMembersAggregate?: InputMaybe<WorkplaceMemberAggregateBoolExp>;
};

/** unique or primary key constraints on table "workplace" */
export type WorkplaceConstraint =
  /** unique or primary key constraint on columns "id" */
  | 'workplace_pkey';

/** input type for inserting data into table "workplace" */
export type WorkplaceInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  organization?: InputMaybe<OrganizationObjRelInsertInput>;
  organizationId?: InputMaybe<Scalars['uuid']['input']>;
  owner?: InputMaybe<UserObjRelInsertInput>;
  ownerId?: InputMaybe<Scalars['uuid']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  workplaceInvitations?: InputMaybe<WorkplaceInvitationArrRelInsertInput>;
  workplaceMembers?: InputMaybe<WorkplaceMemberArrRelInsertInput>;
};

/** columns and relationships of "workplace_invitation" */
export type WorkplaceInvitation = {
  createdAt: Scalars['timestamptz']['output'];
  email: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  updatedAt: Scalars['timestamptz']['output'];
  /** An object relationship */
  user?: Maybe<User>;
  /** An object relationship */
  workplace: Workplace;
  workplaceId: Scalars['uuid']['output'];
};

/** aggregated selection of "workplace_invitation" */
export type WorkplaceInvitationAggregate = {
  aggregate?: Maybe<WorkplaceInvitationAggregateFields>;
  nodes: Array<WorkplaceInvitation>;
};

export type WorkplaceInvitationAggregateBoolExp = {
  count?: InputMaybe<WorkplaceInvitationAggregateBoolExpCount>;
};

/** aggregate fields of "workplace_invitation" */
export type WorkplaceInvitationAggregateFields = {
  count: Scalars['Int']['output'];
  max?: Maybe<WorkplaceInvitationMaxFields>;
  min?: Maybe<WorkplaceInvitationMinFields>;
};


/** aggregate fields of "workplace_invitation" */
export type WorkplaceInvitationAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "workplace_invitation" */
export type WorkplaceInvitationAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<WorkplaceInvitationMaxOrderBy>;
  min?: InputMaybe<WorkplaceInvitationMinOrderBy>;
};

/** input type for inserting array relation for remote table "workplace_invitation" */
export type WorkplaceInvitationArrRelInsertInput = {
  data: Array<WorkplaceInvitationInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkplaceInvitationOnConflict>;
};

/** Boolean expression to filter rows from the table "workplace_invitation". All fields are combined with a logical 'AND'. */
export type WorkplaceInvitationBoolExp = {
  _and?: InputMaybe<Array<WorkplaceInvitationBoolExp>>;
  _not?: InputMaybe<WorkplaceInvitationBoolExp>;
  _or?: InputMaybe<Array<WorkplaceInvitationBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UserBoolExp>;
  workplace?: InputMaybe<WorkplaceBoolExp>;
  workplaceId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "workplace_invitation" */
export type WorkplaceInvitationConstraint =
  /** unique or primary key constraint on columns "workplace_id", "email" */
  | 'workplace_invitation_email_workplace_id_key'
  /** unique or primary key constraint on columns "id" */
  | 'workplace_invitation_pkey';

/** input type for inserting data into table "workplace_invitation" */
export type WorkplaceInvitationInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<UserObjRelInsertInput>;
  workplace?: InputMaybe<WorkplaceObjRelInsertInput>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type WorkplaceInvitationMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  workplaceId?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "workplace_invitation" */
export type WorkplaceInvitationMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type WorkplaceInvitationMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
  workplaceId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workplace_invitation" */
export type WorkplaceInvitationMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "workplace_invitation" */
export type WorkplaceInvitationMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkplaceInvitation>;
};

/** on_conflict condition type for table "workplace_invitation" */
export type WorkplaceInvitationOnConflict = {
  constraint: WorkplaceInvitationConstraint;
  updateColumns?: Array<WorkplaceInvitationUpdateColumn>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};

/** Ordering options when selecting data from "workplace_invitation". */
export type WorkplaceInvitationOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UserOrderBy>;
  workplace?: InputMaybe<WorkplaceOrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: workplace_invitation */
export type WorkplaceInvitationPkColumnsInput = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "workplace_invitation" */
export type WorkplaceInvitationSelectColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'workplaceId';

/** input type for updating data in table "workplace_invitation" */
export type WorkplaceInvitationSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "workplace_invitation" */
export type WorkplaceInvitationStreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: WorkplaceInvitationStreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type WorkplaceInvitationStreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']['input']>;
  workplaceId?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "workplace_invitation" */
export type WorkplaceInvitationUpdateColumn =
  /** column name */
  | 'createdAt'
  /** column name */
  | 'email'
  /** column name */
  | 'id'
  /** column name */
  | 'updatedAt'
  /** column name */
  | 'workplaceId';

export type WorkplaceInvitationUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceInvitationSetInput>;
  /** filter the rows which have to be updated */
  where: WorkplaceInvitationBoolExp;
};

/** aggregate max on columns */
export type WorkplaceMaxFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  organizationId?: Maybe<Scalars['uuid']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "workplace" */
export type WorkplaceMaxOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
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

export type WorkplaceMemberAggregateBoolExp = {
  count?: InputMaybe<WorkplaceMemberAggregateBoolExpCount>;
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
  max?: InputMaybe<WorkplaceMemberMaxOrderBy>;
  min?: InputMaybe<WorkplaceMemberMinOrderBy>;
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
  /** unique or primary key constraint on columns "user_id", "workplace_id" */
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

/** order by max() on columns of table "workplace_member" */
export type WorkplaceMemberMaxOrderBy = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** aggregate min on columns */
export type WorkplaceMemberMinFields = {
  userId?: Maybe<Scalars['uuid']['output']>;
  workplaceId?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "workplace_member" */
export type WorkplaceMemberMinOrderBy = {
  userId?: InputMaybe<OrderBy>;
  workplaceId?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "workplace_member" */
export type WorkplaceMemberMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkplaceMember>;
};

/** on_conflict condition type for table "workplace_member" */
export type WorkplaceMemberOnConflict = {
  constraint: WorkplaceMemberConstraint;
  updateColumns?: Array<WorkplaceMemberUpdateColumn>;
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
  /** filter the rows which have to be updated */
  where: WorkplaceMemberBoolExp;
};

/** aggregate min on columns */
export type WorkplaceMinFields = {
  createdAt?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  organizationId?: Maybe<Scalars['uuid']['output']>;
  ownerId?: Maybe<Scalars['uuid']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "workplace" */
export type WorkplaceMinOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** response of any mutation on the table "workplace" */
export type WorkplaceMutationResponse = {
  /** number of rows affected by the mutation */
  affectedRows: Scalars['Int']['output'];
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
  updateColumns?: Array<WorkplaceUpdateColumn>;
  where?: InputMaybe<WorkplaceBoolExp>;
};

/** Ordering options when selecting data from "workplace". */
export type WorkplaceOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  organization?: InputMaybe<OrganizationOrderBy>;
  organizationId?: InputMaybe<OrderBy>;
  owner?: InputMaybe<UserOrderBy>;
  ownerId?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  workplaceInvitationsAggregate?: InputMaybe<WorkplaceInvitationAggregateOrderBy>;
  workplaceMembersAggregate?: InputMaybe<WorkplaceMemberAggregateOrderBy>;
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
  | 'organizationId'
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
  organizationId?: InputMaybe<Scalars['uuid']['input']>;
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
  organizationId?: InputMaybe<Scalars['uuid']['input']>;
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
  | 'organizationId'
  /** column name */
  | 'ownerId'
  /** column name */
  | 'title'
  /** column name */
  | 'updatedAt';

export type WorkplaceUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkplaceSetInput>;
  /** filter the rows which have to be updated */
  where: WorkplaceBoolExp;
};

/** mutation root */
export type Mutation_Root = {
  /** delete data from the table: "address" */
  deleteAddress?: Maybe<AddressMutationResponse>;
  /** delete single row from the table: "address" */
  deleteAddressByPk?: Maybe<Address>;
  /** delete data from the table: "organization" */
  deleteOrganization?: Maybe<OrganizationMutationResponse>;
  /** delete single row from the table: "organization" */
  deleteOrganizationByPk?: Maybe<Organization>;
  /** delete data from the table: "subscription_status" */
  deleteSubscriptionStatus?: Maybe<SubscriptionStatusMutationResponse>;
  /** delete single row from the table: "subscription_status" */
  deleteSubscriptionStatusByPk?: Maybe<SubscriptionStatus>;
  /** delete data from the table: "user" */
  deleteUser?: Maybe<UserMutationResponse>;
  /** delete single row from the table: "user" */
  deleteUserByPk?: Maybe<User>;
  /** delete data from the table: "workplace" */
  deleteWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** delete single row from the table: "workplace" */
  deleteWorkplaceByPk?: Maybe<Workplace>;
  /** delete data from the table: "workplace_invitation" */
  deleteWorkplaceInvitation?: Maybe<WorkplaceInvitationMutationResponse>;
  /** delete single row from the table: "workplace_invitation" */
  deleteWorkplaceInvitationByPk?: Maybe<WorkplaceInvitation>;
  /** delete data from the table: "workplace_member" */
  deleteWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** delete single row from the table: "workplace_member" */
  deleteWorkplaceMemberByPk?: Maybe<WorkplaceMember>;
  /** insert data into the table: "address" */
  insertAddress?: Maybe<AddressMutationResponse>;
  /** insert a single row into the table: "address" */
  insertAddressOne?: Maybe<Address>;
  /** insert data into the table: "organization" */
  insertOrganization?: Maybe<OrganizationMutationResponse>;
  /** insert a single row into the table: "organization" */
  insertOrganizationOne?: Maybe<Organization>;
  /** insert data into the table: "subscription_status" */
  insertSubscriptionStatus?: Maybe<SubscriptionStatusMutationResponse>;
  /** insert a single row into the table: "subscription_status" */
  insertSubscriptionStatusOne?: Maybe<SubscriptionStatus>;
  /** insert data into the table: "user" */
  insertUser?: Maybe<UserMutationResponse>;
  /** insert a single row into the table: "user" */
  insertUserOne?: Maybe<User>;
  /** insert data into the table: "workplace" */
  insertWorkplace?: Maybe<WorkplaceMutationResponse>;
  /** insert data into the table: "workplace_invitation" */
  insertWorkplaceInvitation?: Maybe<WorkplaceInvitationMutationResponse>;
  /** insert a single row into the table: "workplace_invitation" */
  insertWorkplaceInvitationOne?: Maybe<WorkplaceInvitation>;
  /** insert data into the table: "workplace_member" */
  insertWorkplaceMember?: Maybe<WorkplaceMemberMutationResponse>;
  /** insert a single row into the table: "workplace_member" */
  insertWorkplaceMemberOne?: Maybe<WorkplaceMember>;
  /** insert a single row into the table: "workplace" */
  insertWorkplaceOne?: Maybe<Workplace>;
  /** update data of the table: "address" */
  updateAddress?: Maybe<AddressMutationResponse>;
  /** update single row of the table: "address" */
  updateAddressByPk?: Maybe<Address>;
  /** update multiples rows of table: "address" */
  updateAddressMany?: Maybe<Array<Maybe<AddressMutationResponse>>>;
  /** update data of the table: "organization" */
  updateOrganization?: Maybe<OrganizationMutationResponse>;
  /** update single row of the table: "organization" */
  updateOrganizationByPk?: Maybe<Organization>;
  /** update multiples rows of table: "organization" */
  updateOrganizationMany?: Maybe<Array<Maybe<OrganizationMutationResponse>>>;
  /** update data of the table: "subscription_status" */
  updateSubscriptionStatus?: Maybe<SubscriptionStatusMutationResponse>;
  /** update single row of the table: "subscription_status" */
  updateSubscriptionStatusByPk?: Maybe<SubscriptionStatus>;
  /** update multiples rows of table: "subscription_status" */
  updateSubscriptionStatusMany?: Maybe<Array<Maybe<SubscriptionStatusMutationResponse>>>;
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
  /** update data of the table: "workplace_invitation" */
  updateWorkplaceInvitation?: Maybe<WorkplaceInvitationMutationResponse>;
  /** update single row of the table: "workplace_invitation" */
  updateWorkplaceInvitationByPk?: Maybe<WorkplaceInvitation>;
  /** update multiples rows of table: "workplace_invitation" */
  updateWorkplaceInvitationMany?: Maybe<Array<Maybe<WorkplaceInvitationMutationResponse>>>;
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
export type Mutation_RootDeleteAddressArgs = {
  where: AddressBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteAddressByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteOrganizationArgs = {
  where: OrganizationBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteOrganizationByPkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionStatusArgs = {
  where: SubscriptionStatusBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteSubscriptionStatusByPkArgs = {
  status: Scalars['String']['input'];
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
export type Mutation_RootDeleteWorkplaceInvitationArgs = {
  where: WorkplaceInvitationBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkplaceInvitationByPkArgs = {
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
export type Mutation_RootInsertAddressArgs = {
  objects: Array<AddressInsertInput>;
  onConflict?: InputMaybe<AddressOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertAddressOneArgs = {
  object: AddressInsertInput;
  onConflict?: InputMaybe<AddressOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOrganizationArgs = {
  objects: Array<OrganizationInsertInput>;
  onConflict?: InputMaybe<OrganizationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertOrganizationOneArgs = {
  object: OrganizationInsertInput;
  onConflict?: InputMaybe<OrganizationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionStatusArgs = {
  objects: Array<SubscriptionStatusInsertInput>;
  onConflict?: InputMaybe<SubscriptionStatusOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertSubscriptionStatusOneArgs = {
  object: SubscriptionStatusInsertInput;
  onConflict?: InputMaybe<SubscriptionStatusOnConflict>;
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
export type Mutation_RootInsertWorkplaceInvitationArgs = {
  objects: Array<WorkplaceInvitationInsertInput>;
  onConflict?: InputMaybe<WorkplaceInvitationOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkplaceInvitationOneArgs = {
  object: WorkplaceInvitationInsertInput;
  onConflict?: InputMaybe<WorkplaceInvitationOnConflict>;
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
export type Mutation_RootUpdateAddressArgs = {
  _set?: InputMaybe<AddressSetInput>;
  where: AddressBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateAddressByPkArgs = {
  _set?: InputMaybe<AddressSetInput>;
  pkColumns: AddressPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateAddressManyArgs = {
  updates: Array<AddressUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationArgs = {
  _set?: InputMaybe<OrganizationSetInput>;
  where: OrganizationBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationByPkArgs = {
  _set?: InputMaybe<OrganizationSetInput>;
  pkColumns: OrganizationPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateOrganizationManyArgs = {
  updates: Array<OrganizationUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusArgs = {
  _set?: InputMaybe<SubscriptionStatusSetInput>;
  where: SubscriptionStatusBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusByPkArgs = {
  _set?: InputMaybe<SubscriptionStatusSetInput>;
  pkColumns: SubscriptionStatusPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateSubscriptionStatusManyArgs = {
  updates: Array<SubscriptionStatusUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUserArgs = {
  _set?: InputMaybe<UserSetInput>;
  where: UserBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUserByPkArgs = {
  _set?: InputMaybe<UserSetInput>;
  pkColumns: UserPkColumnsInput;
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
  pkColumns: WorkplacePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceInvitationArgs = {
  _set?: InputMaybe<WorkplaceInvitationSetInput>;
  where: WorkplaceInvitationBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceInvitationByPkArgs = {
  _set?: InputMaybe<WorkplaceInvitationSetInput>;
  pkColumns: WorkplaceInvitationPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceInvitationManyArgs = {
  updates: Array<WorkplaceInvitationUpdates>;
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
  pkColumns: WorkplaceMemberPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkplaceMemberManyArgs = {
  updates: Array<WorkplaceMemberUpdates>;
};

export type OrganizationAggregateBoolExpBool_And = {
  arguments: OrganizationSelectColumnOrganizationAggregateBoolExpBool_AndArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<OrganizationBoolExp>;
  predicate: BooleanComparisonExp;
};

export type OrganizationAggregateBoolExpBool_Or = {
  arguments: OrganizationSelectColumnOrganizationAggregateBoolExpBool_OrArgumentsColumns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<OrganizationBoolExp>;
  predicate: BooleanComparisonExp;
};

export type OrganizationAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<OrganizationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<OrganizationBoolExp>;
  predicate: IntComparisonExp;
};

export type Query_Root = {
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  addressAggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  addressByPk?: Maybe<Address>;
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch aggregated fields from the table: "organization" */
  organizationAggregate: OrganizationAggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organizationByPk?: Maybe<Organization>;
  /** fetch data from the table: "subscription_status" */
  subscriptionStatus: Array<SubscriptionStatus>;
  /** fetch aggregated fields from the table: "subscription_status" */
  subscriptionStatusAggregate: SubscriptionStatusAggregate;
  /** fetch data from the table: "subscription_status" using primary key columns */
  subscriptionStatusByPk?: Maybe<SubscriptionStatus>;
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
  /** fetch data from the table: "workplace_invitation" */
  workplaceInvitation: Array<WorkplaceInvitation>;
  /** fetch aggregated fields from the table: "workplace_invitation" */
  workplaceInvitationAggregate: WorkplaceInvitationAggregate;
  /** fetch data from the table: "workplace_invitation" using primary key columns */
  workplaceInvitationByPk?: Maybe<WorkplaceInvitation>;
  /** fetch data from the table: "workplace_member" */
  workplaceMember: Array<WorkplaceMember>;
  /** fetch aggregated fields from the table: "workplace_member" */
  workplaceMemberAggregate: WorkplaceMemberAggregate;
  /** fetch data from the table: "workplace_member" using primary key columns */
  workplaceMemberByPk?: Maybe<WorkplaceMember>;
};


export type Query_RootAddressArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Query_RootAddressAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Query_RootAddressByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootOrganizationArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


export type Query_RootOrganizationAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


export type Query_RootOrganizationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSubscriptionStatusArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusOrderBy>>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
};


export type Query_RootSubscriptionStatusAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusOrderBy>>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
};


export type Query_RootSubscriptionStatusByPkArgs = {
  status: Scalars['String']['input'];
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


export type Query_RootWorkplaceInvitationArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


export type Query_RootWorkplaceInvitationAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


export type Query_RootWorkplaceInvitationByPkArgs = {
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
  /** fetch data from the table: "address" */
  address: Array<Address>;
  /** fetch aggregated fields from the table: "address" */
  addressAggregate: AddressAggregate;
  /** fetch data from the table: "address" using primary key columns */
  addressByPk?: Maybe<Address>;
  /** fetch data from the table in a streaming manner: "address" */
  addressStream: Array<Address>;
  /** fetch data from the table: "organization" */
  organization: Array<Organization>;
  /** fetch aggregated fields from the table: "organization" */
  organizationAggregate: OrganizationAggregate;
  /** fetch data from the table: "organization" using primary key columns */
  organizationByPk?: Maybe<Organization>;
  /** fetch data from the table in a streaming manner: "organization" */
  organizationStream: Array<Organization>;
  /** fetch data from the table: "subscription_status" */
  subscriptionStatus: Array<SubscriptionStatus>;
  /** fetch aggregated fields from the table: "subscription_status" */
  subscriptionStatusAggregate: SubscriptionStatusAggregate;
  /** fetch data from the table: "subscription_status" using primary key columns */
  subscriptionStatusByPk?: Maybe<SubscriptionStatus>;
  /** fetch data from the table in a streaming manner: "subscription_status" */
  subscriptionStatusStream: Array<SubscriptionStatus>;
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
  /** fetch data from the table: "workplace_invitation" */
  workplaceInvitation: Array<WorkplaceInvitation>;
  /** fetch aggregated fields from the table: "workplace_invitation" */
  workplaceInvitationAggregate: WorkplaceInvitationAggregate;
  /** fetch data from the table: "workplace_invitation" using primary key columns */
  workplaceInvitationByPk?: Maybe<WorkplaceInvitation>;
  /** fetch data from the table in a streaming manner: "workplace_invitation" */
  workplaceInvitationStream: Array<WorkplaceInvitation>;
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


export type Subscription_RootAddressArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Subscription_RootAddressAggregateArgs = {
  distinctOn?: InputMaybe<Array<AddressSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<AddressOrderBy>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Subscription_RootAddressByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootAddressStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<AddressStreamCursorInput>>;
  where?: InputMaybe<AddressBoolExp>;
};


export type Subscription_RootOrganizationArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


export type Subscription_RootOrganizationAggregateArgs = {
  distinctOn?: InputMaybe<Array<OrganizationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<OrganizationOrderBy>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


export type Subscription_RootOrganizationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrganizationStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<OrganizationStreamCursorInput>>;
  where?: InputMaybe<OrganizationBoolExp>;
};


export type Subscription_RootSubscriptionStatusArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusOrderBy>>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
};


export type Subscription_RootSubscriptionStatusAggregateArgs = {
  distinctOn?: InputMaybe<Array<SubscriptionStatusSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<SubscriptionStatusOrderBy>>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
};


export type Subscription_RootSubscriptionStatusByPkArgs = {
  status: Scalars['String']['input'];
};


export type Subscription_RootSubscriptionStatusStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<SubscriptionStatusStreamCursorInput>>;
  where?: InputMaybe<SubscriptionStatusBoolExp>;
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


export type Subscription_RootWorkplaceInvitationArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


export type Subscription_RootWorkplaceInvitationAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WorkplaceInvitationOrderBy>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
};


export type Subscription_RootWorkplaceInvitationByPkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWorkplaceInvitationStreamArgs = {
  batchSize: Scalars['Int']['input'];
  cursor: Array<InputMaybe<WorkplaceInvitationStreamCursorInput>>;
  where?: InputMaybe<WorkplaceInvitationBoolExp>;
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

export type WorkplaceAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<WorkplaceSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<WorkplaceBoolExp>;
  predicate: IntComparisonExp;
};

export type WorkplaceInvitationAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<WorkplaceInvitationSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<WorkplaceInvitationBoolExp>;
  predicate: IntComparisonExp;
};

export type WorkplaceMemberAggregateBoolExpCount = {
  arguments?: InputMaybe<Array<WorkplaceMemberSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<WorkplaceMemberBoolExp>;
  predicate: IntComparisonExp;
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


export type GetUserByIdQuery = { user?: { createdAt: string, email: string, imageUrl?: string | null, id: string, name: string, organizations: Array<{ id: string, createdAt: string, updatedAt: string, name: string, ownerId: string, stripeAccountId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, stripeSubscriptionStatus?: SubscriptionStatusEnum | null }>, ownerOfWorkplaces: Array<{ id: string, title: string, updatedAt: string, ownerId: string, createdAt: string }>, memberOfWorkplaces: Array<{ workplace: { createdAt: string, id: string, ownerId: string, title: string, updatedAt: string } }> } | null };

export type UpdateUserNameMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  name: Scalars['String']['input'];
}>;


export type UpdateUserNameMutation = { updateUserByPk?: { name: string } | null };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type DeleteUserMutation = { deleteUserByPk?: { id: string } | null };

export type GetOwnedOrganizationsQueryVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type GetOwnedOrganizationsQuery = { organizations: Array<{ id: string, createdAt: string, updatedAt: string, name: string, email: string, ownerId: string, stripeAccountId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, stripeSubscriptionStatus?: SubscriptionStatusEnum | null, chargesEnabled?: boolean | null }> };

export type GetOrganizationByIdQueryVariables = Exact<{
  organizationId: Scalars['uuid']['input'];
}>;


export type GetOrganizationByIdQuery = { organization?: { id: string, createdAt: string, updatedAt: string, name: string, email: string, ownerId: string, stripeAccountId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, stripeSubscriptionStatus?: SubscriptionStatusEnum | null, chargesEnabled?: boolean | null, address: { line1: string, line2?: string | null, city: string, state?: string | null, postalCode: string, country: string } } | null };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  address: AddressInsertInput;
}>;


export type CreateOrganizationMutation = { insertOrganization?: { returning: Array<{ id: string, createdAt: string, updatedAt: string, name: string, email: string, ownerId: string, stripeAccountId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, stripeSubscriptionStatus?: SubscriptionStatusEnum | null, chargesEnabled?: boolean | null, address: { line1: string, line2?: string | null, city: string, state?: string | null, postalCode: string, country: string } }> } | null };

export type UpdateWorkplaceorganizationIdMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  organizationId: Scalars['uuid']['input'];
}>;


export type UpdateWorkplaceorganizationIdMutation = { updateWorkplaceByPk?: { id: string } | null };

export type CreateAddressMutationVariables = Exact<{
  state?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  line2?: InputMaybe<Scalars['String']['input']>;
  line1?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateAddressMutation = { insertAddress?: { returning: Array<{ id: string }> } | null };

export type UpdateOrgranizationsStripeCustomerIdMutationVariables = Exact<{
  organizationId: Scalars['uuid']['input'];
  stripeCustomerId: Scalars['String']['input'];
}>;


export type UpdateOrgranizationsStripeCustomerIdMutation = { updateOrganizationByPk?: { stripeCustomerId?: string | null } | null };

export type UpdateOrganizationsChargesEnabledMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type UpdateOrganizationsChargesEnabledMutation = { updateOrganizationByPk?: { id: string } | null };

export type UpdateOrganizationStripeAccountMutationVariables = Exact<{
  organizationId: Scalars['uuid']['input'];
  stripeAccountId: Scalars['String']['input'];
}>;


export type UpdateOrganizationStripeAccountMutation = { updateOrganizationByPk?: { stripeAccountId?: string | null } | null };

export type SubscriptionStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type SubscriptionStatusQuery = { subscriptionStatus: Array<{ status: string, description?: string | null }> };

export type UpdateSubscriptionStatusMutationVariables = Exact<{
  subscriptionId?: InputMaybe<Scalars['String']['input']>;
  status: SubscriptionStatusEnum;
}>;


export type UpdateSubscriptionStatusMutation = { updateOrganization?: { returning: Array<{ id: string }> } | null };

export type UpdateSubscriptionIdMutationVariables = Exact<{
  organizationId: Scalars['uuid']['input'];
  subscriptionId: Scalars['String']['input'];
}>;


export type UpdateSubscriptionIdMutation = { updateOrganizationByPk?: { id: string } | null };

export type GetAllWorkplacesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllWorkplacesQuery = { workplace: Array<{ id: string, title: string, createdAt: string, updatedAt: string, ownerId: string }> };

export type CreateWokrplaceMutationVariables = Exact<{
  title?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['uuid']['input'];
  organizationId?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type CreateWokrplaceMutation = { insertWorkplace?: { returning: Array<{ title: string, id: string, createdAt: string, ownerId: string, updatedAt: string }> } | null };

export type DeleteWorkplaceMutationVariables = Exact<{
  workplaceId: Scalars['uuid']['input'];
}>;


export type DeleteWorkplaceMutation = { deleteWorkplace?: { affectedRows: number } | null };

export type GetWorkplaceMembersQueryVariables = Exact<{
  workplaceId: Scalars['uuid']['input'];
}>;


export type GetWorkplaceMembersQuery = { workplaceMember: Array<{ workplaceId: string, workplace: { ownerId: string }, workplaceMembers: { id: string, name: string, email: string, imageUrl?: string | null } }> };

export type GetWorkplaceInvitationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWorkplaceInvitationsQuery = { workplaceInvitation: Array<{ id: string, workplaceId: string, createdAt: string, workplace: { title: string }, workplaceInvitations?: { id: string, name: string, email: string, imageUrl?: string | null } | null }> };

export type CancelInvitationMutationVariables = Exact<{
  invitationId: Scalars['uuid']['input'];
}>;


export type CancelInvitationMutation = { deleteWorkplaceInvitationByPk?: { id: string } | null };

export type AcceptInvitationMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
  invitationId: Scalars['uuid']['input'];
}>;


export type AcceptInvitationMutation = { insertWorkplaceMember?: { affectedRows: number } | null, deleteWorkplaceInvitationByPk?: { id: string } | null };

export type InviteUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  workplaceId: Scalars['uuid']['input'];
}>;


export type InviteUserMutation = { insertWorkplaceInvitation?: { affectedRows: number } | null };

export type GetWorkplaceOrganizationQueryVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type GetWorkplaceOrganizationQuery = { workplaceByPk?: { ownerId: string, organization?: { name: string, id: string, email: string, createdAt: string, addressId: string, ownerId: string, stripeAccountId?: string | null, stripeCustomerId?: string | null, stripeSubscriptionId?: string | null, stripeSubscriptionStatus?: SubscriptionStatusEnum | null, updatedAt: string, chargesEnabled?: boolean | null } | null } | null };

export type DeleteWorkplaceMemberMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  workplaceId: Scalars['uuid']['input'];
}>;


export type DeleteWorkplaceMemberMutation = { deleteWorkplaceMember?: { returning: Array<{ userId: string }> } | null };


export const AddUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"imageUrl"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"user_email_key"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"imageUrl"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AddUserMutation, AddUserMutationVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"userByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"ownerOfWorkplaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberOfWorkplaces"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplace"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_neq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const UpdateUserNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUserName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUserByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const DeleteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteUserByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetOwnedOrganizationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOwnedOrganizations"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"organizations"},"name":{"kind":"Name","value":"organization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"ownerId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"chargesEnabled"}}]}}]}}]} as unknown as DocumentNode<GetOwnedOrganizationsQuery, GetOwnedOrganizationsQueryVariables>;
export const GetOrganizationByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetOrganizationById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"organization"},"name":{"kind":"Name","value":"organizationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"chargesEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>;
export const CreateOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"address_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"updateColumns"},"value":{"kind":"ListValue","values":[]}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"chargesEnabled"}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const UpdateWorkplaceorganizationIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWorkplaceorganizationId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateWorkplaceByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateWorkplaceorganizationIdMutation, UpdateWorkplaceorganizationIdMutationVariables>;
export const CreateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"state"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postalCode"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"line2"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"line1"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"country"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"city"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"city"},"value":{"kind":"Variable","name":{"kind":"Name","value":"city"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"country"},"value":{"kind":"Variable","name":{"kind":"Name","value":"country"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"line1"},"value":{"kind":"Variable","name":{"kind":"Name","value":"line1"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"postalCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postalCode"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"state"},"value":{"kind":"Variable","name":{"kind":"Name","value":"state"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"line2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"line2"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAddressMutation, CreateAddressMutationVariables>;
export const UpdateOrgranizationsStripeCustomerIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrgranizationsStripeCustomerId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeCustomerId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganizationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripeCustomerId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeCustomerId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}}]}}]}}]} as unknown as DocumentNode<UpdateOrgranizationsStripeCustomerIdMutation, UpdateOrgranizationsStripeCustomerIdMutationVariables>;
export const UpdateOrganizationsChargesEnabledDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganizationsChargesEnabled"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganizationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"chargesEnabled"},"value":{"kind":"BooleanValue","value":true}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationsChargesEnabledMutation, UpdateOrganizationsChargesEnabledMutationVariables>;
export const UpdateOrganizationStripeAccountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateOrganizationStripeAccount"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stripeAccountId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganizationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripeAccountId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stripeAccountId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}}]}}]}}]} as unknown as DocumentNode<UpdateOrganizationStripeAccountMutation, UpdateOrganizationStripeAccountMutationVariables>;
export const SubscriptionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SubscriptionStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subscriptionStatus"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]} as unknown as DocumentNode<SubscriptionStatusQuery, SubscriptionStatusQueryVariables>;
export const UpdateSubscriptionStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscriptionStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriptionId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubscriptionStatusEnum"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganization"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripeSubscriptionId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriptionId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripeSubscriptionStatus"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionStatusMutation, UpdateSubscriptionStatusMutationVariables>;
export const UpdateSubscriptionIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSubscriptionId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subscriptionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateOrganizationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pkColumns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"stripeSubscriptionId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subscriptionId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateSubscriptionIdMutation, UpdateSubscriptionIdMutationVariables>;
export const GetAllWorkplacesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllWorkplaces"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}}]}}]} as unknown as DocumentNode<GetAllWorkplacesQuery, GetAllWorkplacesQueryVariables>;
export const CreateWokrplaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWokrplace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceMembers"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]}}]} as unknown as DocumentNode<CreateWokrplaceMutation, CreateWokrplaceMutationVariables>;
export const DeleteWorkplaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkplace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkplace"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedRows"}}]}}]}}]} as unknown as DocumentNode<DeleteWorkplaceMutation, DeleteWorkplaceMutationVariables>;
export const GetWorkplaceMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaceMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplaceId"}},{"kind":"Field","name":{"kind":"Name","value":"workplace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerId"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"workplaceMembers"},"name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkplaceMembersQuery, GetWorkplaceMembersQueryVariables>;
export const GetWorkplaceInvitationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaceInvitations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplaceInvitation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"workplaceId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"workplace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"workplaceInvitations"},"name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkplaceInvitationsQuery, GetWorkplaceInvitationsQueryVariables>;
export const CancelInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkplaceInvitationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CancelInvitationMutation, CancelInvitationMutationVariables>;
export const AcceptInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AcceptInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertWorkplaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedRows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deleteWorkplaceInvitationByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AcceptInvitationMutation, AcceptInvitationMutationVariables>;
export const InviteUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InviteUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insertWorkplaceInvitation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affectedRows"}}]}}]}}]} as unknown as DocumentNode<InviteUserMutation, InviteUserMutationVariables>;
export const GetWorkplaceOrganizationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetWorkplaceOrganization"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workplaceByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"addressId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeCustomerId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionId"}},{"kind":"Field","name":{"kind":"Name","value":"stripeSubscriptionStatus"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"chargesEnabled"}}]}}]}}]}}]} as unknown as DocumentNode<GetWorkplaceOrganizationQuery, GetWorkplaceOrganizationQueryVariables>;
export const DeleteWorkplaceMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWorkplaceMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteWorkplaceMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workplaceId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"workplaceId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]}}]} as unknown as DocumentNode<DeleteWorkplaceMemberMutation, DeleteWorkplaceMemberMutationVariables>;