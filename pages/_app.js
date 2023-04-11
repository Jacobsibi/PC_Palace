import React from 'react';
import '@/styles/globals.css'

import { Layout } from '../components';

function myApp({Component, pageProps}) {
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default myApp
