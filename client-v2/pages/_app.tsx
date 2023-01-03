import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';

import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import AuthProvider from '~context/AuthProvider';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    useEffect(() => {
        require('bootstrap/dist/js/bootstrap');
    }, []);

    const getLayout = Component.getLayout ?? ((page) => page);
    return (
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    );
}
