import React from 'react';
import Head from 'next/head';

export default function Layout({ children, title = "Next.js App" }) {

  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="A Next.js application with layout" />
      </Head>
      <header>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>© 2025 My Website</footer>
    </>
  );
}