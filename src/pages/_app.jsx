import '@/styles/tailwind.css'
import 'focus-visible'
import 'react-toastify/dist/ReactToastify.css'
import Head from "next/head";
import {ToastContainer} from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
      <>
        <Head>
            <title>Qalam</title>
        </Head>
        <ToastContainer autoClose={2000} />
        <Component {...pageProps} />
      </>
  )
}
