import { Form, useActionData, useLoaderData, useParams } from '@remix-run/react';
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
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';

import { json, redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { requireUser } from '~/services/auth.server';
import {
  addWorkplaceMember,
  deleteWorkplace,
  deleteWorkplaceMember,
  getWorkplaceMembers
} from '~/services/workplace.server';

import { useEffect } from 'react';
import { namedAction } from 'remix-utils';
import { z } from 'zod';
import { zx } from 'zodix';
import { useToast } from '~/components/toast/use-toast';
import { Avatar } from '~/components/ui/avatar';
import { Input } from '~/components/ui/input';
import { XIcon } from 'lucide-react';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async delete() {
      const { workplaceId } = await zx.parseForm(request, {
        workplaceId: z.string()
      });
      await deleteWorkplace({ workplaceId: workplaceId, token: user.token });
      return redirect('/app');
    },
    async add() {
      const formData = await zx.parseFormSafe(request, {
        email: z.string().email()
      });
      const data = zx.parseParams(params, {
        workplaceId: z.string()
      });
      if (formData.success === false) {
        return json({ message: formData.error.errors[0].message });
      }

      await addWorkplaceMember({
        token: user.token,
        email: formData.data.email.toLocaleLowerCase(),
        workplaceId: data.workplaceId
      });
      return json({ message: `${formData.data.email} has been added to the workplace !` });
    },
    async remove() {
      const { userId } = await zx.parseForm(request, {
        userId: z.string()
      });

      const deleted = await deleteWorkplaceMember({ token: user.token, userId, workplaceId: params.workplaceId || '' });
      if (deleted) return json(true);
      else return json(false);
    }
  });
}

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  const workplaceMembers = await getWorkplaceMembers({
    workplaceId: params.workplaceId ? params.workplaceId : '',
    token: user.token
  });

  return json({ workplaceMembers, user });
}

const WokrplaceSettings = () => {
  const { workplaceMembers, user } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    if (actionData && actionData.message) {
      toast({
        description: actionData.message
      });
    }
  }, [actionData, toast]);

  return (
    <div>
      <div className="md:flex justify-between">
        <h1>Workplace Settings</h1>
        <Form method="post">
          <div className="flex w-full max-w-sm items-center space-x-2 mt-2 md:mt-0">
            <Input
              type="name"
              name="email"
              placeholder="Enter email..."
              className="bg-background text-base-content md:w-fit"
              required
            />
            <button name="_action" value="add" type="submit" className="btn btn-primary btn-sm">
              Add User
            </button>
          </div>
        </Form>
      </div>

      <div className="mt-6">
        <Table>
          <TableCaption>Workplace Members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Role</TableHead>

              <TableHead className="text-right">Controls</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workplaceMembers
              ? workplaceMembers.map((i) => (
                  <TableRow key={i.workplaceMembers.id}>
                    <TableCell className="font-medium">
                      <Avatar imageSrc={i.workplaceMembers.imageUrl || ''} name={i.workplaceMembers.name} />
                    </TableCell>
                    <TableCell>{i.workplaceMembers.name}</TableCell>
                    <TableCell>{i.workplaceMembers.email}</TableCell>
                    <TableCell className="text-right">Member</TableCell>

                    {i.workplace.ownerId === user.id && i.workplaceMembers.id !== user.id ? (
                      <TableCell className="text-right">
                        <Form method="post">
                          <input type="hidden" name="userId" value={i.workplaceMembers.id} />

                          <Button variant="destructive" name="_action" value="remove" size="sm">
                            <XIcon className="w-4" />
                          </Button>
                        </Form>
                      </TableCell>
                    ) : null}
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </div>

      <Dialog key={params.workplaceId}>
        <DialogTrigger asChild>
          <Button className="mt-6" variant="destructive">
            Delete Workplace
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
              <input type="hidden" name="workplaceId" value={params.workplaceId} />
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

export default WokrplaceSettings;
