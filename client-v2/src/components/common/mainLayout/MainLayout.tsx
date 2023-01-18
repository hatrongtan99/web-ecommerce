import Head from "next/head";
import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  titlePage?: string;
}
const MainLayout = ({ children, titlePage }: MainLayoutProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{titlePage}</title>
      </Head>

      <Header />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
