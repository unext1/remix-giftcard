import { type CodegenConfig } from '@graphql-codegen/cli';
import { env } from './app/services/env.server';

const config: CodegenConfig = {
  debug: false,
  schema: {
    [`${env.HASURA_GRAPHQL_URL}/v1/graphql`]: {
      headers: {
        'x-hasura-admin-secret': env.HASURA_GRAPHQL_ADMIN_SECRET
      }
    }
  },
  ignoreNoDocuments: true,
  documents: ['app/**/*.{graphql,ts,tsx}', '!app/_gql/**/*.{graphql,ts,tsx}'],
  generates: {
    './app/_gql/': {
      overwrite: true,
      preset: 'client',
      presetConfig: {
        fragmentMasking: false
      },
      config: {
        dedupeFragments: true,
        useTypeImports: true,
        skipTypename: true,
        enumsAsTypes: true,
        scalars: {
          bigint: 'number',
          uuid: 'string',
          date: 'string',
          time: 'string',
          daterange: 'string',
          timestamptz: 'string'
        }
      }
    }
  }
};

export default config;
