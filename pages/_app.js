import React from 'react';
import '@/styles/globals.css'
<<<<<<< Updated upstream

=======
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
>>>>>>> Stashed changes
import { Layout } from '../components';

function myApp({ Component, pageProps }) {
  return (
    //pass data from stateContext to every component 
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default myApp
