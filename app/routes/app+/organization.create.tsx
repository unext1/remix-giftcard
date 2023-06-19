import { Form, Link } from '@remix-run/react';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { json, type ActionArgs, type LoaderArgs, redirect } from '@remix-run/node';
import { requireUser } from '~/services/auth.server';
import { namedAction } from 'remix-utils';
import { Button } from '~/components/ui/button';
import { zx } from 'zodix';
import { z } from 'zod';
import { createNewOrganization } from '~/services/organization.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

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

const createOrganization = () => {
  return (
    <div className="grid grid-cols-2 h-screen-safe container mx-auto">
      <div className="">
        <Link to="/app" className="btn btn-primary btn-sm">
          {'<'}
        </Link>
      </div>
      <div>
        <Form method="post">
          <div>
            <Label htmlFor="name" className="my-auto">
              Organization Name
            </Label>
            <Input name="name" className="bg-neutral" defaultValue="mine" />
          </div>
          <div>
            <Label htmlFor="email" className="my-auto">
              Organization Email
            </Label>
            <Input name="email" className="bg-neutral" defaultValue="info@lauva.dev" />
          </div>
          <div>
            <Label htmlFor="line1" className="my-auto">
              Line1
            </Label>
            <Input name="line1" className="bg-neutral" defaultValue="line1" />
          </div>
          <div>
            <Label htmlFor="line2" className="my-auto">
              Line2
            </Label>
            <Input name="Line2" className="bg-neutral" defaultValue="line2" />
          </div>
          <div>
            <Label htmlFor="city" className="my-auto">
              city
            </Label>
            <Input name="city" className="bg-neutral" defaultValue="city" />
          </div>
          <div>
            <Label htmlFor="state" className="my-auto">
              state
            </Label>
            <Input name="state" className="bg-neutral" defaultValue="state" />
          </div>
          <div>
            <Label htmlFor="postalCode" className="my-auto">
              postalCode
            </Label>
            <Input name="postalCode" className="bg-neutral" defaultValue="35532" />
          </div>
          <div>
            <Label htmlFor="country" className="my-auto">
              country
            </Label>
            <Input name="country" className="bg-neutral" defaultValue="se" />
          </div>
          <div>
            <Label htmlFor="business_type" className="my-auto">
              business_type
            </Label>
            <Input name="business_type" className="bg-neutral" defaultValue="individual" />
          </div>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </div>
  );
};

export default createOrganization;
