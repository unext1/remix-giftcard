import type { LoaderArgs } from '@remix-run/node';
import { json, redirect, type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { namedAction } from 'remix-utils';
import { requireUser } from '~/services/auth.server';
import {
  createStripeAccount,
  createStripeSubscription,
  manageSubscriptions,
  stripeCheckout,
  stripeDashboard,
  updateStripeAccount
} from '~/services/stripe.server';
export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async create() {
      const accountLink = await createStripeAccount({
        return_url: request.url,
        user
      });
      console.log(accountLink);

      return redirect(accountLink.url);
    },
    async update() {
      console.log('update');
      console.log(user.stripeAccountId);
      if (user.stripeAccountId) {
        const accountLink = await updateStripeAccount({
          accountId: user.stripeAccountId,
          return_url: request.url
        });
        return redirect(accountLink.url);
      }
      return json({ message: 'no stripe account' });
    },
    async open() {
      if (user.stripeAccountId) {
        const data = await stripeDashboard({ accountId: user.stripeAccountId });
        return redirect(data.url);
      }
      return json({ message: 'no stripe account' });
    },
    async checkout() {
      if (user.stripeAccountId) {
        const data = await stripeCheckout({ accountId: user.stripeAccountId });
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
  // const stripeAccount = await getStripeAccount({ user });
  // console.log(stripeAccount);

  return json({ hasStripeAccount: !!user.stripeAccountId });
}

const Dashboard = () => {
  const { hasStripeAccount } = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Stripe</h1>
      <Form method="post">
        {hasStripeAccount ? (
          <button type="submit" name="_action" value="update">
            Update
          </button>
        ) : (
          <div>
            <button type="submit" name="_action" value="create">
              Create
            </button>
          </div>
        )}
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
    </div>
  );
};
export default Dashboard;
