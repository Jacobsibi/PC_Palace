import React from 'react';
import '@/styles/globals.css'
import { StateContext } from '../context/StateContext';
import { Toaster } from 'react-hot-toast';
import { Layout } from '../components';
import { DepartmentsContextProvider } from '@/context/DepartmentsContext';

function myApp({ Component, pageProps }) {
  return (
    //pass data from stateContext qto every component 
    <DepartmentsContextProvider>
      <StateContext>
        <Layout>
          <Toaster />
          <Component {...pageProps} />
        </Layout>
      </StateContext>
    </DepartmentsContextProvider>
  )
}

export default myApp
