import { json, type LoaderArgs, type V2_MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import Hero from '~/components/hero';
import { getPublicOrganizations } from '~/services/organization.server';

export const meta: V2_MetaFunction = () => {
  return [{ title: 'New Remix App' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export async function loader({ params, request }: LoaderArgs) {
  const organizations = await getPublicOrganizations();
  return json(organizations);
}

export default function Index() {
  const organizations = useLoaderData<typeof loader>();
  return (
    <>
      <Hero />
      <div className="container mx-auto max-w-7xl px-4 pt-12">
        <Link to="login" className="btn btn-primary btn-sm">
          Login
        </Link>
        <div className="mt-6 h-96">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <div className="mt-2 grid grid-cols-4 gap-6">
            {organizations.map((organization) => (
              <Link to={`/${organization.id}`} key={organization.id}>
                <div className="bg-neutral rounded-xl p-5">
                  <img
                    src={
                      organization.imageUrl
                        ? organization.imageUrl
                        : 'https://www.macworld.com/wp-content/uploads/2023/01/folder-icon-macos-1.png?w=1024'
                    }
                    alt="organization"
                    className="h-12"
                  />
                  <div className="mt-4 ml-2">
                    <div className="font-semibold text-neutral-500 text-xs uppercase">Organization</div>
                    <span className="font-semibold text-white text-xl capitalize">{organization.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
