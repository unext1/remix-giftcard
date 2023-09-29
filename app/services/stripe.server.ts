import Stripe from 'stripe';
import { env } from './env.server';
import { type UserType } from './auth.server';
import { hasuraAdminClient, hasuraClient } from './hasura.server';
import { graphql } from '~/_gql';
import { type OrganizationType } from './organization.server';
import { type SubscriptionStatusEnum } from '~/_gql/graphql';
import { CREATEGIFTCARD } from './gift.server.';

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

const UPDATEORGANIZATIONSSTRIPECUSTOMERID = graphql(`
  mutation UpdateOrgranizationsStripeCustomerId($organizationId: Uuid!, $stripeCustomerId: String!) {
    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeCustomerId: $stripeCustomerId }) {
      stripeCustomerId
    }
  }
`);

const UPDATECHARGESENEBLED = graphql(`
  mutation UpdateOrganizationsChargesEnabled($id: Uuid!) {
    updateOrganizationByPk(pkColumns: { id: $id }, _set: { chargesEnabled: true }) {
      id
    }
  }
`);

const UPDATEORGANIZATIONSTRIPEACCOUNT = graphql(`
  mutation UpdateOrganizationStripeAccount($organizationId: Uuid!, $stripeAccountId: String!) {
    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeAccountId: $stripeAccountId }) {
      stripeAccountId
    }
  }
`);

const SUBSCRIPTIONSTATUS = graphql(`
  query SubscriptionStatus {
    subscriptionStatus {
      status
      description
    }
  }
`);

const UPDATEORGANIZATIONSUBSCRIPTIONSTATUS = graphql(`
  mutation UpdateSubscriptionStatus($organizationId: Uuid!, $status: SubscriptionStatusEnum!) {
    updateOrganization(where: { id: { _eq: $organizationId } }, _set: { stripeSubscriptionStatus: $status }) {
      returning {
        id
      }
    }
  }
`);

const UPDATEORGANIZATIONSUBSCRIPTIONID = graphql(`
  mutation UpdateSubscriptionId($organizationId: Uuid!, $subscriptionId: String!) {
    updateOrganizationByPk(pkColumns: { id: $organizationId }, _set: { stripeSubscriptionId: $subscriptionId }) {
      id
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
    capabilities: {
      card_payments: {
        requested: true
      },
      transfers: {
        requested: true
      }
    },
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
      userId: user.id,
      organizationId: organization.id
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

export const stripeCheckout = async ({ accountId, workplaceId }: { accountId: string; workplaceId: string }) => {
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
    metadata: {
      workplaceId: workplaceId,
      labas: 'hiii'
    },
    success_url: 'http://localhost:3000/app/workplace/giftCards',
    cancel_url: 'http://localhost:3000/app/workplace/giftCards'
  });

  return session;
};

export const createStripeSubscription = async ({
  return_url,
  user,
  plan
}: {
  return_url: string;
  user: UserType;
  plan: 'monthly' | 'yearly';
}) => {
  const customerId = await getStripeCustomerId({ user });

  const line_items = [
    {
      price: plan === 'monthly' ? 'price_1NKlmWE9sPp9rw1vAfNfFlXY' : 'price_1NKlmWE9sPp9rw1vjXiyiEUO',
      quantity: 1
    }
  ];

  if (customerId) {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items,
      customer: customerId,
      metadata: {
        organizationId: user.organizations.id
      },
      subscription_data: {
        metadata: {
          organizationId: user.organizations.id
        }
      },
      success_url: return_url,
      cancel_url: return_url
    });

    return session;
  }

  return;
};

export const manageSubscriptions = async ({ return_url, user }: { return_url: string; user: UserType }) => {
  const customerId = await getStripeCustomerId({ user });

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url
  });

  return session;
};

export const getStripeCustomerData = async ({ user }: { user: UserType }) => {
  const id = user.organizations.stripeCustomerId;
  const customer = await stripe.customers.retrieve(user.organizations.stripeCustomerId as string);
  return customer.object;
};

export const getStripeCustomerId = async ({ user }: { user: UserType }) => {
  if (user?.organizations?.stripeCustomerId) {
    return user.organizations.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email
  });

  await hasuraClient({ token: user.token }).request(UPDATEORGANIZATIONSSTRIPECUSTOMERID, {
    stripeCustomerId: customer.id,
    organizationId: user.organizations.id
  });

  return customer.id;
};

export const getStripeAccountId = async ({ stripeAccountId }: { stripeAccountId: string }) => {
  const account = await stripe.accounts.retrieve(stripeAccountId);

  console.log(account.details_submitted);
  return account;
};

export const updateStatus = async (data: Stripe.Subscription) => {
  const status = data.status.toLocaleUpperCase() as SubscriptionStatusEnum;
  const organizationId = data?.metadata?.organizationId as string;

  if (!organizationId) return;

  return await hasuraAdminClient().request(UPDATEORGANIZATIONSUBSCRIPTIONSTATUS, { organizationId, status });
};

export const webhookHandler = async (request: Request) => {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') as string;
  const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET as string);

  switch (event.type) {
    case 'payment_intent.succeeded': {
      console.log('sucesss');

      break;
    }
    case 'payment_intent.payment_failed':
      console.log('failed');
      break;
    case 'charge.succeeded': {
      console.log('pinigai gauti');
      // console.log(event.data.object);

      break;
    }
    case 'checkout.session.completed': {
      const data = event.data.object as Stripe.Checkout.Session;
      const organizationId = data.metadata?.organizationId;
      const subscriptionId = data.subscription as string;
      const workplaceId = data.metadata?.workplaceId as string;

      if (data.mode === 'payment' && data.status === 'complete') {
        await hasuraAdminClient().request(CREATEGIFTCARD, {
          amount: (data && data.amount_total && data.amount_total / 100) || 0,
          workplaceId: workplaceId,
          isActive: true,
          customerEmail: data.customer_details?.email
        });
      }

      if (data.mode === 'subscription') {
        if (!organizationId || !subscriptionId) break;

        if (data.status === 'complete') {
          await hasuraAdminClient().request(UPDATEORGANIZATIONSUBSCRIPTIONID, {
            organizationId,
            subscriptionId
          });
        }
      }
      break;
    }

    case 'customer.subscription.updated':
    case 'customer.subscription.created':
    case 'customer.subscription.deleted':
    case 'customer.subscription.resumed':
    case 'customer.subscription.paused': {
      const data = event.data.object as Stripe.Subscription;

      await updateStatus(data);
      break;
    }

    case 'account.updated': {
      const account = event.data.object as Stripe.Account;

      if (account.charges_enabled) {
        if (account?.metadata?.organizationId) {
          await hasuraAdminClient().request(UPDATECHARGESENEBLED, {
            id: account.metadata.organizationId
          });
        }
        return {};
      }
      break;
    }

    default:
      console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  return true;
};
