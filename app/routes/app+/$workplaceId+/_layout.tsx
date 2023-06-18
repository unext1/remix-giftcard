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
      {/* <div className="alert alert-error mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-black shrink-0 w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>You are using free version of our App.</span>
        <div>
          <button className="btn btn-sm">X</button>
        </div>
      </div> */}
      <Outlet />
    </AppLayout>
  );
};

export default AppLayouts;
