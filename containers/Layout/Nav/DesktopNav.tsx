/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { createStateContext } from 'react-use';
import { Io5Icon } from '@components/ReactIcon';
import * as site from 'site.config.js';

const [useActive, ActiveProvider] = createStateContext(false);

interface GlobalNavItemProps {
    nav: {
        name: string;
        active: string[];
        menus: {
            name: string;
            href: string;
            active: string[];
            io5Icon: string;
            grid?: boolean;
        }[];
    };
}

const GlobalNavItem = ({ nav }: GlobalNavItemProps) => {
    const router = useRouter();
    const [, currentRootPath] = router.pathname.split('/');

    const [active, setActive] = useActive();
    const [enter, setEnter] = React.useState(false);

    const timerDuration = 300;
    let timer: ReturnType<typeof setTimeout>;

    const onEnter = () => {
        clearTimeout(timer);
        setActive(true);
        setEnter(true);
    };

    const onLeave = () => {
        if (active) {
            setEnter(false);
        } else {
            timer = setTimeout(() => {
                setEnter(false);
            }, timerDuration);
        }

        setActive(false);
    };

    return (
        <div
            className="flex items-center relative"
            // onFocus={() => {
            //     onEnter();
            // }}
            // onBlur={() => {
            //     onLeave();
            // }}
            onMouseEnter={() => {
                onEnter();
            }}
            onMouseLeave={() => {
                onLeave();
            }}
        >
            <button
                type="button"
                onClick={() => {
                    if (window.innerWidth < 1024) {
                        if (enter) {
                            onLeave();
                        } else {
                            onEnter();
                        }
                    }
                }}
                className={classNames(
                    'rounded flex py-0.5 px-3 z-20 font-medium cursor-default',
                    nav.active.includes(currentRootPath)
                        ? 'text-black dark:text-white'
                        : {
                              'text-neutral-900 dark:text-neutral-100': enter
                          },
                    {
                        'bg-black/5 dark:bg-white/10 group': enter
                    }
                )}
            >
                {nav.name}
            </button>
            <div
                className={classNames(
                    'absolute top-10 left-0 p-2 w-44 lg:w-52 -ml-2',
                    {
                        'translate-y-2 opacity-0 pointer-events-none': !enter,
                        'transition duration-300 ease-out': !active
                    }
                )}
            >
                <div className="text-sm whitespace-nowrap p-1.5 backdrop-blur bg-white/95 shadow rounded dark:bg-dark/95 dark:shadow-black">
                    {nav.menus.map((nav2) => (
                        <div key={nav2.name}>
                            <Link href={nav2.href}>
                                <a
                                    onClick={() => {
                                        if (window.innerWidth < 1024) {
                                            setEnter(false);
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (
                                            e.key === 'Enter' &&
                                            window.innerWidth < 1024
                                        ) {
                                            setEnter(false);
                                        }
                                    }}
                                    className={classNames(
                                        'flex items-center gap-x-1.5 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10',
                                        nav2.active.includes(router.pathname)
                                            ? 'text-black dark:text-white'
                                            : 'hover:text-neutral-600 dark:hover:text-neutral-400'
                                    )}
                                >
                                    {nav2.io5Icon && (
                                        <i className="flex-center">
                                            <Io5Icon name={nav2.io5Icon} />
                                        </i>
                                    )}
                                    <span>{nav2.name}</span>
                                </a>
                            </Link>
                            {nav2.grid && (
                                <div className="border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const GlobalNav = () => {
    const { globalNav } = site.header;

    return (
        <ActiveProvider>
            <nav className="flex items-stretch font-medium text-neutral-600 dark:text-neutral-400">
                {globalNav.map((nav) => (
                    <GlobalNavItem key={nav.name} nav={nav} />
                ))}
            </nav>
        </ActiveProvider>
    );
};

const DesktopNav = () => (
    <div className="hidden md:flex flex-1 gap-x-3 items-stretch">
        <GlobalNav />
    </div>
);

export default DesktopNav;
