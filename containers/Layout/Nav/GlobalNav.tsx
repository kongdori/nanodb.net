import React, { Fragment, useRef } from 'react';
import * as site from 'site.config.js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Io5Icon } from '@components/ReactIcon';

const { globalNav } = site.header;

const GlobalNav = () => {
    const router = useRouter();
    let currentRootPath: string;

    if (router.pathname) {
        [, currentRootPath] = router.pathname.split('/');
    }

    let opened = false;
    const timerDuration = 200;
    let timer: ReturnType<typeof setTimeout>;
    const popoverBtnRefs = useRef<HTMLAnchorElement[]>([]);

    const openPopover = (index: number) => {
        const current = popoverBtnRefs.current[index];

        if (current) {
            opened = true;
            current.focus();
            current.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Enter',
                    bubbles: true,
                    cancelable: true
                })
            );
        }
    };

    const closePopover = (index: number) => {
        const current = popoverBtnRefs.current[index];

        if (current) {
            opened = false;
            current.focus();
            current.dispatchEvent(
                new KeyboardEvent('keydown', {
                    key: 'Escape',
                    bubbles: true,
                    cancelable: true
                })
            );
            current.blur();
        }
    };

    const onFocus = (open: boolean, index: number) => {
        clearTimeout(timer);
        if (!open) {
            openPopover(index);
        }
    };

    const onBlur = (open: boolean, index: number) => {
        if (open) {
            timer = setTimeout(() => closePopover(index), timerDuration);
        }
    };

    const hoverClassNames = (active: string[], open: boolean) => {
        if (currentRootPath && active.includes(currentRootPath)) {
            return 'text-neutral-900 dark:text-neutral-100';
        }

        if (open) {
            return 'text-neutral-800 dark:text-neutral-700';
        }

        return 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200';
    };

    return (
        <Popover.Group
            as="nav"
            className="flex items-stretch"
            aria-label="Global"
        >
            {globalNav.map((item, index) => (
                <Popover key={item.name} as={Fragment}>
                    {({ open }) => (
                        <div
                            className="relative flex items-center"
                            onMouseLeave={() => {
                                onBlur(open, index);
                            }}
                        >
                            <Link href={item.href} passHref>
                                <Popover.Button
                                    as="a"
                                    ref={(elm: HTMLAnchorElement) => {
                                        popoverBtnRefs.current[index] = elm;
                                    }}
                                    onMouseEnter={() => {
                                        onFocus(open, index);
                                    }}
                                    className={classNames(
                                        hoverClassNames(
                                            item.active as string[],
                                            open
                                        ),
                                        'block rounded py-1 px-4 text-center font-semibold text-sm whitespace-nowrap outline-none transition-colors focus:bg-black/5 dark:focus:bg-white/10'
                                    )}
                                >
                                    {item.name}
                                </Popover.Button>
                            </Link>
                            <Transition
                                as={Fragment}
                                {...(!opened && {
                                    // enter: transition ease-out duration-200",
                                    // enterFrom: opacity-0 translate-y-1",
                                    // enterTo: opacity-100 translate-y-0",
                                    leave: 'transition ease-in duration-200',
                                    leaveFrom: 'opacity-100 translate-y-0',
                                    leaveTo: 'opacity-0 translate-y-1'
                                })}
                            >
                                <Popover.Panel
                                    className="absolute top-full -left-2"
                                    onMouseEnter={() => {
                                        onFocus(open, index);
                                    }}
                                >
                                    {item.subNav.map((item2) => (
                                        <div
                                            key={item2.name}
                                            className="whitespace-nowrap w-52 p-2 backdrop-blur bg-white/80 border border-black/10 shadow rounded outline-0 dark:bg-dark/80 dark:border-white/10 dark:shadow-black"
                                        >
                                            <Link href={item2.href}>
                                                <a
                                                    className={classNames(
                                                        router.pathname ===
                                                            item2.href
                                                            ? 'text-neutral-900 dark:text-neutral-100'
                                                            : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200',
                                                        'block rounded py-1.5 px-2 font-medium text-sm hover:bg-black/5 dark:hover:bg-white/10'
                                                    )}
                                                >
                                                    {item2.io5Icon && (
                                                        <i className="inline-block align-middle mr-1 text-base">
                                                            <Io5Icon
                                                                name={
                                                                    item2.io5Icon
                                                                }
                                                            />
                                                        </i>
                                                    )}
                                                    {item2.name}
                                                </a>
                                            </Link>
                                        </div>
                                    ))}
                                </Popover.Panel>
                            </Transition>
                        </div>
                    )}
                </Popover>
            ))}
        </Popover.Group>
    );
};

export default GlobalNav;
