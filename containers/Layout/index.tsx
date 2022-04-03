/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import { useTheme } from 'next-themes';
import { NanoDB } from '@components/Logo';
import * as site from 'site.config.js';
import { GlobalNav, ConfNav, MobileNav } from './Nav';

interface LayoutContainerProps {
    children: React.ReactNode;
}

export default function LayoutContainer({ children }: LayoutContainerProps) {
    const router = useRouter();
    const { globalNav } = site.header;

    const title = globalNav
        .flatMap((item) => item.menus)
        .find((item) => item.active.includes(router.pathname));

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
                <title>{site.siteName}</title>
            </Head>
            <NextNprogress
                color={themeUsing === 'light' ? '#000000' : '#ffffff'}
            />
            <header className="fixed top-0 inset-x-0 z-40">
                <div className="relative">
                    <div className="absolute inset-0 backdrop-blur border-b shadow-sm border-b-black/10 bg-white/95 dark:border-b-white/10 dark:bg-dark/95" />
                    <div className="relative h-12 flex items-stretch gap-x-2 lg:gap-x-4 px-2 md:pl-4 lg:px-8">
                        {/* Mobile */}
                        <div className="md:hidden flex items-stretch">
                            <MobileNav />
                        </div>
                        <div className="self-center">
                            <Link href="/">
                                <a aria-label="Home">
                                    <h1 className="flex">
                                        <NanoDB />
                                    </h1>
                                </a>
                            </Link>
                        </div>
                        {/* Tablet */}
                        {title && (
                            <h1 className="flex md:hidden self-center text-xs pl-2 border-l font-medium border-l-black/10 dark:border-l-white/10">
                                <Link href={title.href}>
                                    <a className="flex items-center gap-x-2">
                                        {title.name}
                                    </a>
                                </Link>
                            </h1>
                        )}
                        {/* Desktop */}
                        <div className="hidden md:flex flex-1 items-stretch">
                            <GlobalNav />
                            <div className="flex items-stretch ml-auto">
                                <ConfNav />
                            </div>
                        </div>
                        {/* Mobile */}
                        <div className="md:hidden flex items-stretch ml-auto">
                            <ConfNav />
                        </div>
                    </div>
                </div>
            </header>
            {children}
        </>
    );
}
