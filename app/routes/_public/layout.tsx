import { Outlet, useLoaderData } from '@remix-run/react';
import Navbar from '~/components/navbar';

import { json, type LoaderArgs } from '@remix-run/node';
import { requireUser } from '~/services/auth.server';
export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ params, request });

  return json(user);
}

const PublicLayout = () => {
  const user = useLoaderData<typeof loader>();
  return (
    <>
      <Navbar user={user} />
      <Outlet />
    </>
  );
};

export default PublicLayout;
