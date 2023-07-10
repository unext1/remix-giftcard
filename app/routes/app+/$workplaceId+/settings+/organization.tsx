import { Label } from '@radix-ui/react-label';
import { type ActionArgs, json, redirect, type LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData, useNavigation } from '@remix-run/react';
import { LoaderIcon } from 'lucide-react';
import { namedAction } from 'remix-utils';
import { z } from 'zod';
import { zx } from 'zodix';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { requireUser } from '~/services/auth.server';
import { createNewOrganization } from '~/services/organization.server';
import { stripeDashboard, updateStripeAccount } from '~/services/stripe.server';
import { getWorkplaceOrganization } from '~/services/workplace.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });
  const data = await getWorkplaceOrganization({
    token: user.token,
    workplaceId: params.workplaceId || ''
  });

  const isOwner = user.id === data?.ownerId;
  return json({ data, user, isOwner });
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async create() {
      const { name, email, line1, line2, city, state, postalCode, country, business_type } = await zx.parseForm(
        request,
        {
          name: z.string(),
          email: z.string().email(),
          line1: z.string(),
          line2: z.string().optional(),
          city: z.string(),
          state: z.string(),
          postalCode: z.string(),
          country: z.string(),
          business_type: z.enum(['individual', 'company'])
        }
      );
      const orgCreated = await createNewOrganization({
        user,
        name,
        email,
        business_type,
        workplaceId: params.workplaceId || '',
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
      else return json({ message: 'error' });
    },
    async dashboard() {
      const { stripeAccountId } = await zx.parseForm(request, {
        stripeAccountId: z.string()
      });

      const data = await stripeDashboard({ accountId: stripeAccountId });
      return redirect(data.url);
    },
    async update() {
      const { stripeAccountId } = await zx.parseForm(request, {
        stripeAccountId: z.string()
      });
      if (stripeAccountId) {
        const accountLink = await updateStripeAccount({
          accountId: stripeAccountId,
          return_url: request.url
        });
        return redirect(accountLink.url);
      }

      return json({ message: 'no stripe account' });
    }
  });
}

const OrganizationSettingsPage = () => {
  const { data, user, isOwner } = useLoaderData<typeof loader>();

  const transition = useNavigation();

  const submitting = transition.state === 'submitting' || transition.state === 'loading';

  if (isOwner) {
    return (
      <>
        <div className="mb-4">Organization's settings</div>
        {!data?.organization?.id ? (
          <Form method="post">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name" className="my-auto text-xs uppercase mb-1">
                  Organization Name
                </Label>
                <Input name="name" className="bg-background mt-1" defaultValue="mine" />
              </div>
              <div>
                <Label htmlFor="email" className="my-auto text-xs uppercase mb-1">
                  Organization Email
                </Label>
                <Input name="email" className="bg-background mt-1" defaultValue="info@lauva.dev" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-4">
              <div>
                <Label htmlFor="line1" className="my-auto text-xs uppercase mb-1">
                  Line1
                </Label>
                <Input name="line1" className="bg-background mt-1" defaultValue="line1" />
              </div>
              <div>
                <Label htmlFor="line2" className="my-auto text-xs uppercase mb-1">
                  Line2
                </Label>
                <Input name="Line2" className="bg-background mt-1" defaultValue="line2" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mt-4">
              <div>
                <Label htmlFor="city" className="my-auto text-xs uppercase mb-1">
                  city
                </Label>
                <Input name="city" className="bg-background mt-1" defaultValue="city" />
              </div>
              <div>
                <Label htmlFor="state" className="my-auto text-xs uppercase mb-1">
                  state
                </Label>
                <Input name="state" className="bg-background mt-1" defaultValue="state" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mt-4">
              <div>
                <Label htmlFor="postalCode" className="my-auto text-xs uppercase mb-1">
                  postalCode
                </Label>
                <Input name="postalCode" className="bg-background mt-1" defaultValue="35532" />
              </div>
              <div>
                <Label htmlFor="country" className="my-auto text-xs uppercase mb-1">
                  country
                </Label>
                <Input name="country" className="bg-background mt-1" defaultValue="se" />
              </div>
              <div>
                <Label htmlFor="business_type" className="my-auto text-xs uppercase mb-1">
                  business_type
                </Label>
                <Input name="business_type" className="bg-background mt-1" defaultValue="individual" />
              </div>
            </div>
            <Button
              type="submit"
              name="_action"
              value="create"
              className="mt-5"
              variant="default"
              disabled={submitting}
            >
              {submitting ? <LoaderIcon className="mr-2 h-4 w-4 animate-spin" /> : 'Submit'}
            </Button>
          </Form>
        ) : data.organization.chargesEnabled ? (
          <Form method="post">
            <input type="hidden" name="stripeAccountId" value={data.organization.stripeAccountId || ''} />
            <div className="mt-4">
              <button type="submit" name="_action" value="dashboard" className="btn btn-primary btn-sm">
                Dashboard
              </button>
            </div>
          </Form>
        ) : (
          <Form method="post">
            <input type="hidden" name="stripeAccountId" value={data.organization.stripeAccountId || ''} />

            <h2 className="mt-4 font-medium ">You haven't finished setting up your organization yet !</h2>
            <div className="mt-4">
              <button type="submit" name="_action" value="update" className="btn btn-sm btn-primary">
                Continue Setup
              </button>
            </div>
          </Form>
        )}
      </>
    );
  }

  return (
    <>
      <h1>Organization Details</h1>
      {data?.organization?.id ? (
        <div>
          <h1>MEMBER VIEW</h1>
        </div>
      ) : (
        <div>
          <h1>This Workplace is not a member of any organization</h1>
        </div>
      )}
    </>
  );
};

export default OrganizationSettingsPage;
