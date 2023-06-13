import { Outlet, useLoaderData } from '@remix-run/react';

import { json, type LoaderArgs } from '@remix-run/node';
import { AppLayout } from '~/components/app/layout';
import { requireUser } from '~/services/auth.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });
  return json(user);
}

const AppLayouts = () => {
  const user = useLoaderData<typeof loader>();
  return (
    <AppLayout user={user}>
      <Outlet />
    </AppLayout>
  );
};

export default AppLayouts;
