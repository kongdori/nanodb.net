import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import NextNprogress from 'nextjs-progressbar';
import { siteName } from 'site.config.js';
import Layout from '@containers/Layout';

import '@styles/common.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
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
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicons/favicon.png"
            />
            <title>{siteName}</title>
        </Head>
        <ThemeProvider attribute="class" defaultTheme="system">
            <NextNprogress color="#3b82f6" />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    </>
);

export default MyApp;
