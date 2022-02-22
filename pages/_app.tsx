import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import NextNprogress from 'nextjs-progressbar';
import Layout from '@containers/Layout';

import '@styles/common.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider attribute="class" defaultTheme="system">
        <NextNprogress color="#3b82f6" />
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default MyApp;
