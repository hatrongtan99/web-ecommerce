import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push("/may-khoan-pin");
    }, [router]);

    return (
        <>
            <Head>
                <title>dienmaykimkhi.com</title>
                <meta
                    name="description"
                    content="Trang chủ dienmaykimkhi.com"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            nexxt app
        </>
    );
}
