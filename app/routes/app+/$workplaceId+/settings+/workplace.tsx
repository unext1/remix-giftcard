import { Form, useParams } from '@remix-run/react';
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

import { redirect, type ActionArgs } from '@remix-run/node';
import { z } from 'zod';
import { zx } from 'zodix';
import { requireUser } from '~/services/auth.server';
import { deleteWorkplace } from '~/services/workplace.server';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  const { workplaceId, _action } = await zx.parseForm(request, {
    workplaceId: z.string().optional(),
    _action: z.enum(['change', 'delete'])
  });

  switch (_action) {
    case 'delete':
      if (workplaceId) {
        await deleteWorkplace({ workplaceId: workplaceId, user: user });
        return redirect('/app');
      }
      break;
  }

  return {};
}

const WokrplaceSettings = () => {
  const params = useParams();
  return (
    <>
      <div>
        <h1>Workplace Settings</h1>
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
      <div className="mt-6">
        <h1>Members</h1>

        <Table>
          <TableCaption>Workplace Members</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default WokrplaceSettings;
