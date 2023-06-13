import type { ActionArgs } from '@remix-run/node';
import { json, type LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { z } from 'zod';
import { zx } from 'zodix';

import { Avatar } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '~/components/ui/dialog';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { requireUser, updateUserName } from '~/services/auth.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  return json(user);
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });
  const { name, _action } = await zx.parseForm(request, {
    name: z.string().optional(),
    _action: z.enum(['change', 'delete'])
  });

  switch (_action) {
    case 'change':
      if (name) {
        await updateUserName({ user, name });
      }
      break;
    case 'delete':
      console.log('deleted');
      break;
  }

  return {};
}

const Settings = () => {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="mb-5">Settings</h1>

      <div className="flex space-x-2 py-5">
        <Avatar imageSrc="https://thispersondoesnotexist.com" name={user.name} isOnline />
        <div className="flex flex-col justify-center">
          <div className="font-semibold capitalize">{user.name}</div>
          <div className="uppercase text-xs">{user.email}</div>
        </div>
      </div>
      <div className="space-y-4 ">
        <Form method="post">
          <Label htmlFor="name">Name</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="name" name="name" placeholder="Name" className="bg-neutral w-fit" defaultValue={user.name} />
            <Button name="_action" value="change" type="submit" size="sm">
              Change Name
            </Button>
          </div>
        </Form>
        <div>
          <Label htmlFor="name">Email</Label>

          <Input type="email" className="bg-neutral w-fit" disabled value={user.email} />
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-6" variant="destructive">
            Delete Profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Form method="post">
              <Button name="_action" value="delete" type="submit" variant="destructive">
                Confirm
              </Button>
            </Form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Settings;
