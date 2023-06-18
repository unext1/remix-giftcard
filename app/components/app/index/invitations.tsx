import { Form } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { type InvitationsType } from '~/services/workplace.server';

const Invitations = ({ invitations }: { invitations: InvitationsType }) => {
  return (
    <Table>
      <TableCaption>Your Invitations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Status</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invitations
          ? invitations.map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="font-medium">Invitation</TableCell>
                <TableCell>{invitation.workplaceInvitations?.email}</TableCell>
                <TableCell className="flex justify-end">
                  <Form method="post">
                    <input type="hidden" name="invitationId" value={invitation.id} />
                    <input type="hidden" name="workplaceId" value={invitation.workplaceId} />
                    <Button variant="default" name="_action" value="accept" className="mr-4" size="sm">
                      √
                    </Button>
                    <Button variant="destructive" name="_action" value="cancel" size="sm">
                      X
                    </Button>
                  </Form>
                </TableCell>
              </TableRow>
            ))
          : null}
      </TableBody>
    </Table>
  );
};

export default Invitations;
