import { NavLink, Outlet } from '@remix-run/react';

import { type LoaderArgs } from '@remix-run/node';
import { requireUser } from '~/services/auth.server';

export async function loader({ request, params }: LoaderArgs) {
  await requireUser({ request, params });
  return {};
}

const SettingsLayout = () => {
  const navigation = [
    {
      label: 'Settings',
      href: '.'
    },
    {
      label: 'Workplace',
      href: 'workplace'
    },
    {
      label: 'Billing',
      href: 'billing'
    }
  ];
  return (
    <>
      <div className="tabs tabs-boxed bg-background space-x-4 p-2 w-fit">
        {navigation.map((tab) => (
          <NavLink
            key={tab.label}
            end
            to={tab.href}
            className={({ isActive }) => (isActive ? 'tab tab-active' : 'tab')}
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
      <main className="mt-6 bg-background rounded-md p-5">
        <Outlet />
      </main>
    </>
  );
};

export default SettingsLayout;
