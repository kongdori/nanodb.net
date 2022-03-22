import React from 'react';
import * as site from 'site.config.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createStateContext } from 'react-use';
import classNames from 'classnames';
import { BiChevronDown } from 'react-icons/bi';
import { Io5Icon } from '@components/ReactIcon';

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

    // 페이지 이동 닫기 (Optional)
    // React.useEffect(() => {
    //     const handleRouteChange = () => {
    //         onLeave();
    //     };

    //     router.events.on('routeChangeComplete', handleRouteChange);

    //     return () => {
    //         router.events.off('routeChangeComplete', handleRouteChange);
    //     };
    // }, []);

    return (
        <div
            className="flex items-center relative cursor-pointer"
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
                    onEnter();
                }}
                className={classNames(
                    'relative rounded flex items-center gap-x-1 py-1.5 pl-4 pr-2 z-20 font-medium leading-4',
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
                <i className="flex self-end">
                    <BiChevronDown />
                </i>
            </button>
            <div
                className={classNames('absolute top-10 -left-2 p-2', {
                    'translate-y-2 opacity-0 pointer-events-none': !enter,
                    'transition duration-300 ease-out': !active
                })}
            >
                <div className="text-sm whitespace-nowrap p-2 backdrop-blur bg-white/95 shadow rounded dark:bg-dark/95 dark:shadow-black">
                    {nav.menus.map((nav2) => (
                        <div key={nav2.name}>
                            <Link href={nav2.href}>
                                <a
                                    className={classNames(
                                        'flex items-center gap-2 py-1.5 px-2 rounded min-w-[12rem] hover:bg-black/5 dark:hover:bg-white/10',
                                        nav2.active.includes(router.pathname)
                                            ? 'text-black dark:text-white'
                                            : 'hover:text-neutral-900 dark:hover:text-neutral-100'
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

export default GlobalNav;
