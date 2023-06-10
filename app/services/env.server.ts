import 'dotenv/config';
import z from 'zod';

const environmentSchema = z.object({
  // SITE
  SITE_URL: z.string().min(1).trim(),
  // HASURA
  HASURA_GRAPHQL_URL: z.string().min(1).trim(),
  HASURA_GRAPHQL_ADMIN_SECRET: z.string().min(1).trim(),
  HASURA_GRAPHQL_JWT_SECRET: z.string().transform((item) =>
    z
      .object({
        key: z.string().trim(),
        type: z.enum(['HS256', 'HS512']).default('HS256')
      })
      .parse(JSON.parse(item))
  ),
  //jwt
  JWT_SECRET_KEY: z.string().min(1).trim(),
  // GOOGLE
  GOOGLE_CLIENT_ID: z.string().min(1).trim(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).trim()
});

export const env = environmentSchema.parse(process.env);
