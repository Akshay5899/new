// pages/_app.js
import '../styles/globals.css';               // Your custom global CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import { useEffect } from 'react';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Load Bootstrap JS only on client side
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
      .then(() => {
        console.log('✅ Bootstrap JS loaded');
      })
      .catch((err) => {
        console.error('❌ Bootstrap JS failed to load', err);
      });
  }, []);

  return (
    <>
      {/* Global Head for all pages */}
      <Head>
        <title>APMC - Agricultural Produce Market Committee</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Official site of the Agricultural Produce Market Committee. View market stats, commodity rates, and information about governing bodies."
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Bootstrap Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
