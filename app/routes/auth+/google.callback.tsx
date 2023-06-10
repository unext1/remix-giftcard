import type { LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export function loader({ request }: LoaderArgs) {
  return authenticator.authenticate('google', request, {
    failureRedirect: '/login',
    successRedirect: '/app'
  });
}
