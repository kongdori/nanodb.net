import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '@components/Logo';
import { useTheme } from 'next-themes';
import { siteName } from 'site.config';
import { GlobalNav, ConfNav } from './Nav';

interface LayoutContainerProps {
    children: React.ReactNode;
}

export default function LayoutContainer({ children }: LayoutContainerProps) {
    const { systemTheme } = useTheme();
    const favicon = systemTheme === 'dark' ? 'favicon-dark' : 'favicon';

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
                    href={`/favicons/${favicon}.svg`}
                />
                <link
                    rel="alternate icon"
                    type="image/png"
                    href={`/favicons/${favicon}.png`}
                />
                <title>{siteName}</title>
            </Head>
            <header className="w-full sticky top-0 z-40 h-12">
                <div className="relative px-4 h-full">
                    <div className="absolute w-full h-full left-0 right-0 top-0 bottom-0 backdrop-blur border-b shadow-sm border-b-black/10 bg-white/90 dark:border-b-white/10 dark:bg-dark/90" />
                    <div className="relative w-full h-full flex items-stretch z-40">
                        <div className="flex items-center mr-2">
                            <Link href="/">
                                <a
                                    aria-label="Home"
                                    className="flex items-center px-2"
                                >
                                    <h1 className="py-1 flex flex-nowrap items-end">
                                        <Logo />
                                    </h1>
                                </a>
                            </Link>
                        </div>
                        <GlobalNav />
                        <div className="ml-auto flex items-stretch">
                            <ConfNav />
                        </div>
                    </div>
                </div>
            </header>
            <main>{children}</main>
        </>
    );
}
