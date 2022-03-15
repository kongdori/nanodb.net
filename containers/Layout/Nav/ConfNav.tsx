/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import { useTheme } from 'next-themes';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { FaIcon } from '@components/ReactIcon';
import {
    HiDotsHorizontal,
    HiOutlineDesktopComputer,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineMail,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi';
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
                            'flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10',
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
                            'flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10',
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
                            'flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10',
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
                <address className="not-italic">
                    {confNav.mails.map((item) => (
                        <a
                            key={item.title}
                            href={`mailto:${item.address}`}
                            className="flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
                        >
                            <i className="flex-center w-5 h-5 text-lg">
                                <HiOutlineQuestionMarkCircle />
                            </i>
                            <div>
                                <h2>{item.title}</h2>
                                <p className="text-xs text-gray-400">
                                    {item.address}
                                </p>
                            </div>
                        </a>
                    ))}
                </address>
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
                            className="flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10 font-medium"
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
                            className="flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10 font-medium"
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
                        {confNav.links.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="external noopener noreferrer"
                                aria-label={item.name}
                                className="flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
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
                    <Popover.Button>
                        <span
                            className={classNames(
                                'flex items-center justify-center w-10 h-7 rounded',
                                { 'bg-black/5 dark:bg-white/10': open }
                            )}
                        >
                            <i className="block text-3xl">
                                <HiDotsHorizontal />
                            </i>
                        </span>
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
                        <Popover.Panel className="absolute top-full right-0">
                            <div className="w-52 p-2 text-sm backdrop-blur bg-white/95 shadow rounded dark:bg-dark/95 dark:shadow-black">
                                {nested && (
                                    <>
                                        <h1>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setNested('');
                                                }}
                                                className="flex items-center w-full gap-2 py-1.5 px-2 rounded hover:bg-black/5 dark:hover:bg-white/10 font-medium"
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
