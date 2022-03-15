import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import Layout from '@containers/Layout';

import '@styles/common.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
    <ThemeProvider attribute="class" defaultTheme="system">
        <Layout>
            <Component {...pageProps} />
        </Layout>
    </ThemeProvider>
);

export default MyApp;
