import type { V2_MetaFunction } from '@remix-run/node';
import { Link } from '@remix-run/react';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Index() {
  return (
    <div className="container mx-auto ">
      <h1 className="text-7xl">hi</h1>
      <Link to="login" className="btn btn-primary btn-sm">
        Login
      </Link>
    </div>
  );
}
