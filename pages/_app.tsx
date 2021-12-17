import { AppProps } from 'next/app';
import Head from 'next/head';

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
            <Component {...pageProps} />
        </>
    );
};

export default MyApp;
