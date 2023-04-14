import React from 'react';
import '@/styles/globals.css'
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
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
