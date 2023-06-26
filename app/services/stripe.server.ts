import Stripe from 'stripe';
import { env } from './env.server';
import { type UserType } from './auth.server';
import { hasuraClient } from './hasura.server';
import { graphql } from '~/_gql';
import { type OrganizationType } from './organization.server';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

const UPDATEORGANIZATIONSSTRIPECUSTOMERID = graphql(`
  mutation UpdateOrgranizationsStripeCustomerId($organizationId: uuid!, $stripeCustomerId: String!) {
    updateOrganizationByPk(pk_columns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {
      stripeCustomerId
    }
  }
`);

const UPDATEORGANIZATIONSTRIPEACCOUNT = graphql(`
  mutation UpdateOrganizationStripeAccount($organizationId: uuid!, $stripeAccountId: String!) {
    updateOrganizationByPk(pk_columns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {
      stripeAccountId
    }
  }
`);

export const updateOrganizationsCustomerId = async ({
  email,
  organizationId,
  user
}: {
  email: string;
  organizationId: string;
  user: UserType;
}) => {
  const customer = await stripe.customers.create({
    email
  });

  await hasuraClient({ token: user.token }).request(UPDATEORGANIZATIONSSTRIPECUSTOMERID, {
    organizationId,
    stripeCustomerId: customer.id
  });

  return customer.id;
};

export const createStripeAccount = async ({
  return_url,
  user,
  organization,
  business_type
}: {
  return_url: string;
  user: UserType;
  organization: OrganizationType;
  business_type: 'individual' | 'company';
}) => {
  const address: Stripe.AddressParam = {
    city: organization.address.city,
    country: organization.address.country,
    line1: organization.address.line1,
    line2: organization.address.line2 || '',
    postal_code: organization.address.postalCode,
    state: organization.address.state || ''
  };
  const account = await stripe.accounts.create({
    type: 'express',
    email: organization.email,
    business_type,
    company: {
      name: organization.name,
      address: business_type === 'company' ? address : {}
    },
    individual: {
      email: organization.email,
      address: business_type === 'individual' ? address : {}
    },
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
  console.log(account);

  await hasuraClient({ token: user.token }).request(UPDATEORGANIZATIONSTRIPEACCOUNT, {
    organizationId: organization.id,
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

export const stripeDashboard = async ({ accountId }: { accountId: string }) => {
  const dashboardLink = await stripe.accounts.createLoginLink(accountId);
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
    }
    // {
    //   quantity: 1,
    //   price_data: {
    //     product_data: {
    //       name: 'Coupon 200kr'
    //     },
    //     unit_amount: 200 * 100,
    //     currency: 'sek'
    //   }
    // }
  ];
  const total = coupons.reduce((total, coupon) => total + coupon.price_data.unit_amount, 0);
  const totalFee = Math.ceil(total * 0.035 + 1000);
  console.log(totalFee, 'myfee');
  console.log(Math.ceil(total * 0.025 + 180), 'stripefee');

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
    // payment_method_types: ['card', 'klarna'],
    line_items: [
      {
        price: 'price_1NKlmWE9sPp9rw1vAfNfFlXY',
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
  if (user.organizations[0].stripeCustomerId) {
    return user.organizations[0].stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email
  });

  await hasuraClient({ token: user.token }).request(UPDATEORGANIZATIONSSTRIPECUSTOMERID, {
    stripeCustomerId: customer.id,
    organizationId: user.organizations[0].id
  });

  return customer.id;
};

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
