import React from 'react';
import Head from 'next/head';
import ScrollToTop from '../Common/ScrollToTop';

export default function Layout({ children, title = "Next.js App" }) {
  return (
    <>
      {/* <ScrollToTop /> */}
      <main>{children}</main>
    </>
  );
}
