import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from 'lucide-react';

import { json, type ActionArgs, type LoaderArgs, redirect } from '@remix-run/node';
import { namedAction } from 'remix-utils';
import { createStripeSubscription, manageSubscriptions, getStripeCustomerData } from '~/services/stripe.server';
import { requireUser } from '~/services/auth.server';
import { Form, useLoaderData } from '@remix-run/react';
import { zx } from 'zodix';
import { z } from 'zod';

type Price = {
  [key: string]: string;
};
const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'yearly', label: 'Yearly', priceSuffix: '/year' }
];

const tiers = [
  {
    name: 'Free',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '0 SEK', yearly: '0 SEK' } as Price,
    description: 'This Plan is dedicated to small buisnesses',
    features: ['Limited to 1 workplace', 'Unlimited Users', 'Stripe Payouts', 'QR-Codes', 'Buisness Managment'],
    featured: true,
    cta: 'Current Plan'
  },
  {
    name: 'Pro',
    id: 'tier-freelancer',
    href: '#',
    price: { monthly: '49 SEK', yearly: '489 SEK' } as Price,
    description: 'The essentials to provide your buisness with the best possible experience.',
    features: [
      '14 Days Trial',
      'Up to 5 Workplaces',
      'Unlimited Users',
      'Stripe Payouts',
      'QR-Codes',
      'Buisness Managment'
    ],
    featured: false,
    cta: 'Buy Subscription'
  },
  {
    name: 'Enterprice',
    id: 'tier-startup',
    href: '#',
    description: 'A plan that scales with your rapidly growing business.',
    features: ['Personal Features', '24/7 Support'],
    featured: false,
    cta: 'Contact Us'
  }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });
  return namedAction(request, {
    async subscribe() {
      const { plan } = await zx.parseForm(request, {
        plan: z.enum(['monthly', 'yearly'])
      });

      if (!user?.organizations?.stripeCustomerId)
        throw redirect(`http://localhost:3000/app/${params.workplaceId}/settings/organization`);
      const data = await createStripeSubscription({ return_url: request.url, user, plan });

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

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  return json({ user });
}

export default function BillingSettings() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  const { user } = useLoaderData<typeof loader>();

  if (user?.organizations?.stripeSubscriptionId) {
    return (
      <div>
        Billing
        <Form method="post" className="mt-6">
          <button type="submit" name="_action" value="manage" className="btn btn-primary btn-sm">
            Manage Subscriptions
          </button>
        </Form>
      </div>
    );
  }
  return (
    <div>
      Billing
      <div className="px-6 lg:px-8">
        <div className="mt-16 flex justify-center">
          <RadioGroup
            value={frequency}
            onChange={setFrequency}
            className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs font-semibold leading-5 ring-1 ring-inset ring-gray-200"
          >
            <RadioGroup.Label className="sr-only">Payment frequency</RadioGroup.Label>
            {frequencies.map((option) => (
              <RadioGroup.Option
                key={option.value}
                value={option}
                className={({ checked }) =>
                  classNames(
                    checked ? 'bg-primary text-primary-content' : 'text-gray-500',
                    'cursor-pointer rounded-full px-2.5 py-1'
                  )
                }
              >
                <span>{option.label}</span>
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
        <div className="mx-auto mt-10 grid grid-cols-1 gap-8 lg:mx-0 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.id} className="rounded-3xl p-8 xl:p-10 bg-background">
              <h3 id={tier.id} className="text-xl font-semibold">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6">{tier.description}</p>
              {tier.price ? (
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight"> {tier.price[frequency.value]}</span>

                  {typeof tier.price !== 'string' ? (
                    <span className="text-sm font-semibold leading-6">{frequency.priceSuffix}</span>
                  ) : null}
                </p>
              ) : null}

              <Form method="post">
                <input type="hidden" name="plan" value={frequency.value} />
                <button
                  disabled={tier.featured}
                  type="submit"
                  name="_action"
                  value="subscribe"
                  className="btn btn-primary mt-8 w-full"
                >
                  {tier.cta}
                </button>
              </Form>
              <ul className="mt-8 space-y-3 text-sm leading-6 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <CheckIcon className="w-4" /> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        F
      </div>
    </div>
  );
}
