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
