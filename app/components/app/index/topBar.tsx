import { Form } from '@remix-run/react';
import { DoorOpenIcon } from 'lucide-react';
import { Avatar } from '~/components/ui/avatar';
import { type UserType } from '~/services/auth.server';

export const TopBar = ({ user }: { user: UserType }) => {
  return (
    <div className="w-full items-center justify-end flex mb-6">
      <div className="flex space-x-2 mr-5">
        <Avatar imageSrc="https://thispersondoesnotexist.com" name={user.name} isOnline className="h-8 w-8" />
        <div className="flex flex-col justify-center">
          <div className="font-semibold capitalize text-sm">{user.name}</div>
        </div>
      </div>
      <Form action="/auth/logout" method="post" className="">
        <button type="submit">
          <DoorOpenIcon className="h-5 w-5 mt-1.5 text-gray-500" />
        </button>
      </Form>
    </div>
  );
};
