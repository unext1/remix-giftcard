import type { ActionFunction } from '@remix-run/node';

import { webhookHandler } from '~/services/stripe.server';

export const action: ActionFunction = ({ request }) => {
  return webhookHandler(request);
};
