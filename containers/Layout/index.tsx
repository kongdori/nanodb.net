/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import NextNprogress from 'nextjs-progressbar';
import { useTheme } from 'next-themes';
import { siteName } from 'site.config';
import { NanoDB } from '@components/Logo';
import { GlobalNav, ConfNav } from './Nav';

interface LayoutContainerProps {
    children: React.ReactNode;
}

export default function LayoutContainer({ children }: LayoutContainerProps) {
    const { theme, systemTheme } = useTheme();
    const favicon = systemTheme === 'dark' ? 'favicon-dark' : 'favicon';

    const themeUsing = theme === 'system' ? systemTheme : theme;

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
            <NextNprogress
                color={themeUsing === 'light' ? '#000000' : '#ffffff'}
            />
            <header className="fixed top-0 inset-x-0 z-40">
                <div className="relative">
                    <div className="absolute inset-0 backdrop-blur border-b shadow-sm border-b-black/10 bg-white/95 dark:border-b-white/10 dark:bg-dark/95" />
                    <div className="relative h-12 flex items-stretch gap-8 px-6">
                        <div className="self-center">
                            <Link href="/">
                                <a aria-label="Home">
                                    <h1 className="flex">
                                        <NanoDB />
                                    </h1>
                                </a>
                            </Link>
                        </div>
                        <GlobalNav />
                        <div className="flex items-stretch ml-auto">
                            <ConfNav />
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </>
    );
}
