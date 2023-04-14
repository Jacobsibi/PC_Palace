import React from 'react';
import '@/styles/globals.css'
<<<<<<< Updated upstream

=======
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
>>>>>>> Stashed changes
import { Layout } from '../components';

function myApp({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default myApp
