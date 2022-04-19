/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import ReactDOM from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { HiMenu, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import classNames from 'classnames';
import { Io5Icon } from '@components/ReactIcon';
import * as site from 'site.config.js';

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
    close: () => void;
}

const GlobalNavItem = ({ nav, close }: GlobalNavItemProps) => {
    const router = useRouter();
    const [, currentRootPath] = router.pathname.split('/');

    const [active, setActive] = React.useState(true);

    React.useEffect(() => {
        document.body.style.overflow = active ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [active]);

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setActive(!active);
                }}
                className={classNames(
                    'flex items-center w-full py-2 pl-4 pr-3 font-medium',
                    nav.active.includes(currentRootPath)
                        ? 'text-black dark:text-white'
                        : 'text-neutral-600 dark:text-neutral-400'
                )}
            >
                {nav.name}
                <i className="flex ml-auto text-2xl">
                    {active ? <HiChevronDown /> : <HiChevronUp />}
                </i>
            </button>
            {active && (
                <div className="pb-4">
                    <div className="ml-5 pl-2 border-l border-l-black/10 dark:border-l-white/10">
                        {nav.menus.map((nav2) => (
                            <div key={nav2.name} className="flex">
                                <Link href={nav2.href}>
                                    <a
                                        onClick={() => {
                                            close();
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') close();
                                        }}
                                        className={classNames(
                                            'flex items-center gap-x-2 p-1 px-2 text-sm font-medium',
                                            nav2.active.includes(
                                                router.pathname
                                            )
                                                ? 'text-black dark:text-white'
                                                : 'text-neutral-400'
                                        )}
                                    >
                                        {nav2.io5Icon && (
                                            <i className="flex-center w-5">
                                                <Io5Icon name={nav2.io5Icon} />
                                            </i>
                                        )}
                                        {nav2.name}
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

const MobileNav = () => {
    const { globalNav } = site.header;
    const [isOpen, setIsOpen] = React.useState(false);
    const btnRef = React.createRef<HTMLButtonElement>();

    const divRef = useDetectClickOutside({
        onTriggered: () => {
            setIsOpen(false);
        }
    });

    return (
        <div className="md:hidden flex items-center relative">
            <button
                ref={btnRef}
                type="button"
                onClick={(e) => {
                    setIsOpen(!isOpen);
                    e.stopPropagation();
                }}
                className={classNames('flex-center rounded w-8 h-8', {
                    'bg-black/5 dark:bg-white/10': isOpen
                })}
            >
                <i className="block text-2xl">
                    <HiMenu />
                </i>
            </button>
            {isOpen &&
                ReactDOM.createPortal(
                    <div className="fixed h-screen top-12 bottom-0 inset-x-0 z-50">
                        <div
                            className="bg-black/70 absolute inset-0"
                            role="presentation"
                        />
                        <div
                            ref={divRef}
                            className="bg-white dark:bg-dark relative py-1"
                        >
                            {globalNav.map((nav) => (
                                <React.Fragment key={nav.name}>
                                    <GlobalNavItem
                                        nav={nav}
                                        close={() => {
                                            setIsOpen(false);
                                        }}
                                    />
                                    <div className="last:hidden border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default MobileNav;
