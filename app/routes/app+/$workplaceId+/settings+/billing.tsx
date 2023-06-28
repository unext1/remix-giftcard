import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';

type Price = {
  [key: string]: string;
};
const frequencies = [
  { value: 'monthly', label: 'Monthly', priceSuffix: '/month' },
  { value: 'annually', label: 'Annually', priceSuffix: '/year' }
];

const tiers = [
  {
    name: 'Free',
    id: 'tier-enterprise',
    href: '#',
    price: { monthly: '0 SEK', annually: '0 SEK' } as Price,
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Advanced analytics',
      '1-hour, dedicated support response time',
      'Marketing automations',
      'Custom reporting tools'
    ],
    featured: true,
    cta: 'Contact sales'
  },
  {
    name: 'Freelancer',
    id: 'tier-freelancer',
    href: '#',
    price: { monthly: '150 SEK', annually: '1399 SEK' } as Price,
    description: 'The essentials to provide your best work for clients.',
    features: ['5 products', 'Up to 1,000 subscribers', 'Basic analytics', '48-hour support response time'],
    featured: false,
    cta: 'Buy plan'
  },
  {
    name: 'Startup',
    id: 'tier-startup',
    href: '#',
    price: { monthly: '289 SEK', annually: '2499 SEK' } as Price,
    description: 'A plan that scales with your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Advanced analytics',
      '24-hour support response time',
      'Marketing automations'
    ],
    featured: false,
    cta: 'Buy plan'
  }
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function BillingSettings() {
  const [frequency, setFrequency] = useState(frequencies[0]);

  return (
    <div className="">
      <div className=" px-6 lg:px-8">
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
        <div className=" mx-auto mt-10 grid grid-cols-1 gap-8 lg:mx-0 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div key={tier.id} className="rounded-3xl p-8 ring-1 xl:p-10 bg-background">
              <h3 id={tier.id} className="">
                {tier.name}
              </h3>
              <p className="mt-4 text-sm leading-6">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight"> {tier.price[frequency.value]}</span>

                {typeof tier.price !== 'string' ? (
                  <span className="text-sm font-semibold leading-6">{frequency.priceSuffix}</span>
                ) : null}
              </p>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className="mt-6 block rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {tier.cta}
              </a>
              <ul className="mt-8 space-y-3 text-sm leading-6 xl:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <div className="h-6 w-5 flex-none" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
