import { Outlet } from '@remix-run/react';
import Navbar from '~/components/navbar';

const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default PublicLayout;
