import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { ClientOnly } from 'remix-utils';
import { createQrSVG } from '~/services/qrcode';

export function loader({ params }: LoaderFunctionArgs) {
  const svg = createQrSVG(params.id || '');
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  });
}
