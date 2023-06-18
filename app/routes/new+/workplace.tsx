import { json, redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { route } from 'routes-gen';
import { z } from 'zod';
import { zx } from 'zodix';
import { requireUser } from '~/services/auth.server';
import { createWorkplace } from '~/services/workplace.server';

export async function loader({ request, params }: LoaderArgs) {
  const user = await requireUser({ request, params });

  if (user.ownerOfWorkplaces.length > 0) {
    throw redirect(route('/app/:workplaceId', { workplaceId: user.ownerOfWorkplaces[0].id }));
  }
  if (user.memberOfWorkplaces.length > 0) {
    throw redirect(route('/app/:workplaceId', { workplaceId: user.memberOfWorkplaces[0].workplace.id }));
  }

  return redirect('/app');
}

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });

  const result = await zx.parseFormSafe(request, {
    name: z.string().min(1, 'Name is required!')
  });
  if (!result.success) {
    return json({ errors: result.error.flatten() } as const, { status: 400 });
  }

  try {
    const workplaces = await createWorkplace({ sessionUser: user, title: result.data.name });

    if (workplaces) {
      return redirect(route('/app/:workplaceId', { workplaceId: workplaces[0].id }));
    }
  } catch (error) {
    throw new Error(error as string);
  }
}

const NewWorkplace = () => {
  return (
    <div>
      <h1>ok</h1>
    </div>
  );
};

export default NewWorkplace;
