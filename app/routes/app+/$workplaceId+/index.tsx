import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { requireUser } from '~/services/auth.server';
import { getGiftCards } from '~/services/gift.server.';

export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ request, params });
}

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser({ request, params });

  const workplaceId = params.workplaceId;

  const giftCards = await getGiftCards({ workplaceId: workplaceId || '', token: user.token });

  return json({ user, workplaceId, giftCards });
}

const Dashbaord = () => {
  const { user, workplaceId, giftCards } = useLoaderData<typeof loader>();

  const totalAmount = giftCards.reduce((sum, card) => sum + (card.amount || 0), 0);

  return (
    <div>
      <div>
        <h2 className="text-4xl font-semibold text-white">Profile</h2>

        <div>{user.name}</div>
        <div>{workplaceId}</div>
      </div>
      <div className="md:flex items-center justify-between mb-4 mt-8">
        <h2 className="text-4xl font-semibold text-white">Gift Cards</h2>
        <Link to="giftCards" className="btn btn-sm btn-primary mt-2 md:mt-0">
          Go To Gift Cards
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="p-8 py-12 bg-primary rounded-xl ">
          <div className="text-3xl font-bold text-white">{totalAmount} SEK</div>
          <div className="text-xs text-gray-900 uppercase">Total Sold Gift Cards</div>
        </div>
        <div className="p-8 py-12 bg-card rounded-xl ">
          <div className="text-3xl font-bold text-white">{giftCards[giftCards.length - 1]?.amount | 0} SEK</div>
          <div className="text-xs text-gray-400 uppercase">Last Sold Gift Cards</div>
        </div>
      </div>
    </div>
  );
};
export default Dashbaord;
