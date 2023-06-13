import { redirect, type ActionArgs, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { route } from 'routes-gen';
import { z } from 'zod';
import { zx } from 'zodix';
import { Button } from '~/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { authenticator, requireUser } from '~/services/auth.server';
import { createWorkplace } from '~/services/workplace.server';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader({ request, params }: LoaderArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: '/login' });
  return {};
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params, noRedirect: true });
  const { title, _action } = await zx.parseForm(request, {
    title: z.string().optional(),
    _action: z.enum(['create'])
  });

  switch (_action) {
    case 'create':
      if (title) {
        const workplace = await createWorkplace({ sessionUser: user, title });

        return redirect(route('/app/:workplaceId', { workplaceId: workplace?.[0].id }));
      }
      break;
  }

  return {};
}

export default function AppIndex() {
  return (
    <div className="bg-neutral w-full h-screen-safe">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6" variant="destructive">
            Create Workplace
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form method="post">
            <DialogHeader>
              <DialogTitle>Create New Workplace</DialogTitle>
            </DialogHeader>
            <div className="space-x-4 flex mt-4">
              <Label htmlFor="title" className="my-auto">
                Name
              </Label>
              <Input name="title" />
            </div>
            <DialogFooter>
              <Button name="_action" value="create" type="submit" variant="destructive">
                Confirm
              </Button>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
