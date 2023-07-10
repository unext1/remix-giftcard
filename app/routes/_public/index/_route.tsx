import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';
import Hero from '~/components/hero';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <>
      <Hero />
      <div className="container mx-auto max-w-7xl px-4 pt-12">
        <Link to="login" className="btn btn-primary btn-sm">
          Login
        </Link>
      </div>
    </>
  );
}
