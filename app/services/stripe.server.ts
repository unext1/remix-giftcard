import Stripe from 'stripe';
import { graphql } from '~/_gql';
import { UserType, type UserSession } from './auth.server';
import { env } from './env.server';
import { hasuraClient } from './hasura.server';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

const UPDATEUSERSTRIPEACCOUNT = graphql(`
  mutation UpdateUserStripeAccount($id: uuid!, $stripeAccountId: String!) {
    updateUserByPk(pk_columns: { id: $id }, _set: { stripeAccountId: $stripeAccountId }) {
      stripeAccountId
    }
  }
`);

const GETSTRIPEACCOUNT = graphql(`
  query GetStripeAccount($userId: uuid!) {
    userByPk(id: $userId) {
      stripeAccount {
        ... on Account {
          id
          email
          settings {
            dashboard {
              display_name
            }
          }
          charges_enabled
        }
      }
    }
  }
`);

const UPDATECUSTOMERID = graphql(`
  mutation UpdateCustomerId($userId: uuid!, $stripeCustomerId: String!) {
    updateUserByPk(pk_columns: { id: $userId }, _set: { stripeCustomerId: $stripeCustomerId }) {
      id
    }
  }
`);

// STRIPE ACCOUNT
export const createStripeAccount = async ({ return_url, user }: { return_url: string; user: UserSession }) => {
  const account = await stripe.accounts.create({
    type: 'express',
    email: user.email,
    business_profile: {
      product_description: env.SITE_URL,
      name: 'Qpong'
    },
    metadata: {
      userId: user.id
    },
    default_currency: 'sek',
    country: 'SE'
  });

  await hasuraClient({ token: user.token }).request(UPDATEUSERSTRIPEACCOUNT, {
    id: user.id,
    stripeAccountId: account.id
  });

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    return_url,
    refresh_url: return_url,
    type: 'account_onboarding'
  });

  return accountLink;
};

export const updateStripeAccount = async ({ accountId, return_url }: { accountId: string; return_url: string }) => {
  const accountLink = await stripe.accountLinks.create({
    account: accountId,
    return_url,
    refresh_url: return_url,
    type: 'account_onboarding'
  });
  return accountLink;
};

export const getStripeAccount = async ({ user }: { user: UserSession }) => {
  const account = await hasuraClient({ token: user.token }).request(GETSTRIPEACCOUNT, {
    userId: user.id
  });
  return account;
};

// ENDDDDDDD

export const stripeDashboard = async ({ accountId }: { accountId: string }) => {
  const dashboardLink = await stripe.accounts.createLoginLink(accountId);
  console.log(dashboardLink);
  return dashboardLink;
};

export const stripeCheckout = async ({ accountId }: { accountId: string }) => {
  const coupons = [
    {
      quantity: 1,
      price_data: {
        product_data: {
          name: 'Coupon 500kr'
        },
        unit_amount: 500 * 100,
        currency: 'sek'
      }
    },
    {
      quantity: 1,
      price_data: {
        product_data: {
          name: 'Coupon 200kr'
        },
        unit_amount: 200 * 100,
        currency: 'sek'
      }
    }
  ];

  const total = coupons.reduce((total, coupon) => total + coupon.price_data.unit_amount, 0);
  const totalFee = Math.ceil(total * 0.025 + 15);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card', 'link', 'klarna'],
    line_items: [...coupons],
    payment_intent_data: {
      application_fee_amount: totalFee,
      transfer_data: {
        destination: accountId
      }
    },
    success_url: 'http://localhost:3000/app/workdplsad',
    cancel_url: 'http://localhost:3000/app/workdplsad'
  });

  return session;
};

export const createStripeSubscription = async ({ return_url, user }: { return_url: string; user: UserType }) => {
  const customerId = await getStripeCustomerId({ user });

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: 'price_1NJxIYE9sPp9rw1v3i3il3g8',
        quantity: 1
      }
    ],
    customer: customerId,
    metadata: {
      userId: user.id
    },
    success_url: return_url,
    cancel_url: return_url
  });
  return session;
};

export const manageSubscriptions = async ({ return_url, user }: { return_url: string; user: UserType }) => {
  const customerId = await getStripeCustomerId({ user });

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url
  });

  return session;
};

export const getStripeCustomerId = async ({ user }: { user: UserType }) => {
  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email
  });

  await hasuraClient({ token: user.token }).request(UPDATECUSTOMERID, {
    stripeCustomerId: customer.id,
    userId: user.id
  });

  return customer.id;
};

//HOOOOKS

export const webhookHandler = async (request: Request) => {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET as string);

  switch (event.type) {
    case 'payment_intent.succeeded':
      console.log('sucesss');
      break;
    case 'payment_intent.payment_failed':
      console.log('failed');
      break;
    case 'charge.succeeded':
      console.log('pinigai gauti');
      break;
    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  return true;
};
