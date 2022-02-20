/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as site from 'site.config.js';
import { useTheme } from 'next-themes';
import { Popover, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { createStateContext } from 'react-use';
/* icons */
import { FaIcon } from '@components/ReactIcon';
import {
    HiDotsHorizontal,
    HiOutlineDesktopComputer,
    HiOutlineMoon,
    HiOutlineSun,
    HiOutlineMail,
    HiOutlineQuestionMarkCircle
} from 'react-icons/hi';

const { confNav } = site.header;

type NestedTypes = null | 'themeSelector' | 'mailTo';

const [useNested, NestedProvider] = createStateContext<NestedTypes>(null);

/* Nested Lists */

const ThemeSelector = ({
    onThemeSelected
}: {
    onThemeSelected?: () => void;
}) => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    setTheme('system');
                    if (onThemeSelected) onThemeSelected();
                }}
                className="flex items-center w-full py-1.5 px-2 nav-anchor"
            >
                <span
                    className={classNames('flex', {
                        'text-amber-600 dark:text-amber-500': theme === 'system'
                    })}
                >
                    <i className="flex-center w-5 h-5 text-lg mr-2">
                        <HiOutlineDesktopComputer />
                    </i>
                    기기 테마
                </span>
            </button>
            <button
                type="button"
                onClick={() => {
                    setTheme('light');
                    if (onThemeSelected) onThemeSelected();
                }}
                className="flex items-center w-full py-1.5 px-2 nav-anchor"
            >
                <span
                    className={classNames('flex', {
                        'text-amber-600 dark:text-amber-500': theme === 'light'
                    })}
                >
                    <i className="flex-center w-5 h-5 text-lg mr-2">
                        <HiOutlineSun />
                    </i>
                    밝은 테마
                </span>
            </button>
            <button
                type="button"
                onClick={() => {
                    setTheme('dark');
                    if (onThemeSelected) onThemeSelected();
                }}
                className="flex items-center w-full py-1.5 px-2 nav-anchor"
            >
                <span
                    className={classNames('flex', {
                        'text-amber-600 dark:text-amber-500': theme === 'dark'
                    })}
                >
                    <i className="flex-center w-5 h-5 text-lg mr-2">
                        <HiOutlineMoon />
                    </i>
                    어두운 테마
                </span>
            </button>
        </>
    );
};

ThemeSelector.defaultProps = {
    onThemeSelected: undefined
};

const MailTo = () => (
    <>
        {confNav.mails.map((item) => (
            <a
                key={item.title}
                href={`mailto:${item.address}`}
                className="flex items-center w-full py-1.5 px-2 nav-anchor"
            >
                <i className="flex-center w-5 h-5 text-lg mr-2">
                    <HiOutlineQuestionMarkCircle />
                </i>
                <div>
                    <h2>{item.title}</h2>
                    <em className="text-xs align-top text-gray-400 dark:text-gray-500">
                        {item.address}
                    </em>
                </div>
            </a>
        ))}
    </>
);

//

const PanelNested = ({ close }: { close: () => void }) => {
    const [nested, setNested] = useNested();

    let nestedTitle = '';
    let nestedComponent = <div />;

    switch (nested) {
        case 'themeSelector':
            nestedTitle = '테마 설정';
            nestedComponent = (
                <ThemeSelector /* onThemeSelected={() => close()} */ />
            );
            break;

        case 'mailTo':
            nestedTitle = '메일 문의';
            nestedComponent = <MailTo />;
            break;

        // no default
    }

    return (
        <div className="w-full">
            <div className="py-2">
                <h1>
                    <button
                        type="button"
                        onClick={() => {
                            setNested(null);
                        }}
                        className="flex items-center w-full py-1.5 px-2 nav-anchor"
                    >
                        <i className="flex-center w-5 h-5 text-base mr-2">
                            <FaIcon name="FaChevronLeft" />
                        </i>
                        <span>{nestedTitle}</span>
                    </button>
                </h1>
                <div className="mx-2 my-2 border-t border-black/20 dark:border-white/20" />
                {nestedComponent}
            </div>
        </div>
    );
};

const PanelMain = () => {
    const [nested, setNested] = useNested();
    const { theme } = useTheme();

    let currentThemeIcon = <HiOutlineDesktopComputer />;

    if (theme === 'light') {
        currentThemeIcon = <HiOutlineSun className="fill-red-500" />;
    } else if (theme === 'dark') {
        currentThemeIcon = <HiOutlineMoon className="fill-amber-500" />;
    }

    return (
        <div className="w-full">
            <div className="py-2">
                <button
                    type="button"
                    onClick={() => {
                        setNested('themeSelector');
                    }}
                    className="flex items-center w-full py-1.5 px-2 nav-anchor"
                >
                    <i className="flex-center w-5 h-5 text-lg mr-2">
                        {currentThemeIcon}
                    </i>
                    <span>테마</span>
                    <i className="flex-center w-5 h-5 text-base ml-auto">
                        <FaIcon name="FaChevronRight" />
                    </i>
                </button>
            </div>
            <div className="mx-2 border-t border-black/20 dark:border-white/20" />
            <div className="py-2">
                <button
                    type="button"
                    onClick={() => {
                        setNested('mailTo');
                    }}
                    className="flex items-center w-full py-1.5 px-2 nav-anchor"
                >
                    <i className="flex-center w-5 h-5 text-lg mr-2">
                        <HiOutlineMail />
                    </i>
                    <span>메일</span>
                    <i className="flex-center w-5 h-5 text-base ml-auto">
                        <FaIcon name="FaChevronRight" />
                    </i>
                </button>
            </div>
            <div className="mx-2 border-t border-black/20 dark:border-white/20" />
            <div className="py-2">
                {confNav.links.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer nofollow external"
                        aria-label={item.name}
                        className="flex items-center w-full py-1.5 px-2 nav-anchor"
                    >
                        <i className="flex-center w-5 h-5 text-lg mr-2">
                            <FaIcon name={item.faIcon} />
                        </i>
                        <span>{item.name}</span>
                        <i className="flex-center w-5 h-5 text-xs ml-auto">
                            <FaIcon name="FaExternalLinkAlt" />
                        </i>
                    </a>
                ))}
            </div>
        </div>
    );
};

interface ConfNavPopoverProps {
    open: boolean;
    close: () => void;
}

const ConfNavPopover = ({ open, close }: ConfNavPopoverProps) => {
    const [nested, setNested] = useNested();

    return (
        <Transition
            show={open}
            leave="transition ease-out duration-200"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
            afterLeave={() => {
                setNested(null);
            }}
        >
            <Popover.Panel className="absolute right-0">
                <nav className="w-52 px-2 overflow-x-hidden nav-popover">
                    {nested ? <PanelNested close={close} /> : <PanelMain />}
                </nav>
            </Popover.Panel>
        </Transition>
    );
};

const ConfNav = () => (
    <NestedProvider>
        <Popover>
            {({ open, close }) => (
                <>
                    <Popover.Button className="relative h-full flex items-center outline-0 group">
                        <span
                            className={classNames(
                                open
                                    ? 'bg-black/10 dark:bg-white/10 transition-none'
                                    : 'nav-group-anchor',
                                'flex items-center justify-center w-10 h-7 rounded'
                            )}
                        >
                            <i className="block text-3xl">
                                <HiDotsHorizontal />
                            </i>
                        </span>
                    </Popover.Button>
                    <ConfNavPopover open={open} close={close} />
                </>
            )}
        </Popover>
    </NestedProvider>
);

export default ConfNav;
