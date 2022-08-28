import 'tailwindcss/tailwind.css'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as Layouts from '../components/layouts';

function MyApp({ Component, pageProps }) {

  const state = {
    // global states here
    name: "GRITER"
  }

  const router = useRouter();

  let component = <Component {...pageProps} {...state} />;

  switch (true) {
    case /\/user\/\w+/.test(router.pathname):
      component = (
        <Layouts.Auth>
          <Component {...pageProps} {...state} />
        </Layouts.Auth>
      )
      break;

    case /\/dashboard(\/\w+){0,}/.test(router.pathname):
      component = (
        <Layouts.App>
          <Component {...pageProps} {...state} />
        </Layouts.App>
      )
      break;
  }


  return (
    <>
      <Head>
        <title>GRITER</title>
        <meta name='description' content="Griter description" />
      </Head>
      <ToastContainer
        autoClose={5000}
        toastClassName="toast-message"
        bodyClassName="toast-body"
      />

      {component}

    </>
  )
}

export default MyApp