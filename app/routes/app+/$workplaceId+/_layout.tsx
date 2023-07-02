import { Link, Outlet, useLoaderData } from '@remix-run/react';

import { json, redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { InfoIcon } from 'lucide-react';
import { z } from 'zod';
import { zx } from 'zodix';
import { AppLayout } from '~/components/app/layout';
import { requireUser } from '~/services/auth.server';
import { getWorkplaceOrganization } from '~/services/workplace.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });
  const data = await getWorkplaceOrganization({
    token: user.token,
    workplaceId: params.workplaceId || ''
  });
  return json({ user, data });
}

const AppLayouts = () => {
  const { user, data } = useLoaderData<typeof loader>();
  return (
    <AppLayout user={user}>
      {!data?.organization?.chargesEnabled ? (
        <div className="alert alert-error mb-6">
          <InfoIcon />
          <span>This organization does not have charges enabled</span>
          <div>
            <Link to="settings/organization" className="btn btn-sm">
              Activate
            </Link>
          </div>
        </div>
      ) : null}

      <Outlet />
    </AppLayout>
  );
};

export default AppLayouts;
