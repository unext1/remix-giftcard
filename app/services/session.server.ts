import { createCookieSessionStorage } from '@remix-run/node';

import { env } from './env.server';

type Cookie = NonNullable<Required<Parameters<typeof createCookieSessionStorage>[0]>>['cookie'];

const cookie = (name: string): Cookie => ({
  name,
  sameSite: 'lax',
  path: '/',
  httpOnly: true,
  secrets: env.JWT_SECRET_KEY,
  secure: process.env.NODE_ENV === 'production'
});

export const sessionStore = createCookieSessionStorage({
  cookie: cookie('_session')
});

export const { getSession, commitSession, destroySession } = sessionStore;
