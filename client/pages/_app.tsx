import 'bootstrap/dist/css/bootstrap.css';
import 'tippy.js/dist/tippy.css';
import '../styles/index.scss';
import { useAppDispatch } from '~/redux/hooks';
import { useRouter } from 'next/router';

import { wrapper } from '~/redux/store';

import { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import MainLayout from '~/components/layout/MainLayout';
import generateUserSessionId from '~/utils/generateUserSessionId';
import 'react-toastify/dist/ReactToastify.css';
import { saveUserSessionId } from '~/redux/slice/checkoutSlice';

export type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    console.log(router.asPath);

    useEffect(() => {
        require('bootstrap/dist/js/bootstrap');
        // generateUserSessionId();
        // const userSessionId = window.localStorage.getItem(process.env.NEXT_PUBLIC_USER_SESSION_ID as string);

        // if (userSessionId) {
        //   dispatch(saveUserSessionId(userSessionId))
        // }
    }, [dispatch]);

    if (Component.getLayout) {
        return Component.getLayout(<Component {...pageProps} />);
    }

    return (
        <MainLayout>
            <Component {...pageProps} />
        </MainLayout>
    );
}

export default wrapper.withRedux(MyApp);
