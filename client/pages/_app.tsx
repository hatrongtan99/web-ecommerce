import "bootstrap/dist/css/bootstrap.css";
import 'tippy.js/dist/tippy.css';
import '../styles/index.scss';

import {wrapper} from '~/redux/store';

import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import generateUserSessionId from "~/utils/generateUserSessionId";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

 function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
    generateUserSessionId()
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(<Component {...pageProps} />)
}

export default wrapper.withRedux(MyApp);
