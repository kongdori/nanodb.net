import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import { FaGithub, FaSteam, FaEnvelope } from 'react-icons/fa';
import styled from 'styled-components';
import classNames from 'classnames';
import ThemeSwitch from '../widget/ThemeSwitch';

const aboutLinks = [
    {
        key: 'github',
        href: 'https://github.com/nanodbnet',
        label: '나노디비 깃허브',
        content: <FaGithub />
    },
    {
        key: 'steam',
        href: 'https://steamcommunity.com/groups/nanodbnet',
        label: '나노디비 스팀',
        content: <FaSteam />
    }
];

const Logo = styled.div`
    width: 23px;
    height: 28px;
`;

const Header = () => (
    <header>
        <div
            className={classNames('w-full', 'bg-nanodb', 'dark:bg-neutral-900')}
        >
            <div className="wrapper">
                <div className="h-8 flex items-center justify-between">
                    <div className="flex">
                        <div className="flex items-center space-x-3">
                            {aboutLinks.map((link) => (
                                <div key={link.key} className="h-5">
                                    <a
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer nofollow external"
                                        className="text-lg text-white/70 hover:text-white/90"
                                        aria-label={link.label}
                                    >
                                        {link.content}
                                    </a>
                                </div>
                            ))}
                            <Popover className="relative h-5">
                                <Popover.Button aria-label="나노디비 문의">
                                    <FaEnvelope className="text-lg text-white/70 hover:text-white/90" />
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
                                        <div className="rounded-lg shadow-lg bg-white p-4">
                                            <h2 className="text-xs text-black">
                                                나노디비 문의
                                            </h2>
                                            <p className="text-sm text-gray-500 mb-5">
                                                nano@nanodb.net
                                            </p>
                                            <h2 className="text-xs text-black">
                                                개인 문의
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                nckres14@gmail.com
                                            </p>
                                        </div>
                                    </Popover.Panel>
                                </Transition>
                            </Popover>
                        </div>
                    </div>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
        <nav
            className={classNames(
                'sticky top-0 z-40 w-full backdrop-blur border-b shadow-sm',
                'border-b-black/10 bg-white/20',
                'dark:border-b-white/10 dark:bg-dark'
            )}
        >
            <div className="wrapper">
                <div className="py-2.5">
                    <div className="relative flex items-center">
                        <Link href="/">
                            <a aria-label="나노디비 홈">
                                <h1 className="flex flex-nowrap items-center">
                                    <Logo className="dark:hidden">
                                        <Image
                                            src="/logo.svg"
                                            alt="nanodb"
                                            width="23"
                                            height="28"
                                        />
                                    </Logo>
                                    <Logo className="hidden dark:block">
                                        <Image
                                            src="/logo-dark.svg"
                                            alt="nanodb"
                                            width="23"
                                            height="28"
                                        />
                                    </Logo>
                                    <strong className="text-base ml-3 font-semibold text-nanodb dark:text-white">
                                        나노디비
                                    </strong>
                                </h1>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    </header>
);

export default Header;
