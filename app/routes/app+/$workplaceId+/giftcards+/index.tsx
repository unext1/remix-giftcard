import { Form, Link, useLoaderData } from '@remix-run/react';

import { json, redirect, type DataFunctionArgs } from '@remix-run/node';
import { namedAction } from 'remix-utils';
import { z } from 'zod';
import { zx } from 'zodix';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { requireUser } from '~/services/auth.server';
import { createGiftCard, getGiftCards } from '~/services/gift.server.';
import { createQrSVG } from '~/services/qrcode';
import { stripeCheckout } from '~/services/stripe.server';

export async function action({ request, params }: DataFunctionArgs) {
  const user = await requireUser({ request, params });

  return namedAction(request, {
    async checkout() {
      if (user.organizations.stripeAccountId) {
        const data = await stripeCheckout({
          accountId: user.organizations.stripeAccountId,
          workplaceId: params.workplaceId || ''
        });
        if (data && data.url) {
          return redirect(data.url);
        }
      }
      return json({ message: 'no stripe account' });
    },
    async add() {
      const { amount, customerEmail } = await zx.parseForm(request, {
        amount: zx.NumAsString,
        customerEmail: z.string().email()
      });
      const giftCard = await createGiftCard({
        amount,
        token: user.token,
        isActive: true,
        workplaceId: params.workplaceId || '',
        customerEmail: customerEmail
      });

      if (giftCard) return redirect(`${giftCard.id}`);
      else return json({ message: 'Failed To create' });
    }
  });
}

export async function loader({ params, request }: DataFunctionArgs) {
  const user = await requireUser({ request, params });
  const emailQuery = new URL(request.url).searchParams.get('email');

  const giftCards = await getGiftCards({
    workplaceId: params.workplaceId || '',
    token: user.token,
    customerEmail: emailQuery || null
  });

  return json({ giftCards });
}

const GiftCardIndex = () => {
  const { giftCards } = useLoaderData<typeof loader>();
  return (
    <div>
      <Form method="post">
        <button type="submit" name="_action" value="checkout" className="btn btn-sm btn-primary">
          checkout
        </button>
      </Form>
      <Form method="post">
        <div className="mt-5 grid-cols-2 gap-6 w-1/2">
          <div>
            <Label htmlFor="amount" className="my-auto">
              Gift Card Price
            </Label>
            <Input name="amount" type="number" className="bg-neutral mt-1" placeholder="Enter Price" min="1" />
          </div>
          <div className="mt-4">
            <Label htmlFor="customerEmail" className="my-auto">
              Customer Email
            </Label>
            <Input name="customerEmail" type="email" className="bg-neutral mt-1" placeholder="Enter Customer Email" />
          </div>
        </div>
        <button type="submit" name="_action" value="add" className="btn btn-sm btn-primary mt-5">
          Submit
        </button>
      </Form>

      <div className="mt-5">
        <div className="md:flex justify-between">
          <h1 className="font-semibold text-lg my-auto">Gift Cards</h1>
          <Form className="flex items-center space-x-2">
            <Input name="email" placeholder="Enter email..." className="bg-neutral text-neutral-content " />
            <button type="submit" className="btn btn-primary btn-sm mt-2 md:mt-0">
              Search
            </button>
          </Form>
        </div>
        <div className="grid grid-cols-4 gap-6">
          {giftCards
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((giftCard) => {
              return (
                <Link to={giftCard.id} key={giftCard.id}>
                  <div className="mt-6 p-5 rounded-xl bg-neutral">
                    {/* <QRCodeSVG
                      value={`http://localhost:3000/app/workplace/coupon${giftCard.id}`}
                      className="w-16 h-16 mb-4"
                    /> */}
                    {/* <img
                      src={`http://localhost:3000/api/qrcode/${giftCard.id}.svg`}
                      alt="qrcode"
                      className="w-36 h-36 mb-4 bg-"
                    /> */}
                    <div className="w-28 h-28" dangerouslySetInnerHTML={{ __html: createQrSVG(giftCard.id) }} />
                    <div className=" text-xs">{giftCard.customerEmail}d</div>
                    <div className="flex justify-between ">
                      <p className="font-semibold text-lg">{giftCard.amount} SEK</p>
                      <p className="text-sm my-auto">{giftCard.isActive ? 'Active' : 'Inactive'}</p>
                    </div>

                    <div className="flex justify-between mt-4">
                      <p className="text-xs">{new Date(giftCard.createdAt).toDateString()}</p>
                      <p className="text-xs">{new Date(giftCard.createdAt).toDateString()}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default GiftCardIndex;
