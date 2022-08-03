import "bootstrap/dist/css/bootstrap.css";
import 'tippy.js/dist/tippy.css';
import '../styles/index.scss';

import {wrapper} from '~/redux/store';

import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import MainLayout from "~/components/layout/MainLayout";
import generateUserSessionId from "~/utils/generateUserSessionId";
import 'react-toastify/dist/ReactToastify.css';

export type NextPageWithLayout = NextPage & {
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

  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps}/>)
  }

  return (<MainLayout><Component {...pageProps} /></MainLayout>)
}

export default wrapper.withRedux(MyApp);
