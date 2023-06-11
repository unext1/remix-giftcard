import { Form, NavLink } from '@remix-run/react';
import cc from 'classcat';
import { GiftIcon, LayoutDashboard } from 'lucide-react';
import { type ReactNode } from 'react';
import { WorkplaceSwitcher } from './workplace-switcher';

const navLinks = [
  { icon: LayoutDashboard, label: 'Overview', href: '' },
  { icon: GiftIcon, label: 'Gift Cards', href: '/gift' }
];

export const Navigation = () => {
  return (
    <nav className="overflow-auto flex-1 px-4 ">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h2 className="text-neutral-50 font-bold text-xl pt-3 pb-8">
            <span className="text-primary">Chat</span> App
          </h2>

          <WorkplaceSwitcher
            workplaces={[
              { id: 'asdads', name: 'yo' },
              { id: 'ebeadad', name: 'y3312o' }
            ]}
            memberOfWorkplaces={[
              { id: 'easdg', name: 'yo33' },
              { id: 'basdg312', name: 'ddd' }
            ]}
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
            'focus:ring-1 ring-offset-0 ring-neutral hover:bg-neutral flex py-2 pl-3 text-sm': true,
            'bg-neutral text-neutral-content border-l-2 border-primary': isActive
          })
        }
      >
        {children}
      </NavLink>
    </li>
  );
};
