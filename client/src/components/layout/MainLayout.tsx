import React from 'react';
import { NextPage } from 'next';
import Header from './header/Header';
import Footer from './footer/Footer';
import Head from 'next/head'

interface LayoutProps {
  children?: React.ReactNode,
  titlePage?: string
}

const MainLayout = ({ children, titlePage }: LayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>{titlePage}</title>
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default MainLayout