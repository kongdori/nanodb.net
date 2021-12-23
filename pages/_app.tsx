import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '@components/layout/layout';

import '@styles/common.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicons/favicon.svg"
                />
                <title>나노디비</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
};

export default MyApp;
