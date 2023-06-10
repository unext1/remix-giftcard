import { GraphQLClient } from 'graphql-request';
import jwt from 'jsonwebtoken';
import { env } from './env.server';

const HASURA_URL = `${env.HASURA_GRAPHQL_URL}/v1/graphql`;

export const createHasuraToken = (userId: string | undefined): string => {
  const payload = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['public', 'user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': userId || '00000000-0000-0000-0000-000000000000'
    }
  };

  return jwt.sign(payload, env.HASURA_GRAPHQL_JWT_SECRET.key, {
    algorithm: env.HASURA_GRAPHQL_JWT_SECRET.type
  });
};

export const hasuraAdminClient = () => {
  return hasuraClient({ token: '', headers: { 'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET } });
};

export const hasuraClient = ({ token, headers }: { token: string; headers?: Record<any, any> }) => {
  const userHeaders = token ? { Authorization: `Bearer ${token}` } : undefined;
  return new GraphQLClient(HASURA_URL, {
    method: 'post',
    headers: { ...userHeaders, ...headers }
  });
};
