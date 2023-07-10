import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { requireUser } from '~/services/auth.server';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });
}

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser({ request, params });

  const workplaceId = params.workplaceId;

  return json({ user, workplaceId });
}

const Dashbaord = () => {
  const { user, workplaceId } = useLoaderData<typeof loader>();
  return (
    <div>
      <div>{user.name}</div>
      <div>{workplaceId}</div>
    </div>
  );
};
export default Dashbaord;
