import { Label } from '@radix-ui/react-label';
import { json, redirect, type ActionArgs, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { namedAction } from 'remix-utils';
import { route } from 'routes-gen';
import { z } from 'zod';
import { zx } from 'zodix';
import Invitations from '~/components/app/index/invitations';
import { TopBar } from '~/components/app/index/topBar';
import { WorkplaceCard } from '~/components/app/index/workplaceCard';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { authenticator, requireUser } from '~/services/auth.server';
import { getOwnedOrganizations } from '~/services/organization.server';
import {
  acceptInvitation,
  cancelInvitation,
  createWorkplace,
  getAllWorkplaces,
  getYourInvitations
} from '~/services/workplace.server';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader({ request, params }: LoaderArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: '/login' });

  const user = await requireUser({ request, params, noRedirect: true });

  const invitations = await getYourInvitations({ token: user.token });

  const workplaces = await getAllWorkplaces({ token: user.token });

  const organizations = await getOwnedOrganizations({ user });

  return json({ invitations, workplaces, organizations, user });
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params, noRedirect: true });

  return namedAction(request, {
    async create() {
      const { title } = await zx.parseForm(request, {
        title: z.string()
      });
      const workplace = await createWorkplace({
        user,
        title,
        organizationId: user?.organizations?.id || null
      });

      return redirect(route('/app/:workplaceId', { workplaceId: workplace?.[0].id }));
    },
    async accept() {
      const { workplaceId, invitationId } = await zx.parseForm(request, {
        workplaceId: z.string(),
        invitationId: z.string()
      });
      await acceptInvitation({ user: user, workplaceId, invitationId });
      return redirect(route('/app/:workplaceId', { workplaceId }));
    },
    async cancel() {
      const { invitationId } = await zx.parseForm(request, {
        invitationId: z.string()
      });
      const deleted = await cancelInvitation({ token: user.token, invitationId });
      if (deleted) return json(true);
      else return json(false);
    }
  });
}

export default function AppIndex() {
  const { workplaces, invitations, organizations, user } = useLoaderData<typeof loader>();

  if (workplaces.length === 0 && invitations?.length === 0) {
    return (
      <div className="w-full min-h-screen-safe flex justify-center items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="my-auto" variant="default">
              Create Workplace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Workplace</DialogTitle>
            </DialogHeader>
            <Form method="post">
              <div className="space-x-4 flex mt-4">
                <Label htmlFor="title" className="my-auto">
                  Name
                </Label>
                <Input name="title" />
                {/* <Select>
                            <SelectTrigger className="w-[180px] bg-background">
                              <SelectValue placeholder="Organization" />
                            </SelectTrigger>
                            <SelectContent className="bg-background text-background-content">
                              {organizations.map((i) => (
                                <SelectItem value={i.id} key={i.id}>
                                  {i.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select> */}
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" className="btn-outline">
                  Cancel
                </Button>
                <Button name="_action" value="create" type="submit" variant="default">
                  Confirm
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen-safe">
      <div className="container mx-auto p-5">
        <TopBar user={user} />
        <Title title="Overview" />
        <div className="grid grid-cols-5 gap-5">
          <div className="bg-neutral rounded-md p-5 col-span-3 ">
            <div className="flex justify-between">
              <h1 className="text-xl my-2 font-semibold">Your workplaces</h1>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="my-auto" variant="default">
                    Create Workplace
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create a Workplace</DialogTitle>
                  </DialogHeader>
                  <Form method="post">
                    <div className=" mt-4">
                      <Label htmlFor="title" className="my-auto text-sm">
                        Workplace Name
                      </Label>
                      <Input name="title" required className="bg-neutral" placeholder="Workplace Name" />
                      {/* <Select>
                            <SelectTrigger className="w-[180px] bg-background">
                              <SelectValue placeholder="Organization" />
                            </SelectTrigger>
                            <SelectContent className="bg-background text-background-content">
                              {organizations.map((i) => (
                                <SelectItem value={i.id} key={i.id}>
                                  {i.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select> */}
                    </div>
                    <DialogFooter className="mt-4">
                      <DialogTrigger asChild>
                        <button type="button" className="btn btn-outline btn-sm">
                          Cancel
                        </button>
                      </DialogTrigger>
                      <button name="_action" value="create" type="submit" className="btn btn-primary btn-sm">
                        Confirm
                      </button>
                    </DialogFooter>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-3 mt-6 gap-5">
              {workplaces.map((workplace) => (
                <WorkplaceCard workplace={workplace} key={workplace.id} />
              ))}
            </div>
          </div>
        </div>

        {invitations && invitations?.length > 0 ? (
          <div>
            <Title title="Invitations" />
            <div className="mt-6 bg-neutral text-neutral-content rounded-xl p-5">
              <Invitations invitations={invitations} />
            </div>
          </div>
        ) : null}

        <div>
          <Title title="Settings" />
          <Form action="/auth/logout" method="post">
            <Button type="submit" variant="default">
              Logout
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export const Title = ({ title }: { title: string }) => {
  return <h1 className="text-4xl capitalize mb-4 mt-10 font-semibold">{title}</h1>;
};
