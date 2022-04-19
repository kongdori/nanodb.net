/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaIcon } from '@components/ReactIcon';
import {
    HiOutlineDotsHorizontal,
    HiOutlineDotsVertical,
    HiOutlineDesktopComputer,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineMail,
    HiOutlineHeart
} from 'react-icons/hi';
import { BiCopyAlt, BiMailSend } from 'react-icons/bi';
import * as site from 'site.config.js';

const ConfNav = () => {
    const { confNav } = site.header;

    const { theme, setTheme } = useTheme();
    let currentThemeIcon = <HiOutlineDesktopComputer />;

    const [nested, setNested] = React.useState('');

    let nestedComponent: React.ReactNode = null;

    switch (nested) {
        case '테마 설정':
            nestedComponent = (
                <nav>
                    <button
                        type="button"
                        onClick={() => {
                            setTheme('system');
                        }}
                        className={classNames(
                            'flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10',
                            {
                                'text-amber-600 dark:text-amber-500':
                                    theme === 'system'
                            }
                        )}
                    >
                        <i className="flex-center w-5 h-5 text-lg">
                            <HiOutlineDesktopComputer />
                        </i>
                        기기 테마 (기본)
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTheme('light');
                        }}
                        className={classNames(
                            'flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10',
                            {
                                'text-amber-600 dark:text-amber-500':
                                    theme === 'light'
                            }
                        )}
                    >
                        <i className="flex-center w-5 h-5 text-lg">
                            <HiOutlineSun />
                        </i>
                        밝은 테마
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTheme('dark');
                        }}
                        className={classNames(
                            'flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10',
                            {
                                'text-amber-600 dark:text-amber-500':
                                    theme === 'dark'
                            }
                        )}
                    >
                        <i className="flex-center w-5 h-5 text-lg">
                            <HiOutlineMoon />
                        </i>
                        어두운 테마
                    </button>
                </nav>
            );
            break;

        case '메일 문의':
            nestedComponent = (
                <address className="w-52 not-italic">
                    {confNav.mails.map((item) => (
                        <CopyToClipboard
                            key={item.address}
                            text={item.address}
                            onCopy={() => {
                                alert(
                                    `메일이 복사 되었습니다\r\n${item.address}`
                                );
                            }}
                        >
                            <a
                                key={item.title}
                                href={`mailto:${item.address}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                }}
                                className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10"
                            >
                                <i className="flex-center w-7 h-7 text-2xl">
                                    <BiMailSend />
                                </i>
                                <div>
                                    <h2>{item.title}</h2>
                                    <p className="text-xs text-gray-400">
                                        {item.address}
                                    </p>
                                </div>
                            </a>
                        </CopyToClipboard>
                    ))}
                </address>
            );
            break;

        case '후원':
            nestedComponent = (
                <nav className="w-60">
                    {typeof confNav.donations.buymeacoffee !== 'undefined' && (
                        <a
                            href={confNav.donations.buymeacoffee.url}
                            target="_blank"
                            rel="external noopener noreferrer nofollow"
                            className="flex items-center w-full gap-x-2 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10"
                        >
                            <i className="relative flex-center w-8 h-8">
                                <Image
                                    src="/logos/buymeacoffee/apple-icon-60x60.webp"
                                    layout="fill"
                                />
                            </i>
                            <span>Buy Me a Coffee</span>
                            <i className="flex-center w-5 h-5 text-xs ml-auto">
                                <FaIcon name="FaExternalLinkAlt" />
                            </i>
                        </a>
                    )}
                    {typeof confNav.donations.toss !== 'undefined' && (
                        <a
                            href={confNav.donations.toss.url}
                            target="_blank"
                            rel="external noopener noreferrer nofollow"
                            className="flex items-center w-full gap-x-2 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10"
                        >
                            <i className="relative flex-center w-8 h-8 bg-[#12151e] rounded-lg">
                                <Image
                                    src="/logos/toss/symbol-toss-blue.png"
                                    layout="fill"
                                />
                            </i>
                            <span>toss</span>
                            <i className="flex-center w-5 h-5 text-xs ml-auto">
                                <FaIcon name="FaExternalLinkAlt" />
                            </i>
                        </a>
                    )}
                    {typeof confNav.donations.kakaobank !== 'undefined' && (
                        <CopyToClipboard
                            text={confNav.donations.kakaobank.account}
                            onCopy={() => {
                                alert(
                                    `계좌가 복사 되었습니다\r\n카카오뱅크\r\n${confNav.donations.kakaobank.name}\r\n${confNav.donations.kakaobank.account}`
                                );
                            }}
                        >
                            <button
                                type="button"
                                className="flex items-center w-full gap-x-2 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10"
                            >
                                <i className="relative flex-center w-8 h-8 rounded-lg overflow-hidden">
                                    <Image
                                        src="/logos/kakaobank/B120.gif"
                                        layout="fill"
                                    />
                                </i>
                                <div className="text-left flex flex-col">
                                    <h2>
                                        카카오뱅크 (
                                        {confNav.donations.kakaobank.name})
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        {confNav.donations.kakaobank.account}
                                    </p>
                                </div>
                                <i className="flex-center w-5 h-5 text-lg ml-auto">
                                    <BiCopyAlt />
                                </i>
                            </button>
                        </CopyToClipboard>
                    )}
                </nav>
            );
            break;

        default:
            if (theme === 'light') {
                currentThemeIcon = <HiOutlineSun className="fill-red-500" />;
            } else if (theme === 'dark') {
                currentThemeIcon = <HiOutlineMoon className="fill-amber-500" />;
            }

            nestedComponent = (
                <nav>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setNested('테마 설정');
                            }}
                            className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10 font-medium"
                        >
                            <i className="flex-center w-5 h-5 text-lg">
                                {currentThemeIcon}
                            </i>
                            <span>테마</span>
                            <i className="flex-center w-5 h-5 ml-auto">
                                <FaIcon name="FaChevronRight" />
                            </i>
                        </button>
                    </div>
                    <div className="border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setNested('메일 문의');
                            }}
                            className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10 font-medium"
                        >
                            <i className="flex-center w-5 h-5 text-lg">
                                <HiOutlineMail />
                            </i>
                            <span>메일</span>
                            <i className="flex-center w-5 h-5 ml-auto">
                                <FaIcon name="FaChevronRight" />
                            </i>
                        </button>
                    </div>
                    <div className="border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                setNested('후원');
                            }}
                            className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10 font-medium"
                        >
                            <i className="flex-center w-5 h-5 text-lg">
                                <HiOutlineHeart />
                            </i>
                            <span>후원</span>
                            <i className="flex-center w-5 h-5 ml-auto">
                                <FaIcon name="FaChevronRight" />
                            </i>
                        </button>
                    </div>
                    <div className="border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                    <div>
                        {confNav.links.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="external noopener noreferrer nofollow"
                                aria-label={item.name}
                                className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10"
                            >
                                <i className="flex-center w-5 h-5 text-lg">
                                    <FaIcon name={item.faIcon} />
                                </i>
                                <span>{item.name}</span>
                                <i className="flex-center w-5 h-5 text-xs ml-auto">
                                    <FaIcon name="FaExternalLinkAlt" />
                                </i>
                            </a>
                        ))}
                    </div>
                </nav>
            );
    }

    return (
        <Popover className="relative flex items-center">
            {({ open, close }) => (
                <>
                    <Popover.Button
                        className={classNames(
                            'flex items-center justify-center rounded w-8 h-8',
                            { 'bg-black/5 dark:bg-white/10': open }
                        )}
                    >
                        <i className="hidden md:flex text-3xl">
                            <HiOutlineDotsHorizontal />
                        </i>
                        <i className="flex md:hidden text-2xl">
                            <HiOutlineDotsVertical />
                        </i>
                    </Popover.Button>
                    <Transition
                        as={React.Fragment}
                        show={open}
                        leave="transition ease-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0 translate-y-2"
                        afterLeave={() => {
                            setNested('');
                        }}
                    >
                        <Popover.Panel className="absolute top-10 right-0">
                            <div className="min-w-[12rem] p-1.5 whitespace-nowrap text-sm backdrop-blur bg-white/95 shadow rounded dark:bg-dark/95 dark:shadow-black">
                                {nested && (
                                    <>
                                        <h1>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNested('');
                                                }}
                                                className="flex items-center w-full gap-x-1.5 py-1.5 px-2 rounded lg:hover:bg-black/5 dark:lg:hover:bg-white/10 font-medium"
                                            >
                                                <i className="flex-center w-5 h-5">
                                                    <FaIcon name="FaChevronLeft" />
                                                </i>
                                                <span>{nested}</span>
                                            </button>
                                        </h1>
                                        <div className="border-b border-black/10 dark:border-white/10 mx-2 mb-1 pt-1" />
                                    </>
                                )}
                                {nestedComponent}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default ConfNav;
