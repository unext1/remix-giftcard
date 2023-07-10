import { type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { namedAction } from 'remix-utils';
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
import { deleteUser, requireUser, updateUserName } from '~/services/auth.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  return json(user);
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async change() {
      const { name } = await zx.parseForm(request, {
        name: z.string()
      });
      await updateUserName({ user, name });
      return json({ message: 'success' });
    },
    async delete() {
      await deleteUser({ user, request });
      return json({ message: 'success' });
    }
  });
}

const Settings = () => {
  const user = useLoaderData<typeof loader>();
  return (
    <div>
      <h1 className="mb-5">Profile</h1>

      <div className="flex space-x-2 pb-5">
        <Avatar imageSrc="https://thispersondoesnotexist.com" name={user.name} isOnline className="h-16 w-16" />
        <div className="flex flex-col justify-center">
          <div className="font-semibold capitalize">{user.name}</div>
          <div className="uppercase text-xs">{user.email}</div>
        </div>
      </div>

      <div className="space-y-4 ">
        <Form method="post">
          <Label htmlFor="name">Name</Label>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="name"
              name="name"
              placeholder="Name"
              className="bg-background text-base-content md:w-fit"
              defaultValue={user.name}
            />
            <button name="_action" value="change" type="submit" className="btn btn-primary btn-sm">
              Change Name
            </button>
          </div>
        </Form>
        <div>
          <Label htmlFor="name">Email</Label>

          <Input type="email" className="bg-background text-base-content md:w-fit" disabled value={user.email} />
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
    </div>
  );
};

export default Settings;
