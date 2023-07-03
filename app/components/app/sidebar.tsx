import { Form, Link, NavLink } from '@remix-run/react';
import cc from 'classcat';
import { GiftIcon, LayoutDashboard, SettingsIcon } from 'lucide-react';
import { type ReactNode } from 'react';
import { type UserType } from '~/services/auth.server';
import { WorkplaceSwitcher } from './workplace-switcher';

export const Navigation = ({ user }: { user: UserType }) => {
  const navLinks = [
    { icon: LayoutDashboard, label: 'Overview', href: '' },
    { icon: GiftIcon, label: 'Coupon', href: 'coupon' },
    { icon: SettingsIcon, label: 'Settings', href: 'settings' }
  ];
  return (
    <nav className="overflow-auto flex-1 px-4 ">
      <div className="flex flex-col justify-between h-full">
        <div>
          <Link to="/app">
            <h2 className="text-neutral-50 font-bold text-xl pt-3 pb-8">
              <span className="text-primary">Q</span>Pong
            </h2>
          </Link>

          <WorkplaceSwitcher
            workplaces={user?.ownerOfWorkplaces?.map(({ id, title }) => ({ id, title })) || []}
            memberOfWorkplaces={user?.memberOfWorkplaces?.map(({ workplace: { id, title } }) => ({ id, title })) || []}
          />
          <ul className=" rounded-box space-y-1.5 mt-4">
            <li className="text-gray-300 font-semibold mb-4 text-xs uppercase">
              <span>Dashboard</span>
            </li>
            {navLinks.map((item) => {
              return (
                <NavigationItem key={item.label} href={item.href} end={item.href === ''}>
                  <item.icon aria-hidden="true" />
                  <span className="pl-3 font-semibold">{item.label}</span>
                </NavigationItem>
              );
            })}
          </ul>
        </div>
        <div className="mb-4">
          <Form action="/auth/logout" method="post">
            <button type="submit" className="btn w-full btn-primary btn-sm">
              Logout
            </button>
          </Form>
        </div>
      </div>
    </nav>
  );
};

const NavigationItem = ({ href, children, end = false }: { href: string; children?: ReactNode; end?: boolean }) => {
  return (
    <li className="group ">
      <NavLink
        to={href}
        end={end}
        className={({ isActive }) =>
          cc({
            'focus:ring-1 ring-offset-0 ring-neutral hover:bg-neutral flex py-2 rounded-md pl-3 text-sm': true,
            'bg-neutral text-neutral-content border-l-4 border-primary': isActive
          })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
