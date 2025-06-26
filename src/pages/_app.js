import Head from 'next/head';
import Nav from '../components/Nav';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-192x192.png" />
        <meta name="theme-color" content="#1976d2" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  );
}
