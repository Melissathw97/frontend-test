import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {

  const state = {
    // global states here
    name: "GRITER"
  }

  return <>
    <Head>
      <title>GRITER</title>
      <meta name='description' content="Griter description" />
    </Head>
    <ToastContainer
      autoClose={5000}
      toastClassName="toast-message"
      bodyClassName="toast-body"
    />
    <Component {...pageProps} {...state}/>
  </>
}

export default MyApp