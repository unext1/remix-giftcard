import { Form, Link, useNavigate } from '@remix-run/react';
import { ArrowLeftIcon, DoorOpenIcon } from 'lucide-react';
import { Avatar } from '~/components/ui/avatar';
import { type UserType } from '~/services/auth.server';

export const TopBar = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <div className="w-full items-center flex mb-6 bg-neutral rounded-xl p-4">
      <button onClick={goBack} className="btn px-2 btn-sm btn-primary">
        <ArrowLeftIcon className="w-4" />
      </button>
      <div className="flex w-full justify-end">
        <Link to="settings">
          <div className="flex space-x-2 mr-5">
            <Avatar imageSrc="https://thispersondoesnotexist.com" name={user.name} isOnline className="h-8 w-8" />
            <div className="flex flex-col justify-center">
              <div className="font-semibold capitalize text-sm">{user.name}</div>
            </div>
          </div>
        </Link>
        <Form action="/auth/logout" method="post" className="">
          <button type="submit">
            <DoorOpenIcon className="h-5 w-5 mt-1.5 text-gray-500" />
          </button>
        </Form>
      </div>
    </div>
  );
};
