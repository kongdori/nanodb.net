import { siteName, header } from 'site.config.js';
import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import ThemeSwitch from '@components/ThemeSwitch';
import * as Icons from 'react-icons/fa';

const FaIcon = ({ name }: { name: string }) => {
    const IconComponent = Icons[name as keyof typeof Icons];
    return <IconComponent />;
};

const HeaderTop = () => {
    const { topNav } = header;
    const { links, mail } = topNav;

    return (
        <div className="w-full bg-primary dark:bg-neutral-900">
            <div className="responsive">
                <div className="h-8 flex items-center justify-between">
                    <div className="flex">
                        <div className="flex items-center space-x-3">
                            {links.map((item) => (
                                <a
                                    key={item.key}
                                    href={item.href}
                                    target="_blank"
                                    rel="noreferrer nofollow external"
                                    className="text-lg text-white/70 hover:text-white/90"
                                    aria-label={item.label}
                                >
                                    <FaIcon name={item.faIcon} />
                                </a>
                            ))}
                            {mail && (
                                <Popover key="mail" className="relative h-5">
                                    <Popover.Button
                                        className="text-lg text-white/70 hover:text-white/90"
                                        aria-label={mail.label}
                                    >
                                        <FaIcon name={mail.faIcon} />
                                    </Popover.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-2"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-2"
                                    >
                                        <Popover.Panel className="absolute z-50 w-screen max-w-xs px-4 mt-2 -left-10">
                                            <div className="rounded-lg shadow-lg bg-white pt-4 px-4">
                                                {mail.mails?.map((item) => (
                                                    <div
                                                        key={item.title}
                                                        className="pb-4"
                                                    >
                                                        <h2 className="text-xs text-black">
                                                            {item.title}
                                                        </h2>
                                                        <p className="text-sm text-gray-500">
                                                            {item.address}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </Popover>
                            )}
                        </div>
                    </div>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    const router = useRouter();
    const { globalNav } = header;

    return (
        <header className="w-full">
            <div className="sticky top-0 z-40 w-full backdrop-blur border-b shadow-sm border-b-black/10 bg-white/90 dark:border-b-white/10 dark:bg-dark/90">
                <div className="responsive">
                    <div className="h-11 flex items-center">
                        <div className="mr-5">
                            <Link href="/">
                                <a aria-label="Home">
                                    <h1 className="py-2 flex flex-nowrap items-center">
                                        <div className="w-[20px] h-[20px] relative dark:hidden">
                                            <Image
                                                src="/logo.svg"
                                                alt={siteName}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <div className="w-[20px] h-[20px] relative hidden dark:block">
                                            <Image
                                                src="/logo-dark.svg"
                                                alt={siteName}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <strong className="whitespace-nowrap inline-block ml-2 text-sm font-bold text-primary dark:text-white">
                                            {siteName}
                                        </strong>
                                    </h1>
                                </a>
                            </Link>
                        </div>
                        <nav className="flex" aria-label="Global">
                            {globalNav.map((item) => (
                                <Link key={item.key} href={item.href}>
                                    <a
                                        className={classNames(
                                            'px-2 py-1 -mb-2 font-medium text-base border-b-4 border-transparent',
                                            item.current_match
                                                ? 'text-neutral-800 dark:text-white border-amber-500'
                                                : 'text-neutral-600 hover:text-neutral-700 dark:text-neutral-300 dark:hover:text-neutral-200'
                                        )}
                                    >
                                        {item.name}
                                    </a>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
};

interface LayoutContainerProps {
    children: React.ReactNode;
}

const LayoutContainer = ({ children }: LayoutContainerProps) => (
    <>
        <HeaderTop />
        <Header />
        <main>{children}</main>
    </>
);

export default LayoutContainer;
