import React from 'react';
import Head from 'next/head';

import Navbar from './Navbar';
import Footer from './Footer';
import SearchBar from './SearchBar';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>PC Palace</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <div className="layout">
        <main className="main-container">
        <SearchBar />
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  )
}

export default Layout