import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes';
import NextNprogress from 'nextjs-progressbar';
import { siteName } from 'site.config.js';
import LayoutContainer from '@containers/LayoutContainer';

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
            <NextNprogress color="#facc15" />
            <LayoutContainer>
                <Component {...pageProps} />
            </LayoutContainer>
        </ThemeProvider>
    </>
);

export default MyApp;
