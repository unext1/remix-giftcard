import { Outlet } from '@remix-run/react';

import type { LoaderArgs } from '@remix-run/node';
import { AppLayout } from '~/components/app/layout';
import { requireUser } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
  await requireUser(request);
  return {};
}

const AppLayouts = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default AppLayouts;
