import { json, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ArrowLeftIcon } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { getGiftCardById } from '~/services/gift.server.';

export async function loader({ params }: LoaderArgs) {
  const giftCard = await getGiftCardById({ id: '81bc7e1b-4abb-44ef-bcfd-7d66ad0244f8' });

  const totalAmount = giftCard?.amount || 0;
  const usedAmount = giftCard?.usageLines.reduce((sum, line) => sum + (line.amount || 0), 0) || 0;
  const remainingAmount = totalAmount - usedAmount;

  return json({ giftCard, remainingAmount });
}

const GiftCard = () => {
  const { giftCard, remainingAmount } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full px-4 ">
      <div className="bg-neutral p-5 py-10 rounded-xl container mx-auto max-w-7xl">
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
                ? giftCard.usageLines.map((i) => (
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
    </div>
  );
};

export default GiftCard;
