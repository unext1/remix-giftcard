import { Disclosure } from '@headlessui/react';
import { Link } from '@remix-run/react';
import { MenuIcon, XIcon } from 'lucide-react';

export default function Navbar() {
  return (
    <Disclosure as="nav" className=" shadow-sm fixed w-full bg-background z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 container">
            <div className="flex h-12 justify-between">
              <div className="flex my-auto">
                <Link to="/" className="text-xl uppercase tracking-widest text-primary">
                  Q<span className="text-white">Pong</span>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 items-center">
                <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm">
                  Home
                </Link>
                <Link to="/#om" className="inline-flex items-center px-1 pt-1 text-sm">
                  About
                </Link>
                <Link to="/kazkas" className="inline-flex items-center px-1 pt-1 text-sm">
                  Kazkas
                </Link>

                <Link to="/login" className="inline-flex items-center text-sm btn btn-primary btn-sm">
                  Login
                </Link>
              </div>

              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-neutral-content hover:bg-neutral focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-focus">
                  <span className="sr-only">Open main menu</span>
                  {open ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-6 pb-3 pt-2">
              <Link to="/" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  Home
                </Disclosure.Button>
              </Link>
              <Link to="#om" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  About
                </Disclosure.Button>
              </Link>
              <Link to="/kazkas" className="w-full">
                <Disclosure.Button className="block w-full py-1 pl-3 pr-4 text-base text-left font-medium ">
                  Kazkas
                </Disclosure.Button>
              </Link>

              <Link to="/login" className="w-full">
                <Disclosure.Button className="inline-flex items-center text-sm btn btn-primary btn-sm">
                  Login
                </Disclosure.Button>
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
