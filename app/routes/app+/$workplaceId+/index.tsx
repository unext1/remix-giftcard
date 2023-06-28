import { type LoaderArgs, json, redirect, type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { namedAction } from 'remix-utils';
import { requireUser } from '~/services/auth.server';
import {
  createStripeSubscription,
  manageSubscriptions,
  stripeCheckout,
  stripeDashboard,
  updateStripeAccount
} from '~/services/stripe.server';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async update() {
      console.log('update');
      console.log(user.organizations[0].stripeAccountId);
      if (user.organizations[0].stripeAccountId) {
        const accountLink = await updateStripeAccount({
          accountId: user.organizations[0].stripeAccountId,
          return_url: request.url
        });
        return redirect(accountLink.url);
      }
      return json({ message: 'no stripe account' });
    },
    async open() {
      if (user.organizations[0].stripeAccountId) {
        const data = await stripeDashboard({ accountId: user.organizations[0].stripeAccountId });
        return redirect(data.url);
      }
      return json({ message: 'no stripe account' });
    },
    async checkout() {
      if (user.organizations[0].stripeAccountId) {
        const data = await stripeCheckout({ accountId: user.organizations[0].stripeAccountId });
        if (data && data.url) {
          return redirect(data.url);
        }
      }
      return json({ message: 'no stripe account' });
    },
    async subscribe() {
      const data = await createStripeSubscription({ return_url: request.url, user });

      if (data && data.url) {
        return redirect(data.url);
      }
      return json({ message: 'no stripe account' });
    },
    async manage() {
      const data = await manageSubscriptions({ user, return_url: request.url });
      if (data) {
        return redirect(data.url);
      }
      return json({ message: 'no stripe account' });
    }
  });
}

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser({ request, params });

  return json({ organizations: user.organizations });
}

const Dashbaord = () => {
  const { organizations } = useLoaderData<typeof loader>();
  return (
    <div>
      <>
        <h1>Stripe</h1>
        <Form method="post">
          <button type="submit" name="_action" value="update">
            Update
          </button>

          <div>
            <button type="submit" name="_action" value="open">
              dashboard
            </button>
          </div>
          <div>
            <button type="submit" name="_action" value="checkout">
              checkout
            </button>
          </div>
          <div>
            <button type="submit" name="_action" value="subscribe">
              subscribe
            </button>
          </div>
          <div>
            <button type="submit" name="_action" value="manage">
              manage
            </button>
          </div>
        </Form>
      </>
    </div>
  );
};
export default Dashbaord;
