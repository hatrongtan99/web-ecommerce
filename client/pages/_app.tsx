import "bootstrap/dist/css/bootstrap.css";
import '../styles/index.scss';

// import "@fortawesome/fontawesome-svg-core/styles.css";
// import { config } from "@fortawesome/fontawesome-svg-core";
// config.autoAddCss = false;
// import '@fortawesome/fontawesome-free/css/all.css'

import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}
