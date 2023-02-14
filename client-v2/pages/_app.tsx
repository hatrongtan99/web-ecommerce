import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "~styles/globals.css";
import "~styles/index.scss";

import { ReactElement, ReactNode, useEffect, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import type { AppProps } from "next/app";

// context
import AuthProvider from "~context/AuthProvider";

// layout
import MainLayout from "~components/common/mainLayout/MainLayout";
import SidebarAdminProvider from "~context/SidebarAdminProvider";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  // import js bootstrap
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap");
  }, []);

  const getLayout =
    Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider>
          <SidebarAdminProvider>
            {getLayout(<Component {...pageProps} />)}
          </SidebarAdminProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  );
}
