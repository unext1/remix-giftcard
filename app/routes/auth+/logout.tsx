import { redirect, type DataFunctionArgs } from '@remix-run/node';

import { authenticator } from '~/services/auth.server';

export const loader = () => {
  return redirect('/app');
};

export const action = ({ request }: DataFunctionArgs) => {
  return authenticator.logout(request, { redirectTo: '/' });
};
