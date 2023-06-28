import { Form, Link, useNavigation } from '@remix-run/react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { json, type ActionArgs, type LoaderArgs, redirect } from '@remix-run/node';
import { requireUser } from '~/services/auth.server';
import { Button } from '~/components/ui/button';
import { zx } from 'zodix';
import { z } from 'zod';
import { createNewOrganization } from '~/services/organization.server';
import { LoaderIcon } from 'lucide-react';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  if (user.organizations.length > 0) {
    return redirect('/app');
  }

  return {};
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });
  const { name, email, line1, line2, city, state, postalCode, country, business_type } = await zx.parseForm(request, {
    name: z.string(),
    email: z.string().email(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    business_type: z.enum(['individual', 'company'])
  });

  const orgCreated = await createNewOrganization({
    user,
    name,
    email,
    business_type,
    workplaceId: 'workplaceId',
    address: {
      line1,
      line2,
      city,
      state,
      postalCode,
      country
    }
  });
  if (orgCreated && orgCreated.url) return redirect(orgCreated.url);
}

const CreateOrganization = () => {
  const transition = useNavigation();

  const submitting = transition.state === 'submitting' || transition.state === 'loading';
  return (
    <div className="grid grid-cols-2 container mx-auto my-10 gap-10 ">
      <div className="bg-neutral text-neutral-content rounded-xl p-5 h-[860px]">
        <Link to="/app" className="btn btn-primary btn-sm">
          {'<'}
        </Link>
        <div className="flex justify-center items-center h-full">
          <img
            src="https://images.squarespace-cdn.com/content/v1/5ace1725266c0708f3759baf/1528921531988-04LTW5LKMMSFI5P3KFT3/Flat+Modern+Concept+Illustration+-+Development+Team.png?format=1000w"
            alt="illustration"
          />
        </div>
      </div>
      <div className="my-auto">
        <Form method="post">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Label htmlFor="name" className="my-auto">
                Organization Name
              </Label>
              <Input name="name" className="bg-neutral mt-1" defaultValue="mine" />
            </div>
            <div>
              <Label htmlFor="email" className="my-auto">
                Organization Email
              </Label>
              <Input name="email" className="bg-neutral mt-1" defaultValue="info@lauva.dev" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <Label htmlFor="line1" className="my-auto">
                Line1
              </Label>
              <Input name="line1" className="bg-neutral mt-1" defaultValue="line1" />
            </div>
            <div>
              <Label htmlFor="line2" className="my-auto">
                Line2
              </Label>
              <Input name="Line2" className="bg-neutral mt-1" defaultValue="line2" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mt-4">
            <div>
              <Label htmlFor="city" className="my-auto">
                city
              </Label>
              <Input name="city" className="bg-neutral mt-1" defaultValue="city" />
            </div>
            <div>
              <Label htmlFor="state" className="my-auto">
                state
              </Label>
              <Input name="state" className="bg-neutral mt-1" defaultValue="state" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 mt-4">
            <div>
              <Label htmlFor="postalCode" className="my-auto">
                postalCode
              </Label>
              <Input name="postalCode" className="bg-neutral mt-1" defaultValue="35532" />
            </div>
            <div>
              <Label htmlFor="country" className="my-auto">
                country
              </Label>
              <Input name="country" className="bg-neutral mt-1" defaultValue="se" />
            </div>
            <div>
              <Label htmlFor="business_type" className="my-auto">
                business_type
              </Label>
              <Input name="business_type" className="bg-neutral mt-1" defaultValue="individual" />
            </div>
          </div>
          <Button type="submit" className="mt-5" disabled={submitting}>
            {submitting ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CreateOrganization;
