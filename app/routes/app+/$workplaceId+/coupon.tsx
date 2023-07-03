import { Form } from '@remix-run/react';

import { json, redirect } from '@remix-run/node';
import type { ActionArgs } from '@remix-run/node';
import { namedAction } from 'remix-utils';
import { requireUser } from '~/services/auth.server';
import { stripeCheckout } from '~/services/stripe.server';
import QRCode from 'qrcode.react';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async checkout() {
      if (user.organizations.stripeAccountId) {
        const data = await stripeCheckout({ accountId: user.organizations.stripeAccountId });
        if (data && data.url) {
          return redirect(data.url);
        }
      }
      return json({ message: 'no stripe account' });
    }
  });
}
const Coupon = () => {
  return (
    <div>
      <Form method="post">
        <button type="submit" name="_action" value="checkout" className="btn btn-primary">
          checkout
        </button>
      </Form>
      {/* <QRCode value="https://reactjs.org/" /> */}
    </div>
  );
};

export default Coupon;
