import { json, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { Form, Link, useLoaderData, useNavigate } from '@remix-run/react';
import { ArrowLeftIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { namedAction } from 'remix-utils';
import { zx } from 'zodix';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { requireUser } from '~/services/auth.server';
import { getGiftCardById, insertGiftCardUsageLine, type GiftCardType } from '~/services/gift.server.';

// const RemainingAmount = (giftCard: GiftCardType) => {
//   const usedAmount = giftCard.usageLines.reduce((sum, usageLine) => sum + usageLine.amount, 0);
//   const remainingAmount = giftCard?.amount - usedAmount;
//   return remainingAmount;
// };

export async function loader({ params, request }: LoaderArgs) {
  const user = await requireUser({ params, request });

  const giftCard = await getGiftCardById({ id: params.giftCardId || '', token: user.token });

  const totalAmount = giftCard?.amount || 0;
  const usedAmount = giftCard?.usageLines.reduce((sum, line) => sum + (line.amount || 0), 0) || 0;
  const remainingAmount = totalAmount - usedAmount;

  return json({ user, giftCard, remainingAmount });
}
export async function action({ request, params }: ActionArgs) {
  const user = await requireUser({ params, request });

  return namedAction(request, {
    async amount() {
      const { amount } = await zx.parseForm(request, {
        amount: zx.NumAsString
      });

      await insertGiftCardUsageLine({ id: params.giftCardId || '', token: user.token, amount });
      return json({ message: 'success' });
    }
  });
}

const CouponPage = () => {
  const { giftCard, user, remainingAmount } = useLoaderData<typeof loader>();

  return (
    <div className="bg-neutral p-5 rounded-xl">
      <div className="w-full flex justify-between items-center">
        <Link to={`/giftcard/${giftCard?.id}`}>
          <button className="mb-4 btn px-2 btn-sm btn-primary">Public View </button>
        </Link>
      </div>
      <QRCodeSVG
        value={`http://localhost:3000/app/workplace/coupon${giftCard?.id}`}
        className="w-36 h-36 mt-4 mx-auto"
      />
      <h2 className="text-sm font-bold mt-2 mb-4 text-center">{giftCard?.id}</h2>

      <div className="mt-4 sm:flex space-y-4 sm:space-y-0 items-center justify-between p-5 bg-background rounded-xl">
        <div>
          <p className="text-xs font-semibold uppercase">Bought For</p>
          <p>{giftCard?.amount} SEK</p>
        </div>
        <div className="sm:text-center">
          <p className="text-xs font-semibold uppercase">Customer Email</p>
          <p>{giftCard?.customerEmail ? giftCard.customerEmail : 'No email was set to this Gift Card'}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs font-semibold uppercase">Remaining amount</p>
          <p>{remainingAmount} SEK</p>
        </div>
      </div>

      <div className="mt-6">
        <Form method="post">
          <div>
            <Label htmlFor="amount" className="my-auto text-xs uppercase mb-1">
              Amount
            </Label>
            <Input name="amount" className="bg-background mt-1" required />
            <button type="submit" name="_action" value="amount" className="btn btn-sm btn-primary mt-2 mr-4">
              Use Gift Card
            </button>
          </div>
        </Form>
      </div>

      <div className="mt-6 bg-background p-5 rounded-xl">
        <Table>
          <TableCaption>Gift Card Progress</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Amount</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Created By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {giftCard?.usageLines
              ? giftCard.usageLines
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((i) => (
                    <TableRow key={i.id}>
                      <TableCell>{i.amount} SEK</TableCell>
                      <TableCell>{new Date(i.createdAt).toDateString()}</TableCell>
                      <TableCell className="text-right">{i.creator.name}</TableCell>
                    </TableRow>
                  ))
              : null}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default CouponPage;
