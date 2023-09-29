import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createQrSVG } from '~/services/qrcode';

export function loader() {
  return json({ uri: createQrSVG('https://stadservicezeko.se') });
}

const DemoQrCode = () => {
  const { uri } = useLoaderData<typeof loader>();
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full text-red-300" dangerouslySetInnerHTML={{ __html: uri }} />
    </div>
  );
};

export default DemoQrCode;
