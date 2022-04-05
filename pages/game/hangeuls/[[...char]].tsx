import React from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SWRConfig, SWRConfiguration } from 'swr';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import { MdTouchApp } from 'react-icons/md';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import { IoLanguage } from 'react-icons/io5';
import { HiOutlineFilter, HiOutlineCog, HiX } from 'react-icons/hi';
import ImageWithFallback from '@components/ImageWithFallback';
import { getAppListUrl } from '@lib/apps';
import {
    getGameHangeulIndexList,
    getGameHangeulIndexListKey,
    useGameHangeulIndexList,
    getGameHangeulList,
    getGameHangeulListKey,
    useGameHangeulList,
    GameHangeulListItem
} from '@lib/apps/game';
import Breadcrumb from '@components/Breadcrumb';

interface GameHangeulsPageOptions {
    is_show_image: null | string;
    filter_hangeul: null | string;
}

interface PageProps {
    swrConfig: SWRConfiguration;
    options: GameHangeulsPageOptions;
}

/*
    Components
*/

const HangeulListItem = React.memo(
    ({
        item,
        options
    }: {
        item: GameHangeulListItem;
        options: GameHangeulsPageOptions;
    }) => (
        <div key={item.appid}>
            <div className="relative rounded p-2">
                <Link
                    href={getAppListUrl(item.app, item.appid, item.slug)}
                    shallow
                >
                    <a className="absolute inset-0 p-2 pointer-events-auto lg:hover:bg-black/5 lg:dark:hover:bg-black/10">
                        {(options.is_show_image === 'true' ||
                            options.is_show_image === null) && (
                            <div
                                className={classNames(
                                    'relative w-24 lg:w-28 h-14 lg:h-16 rounded overflow-hidden',
                                    {
                                        'hidden sm:block':
                                            options.is_show_image === null
                                    }
                                )}
                            >
                                <ImageWithFallback
                                    src={item.image_header}
                                    fallbackSrc="/assets/apps/game/no_image_header.jpg"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                        )}
                    </a>
                </Link>
                <div
                    className={classNames(
                        options.is_show_image === 'true'
                            ? 'pl-[6.6rem] lg:pl-[7.8rem]'
                            : {
                                  'sm:pl-[6.6rem] lg:pl-[7.8rem]':
                                      options.is_show_image === null
                              },
                        'relative pointer-events-none min-h-[3.5rem] lg:min-h-[4rem]'
                    )}
                >
                    <h1 className="mb-1 lg:mb-2 text-sm font-semibold break-all leading-tight dark:text-gray-200">
                        {item.name}
                    </h1>
                    <div className="flex flex-col space-y-4 text-xs dark:text-neutral-300">
                        {item.hangeul.officials.length > 0 && (
                            <div>
                                <div className="mb-0.5 font-medium text-blue-600 dark:text-blue-500">
                                    공식 한국어 지원
                                </div>
                                <div className="flex flex-col space-y-1">
                                    {item.hangeul.officials.map((hangeul) => (
                                        <div key={hangeul.id}>
                                            <span className="font-medium">
                                                {hangeul.source}
                                            </span>
                                            {' - '}
                                            {hangeul.brief}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {item.hangeul.users.length > 0 && (
                            <div>
                                <div className="mb-0.5 font-medium text-amber-600 dark:text-amber-500">
                                    유저 한국어 지원
                                </div>
                                <div className="flex flex-col space-y-2">
                                    {item.hangeul.users.map((hangeul) => (
                                        <div
                                            key={hangeul.id}
                                            className="flex flex-col space-y-0.5 break-words"
                                        >
                                            <div>
                                                {hangeul.source && (
                                                    <>
                                                        <span className="font-medium">
                                                            {hangeul.source}
                                                        </span>
                                                        {(hangeul.brief ||
                                                            hangeul.url) &&
                                                            ' - '}
                                                    </>
                                                )}
                                                {hangeul.brief ||
                                                    (hangeul.url && (
                                                        <a
                                                            href={hangeul.url}
                                                            target="_blank"
                                                            rel="external noopener noreferrer nofollow"
                                                            className="pointer-events-auto break-all hover:underline text-blue-700 dark:text-blue-400"
                                                        >
                                                            {hangeul.url}
                                                        </a>
                                                    ))}
                                            </div>
                                            {hangeul.source && hangeul.brief && (
                                                <a
                                                    href={hangeul.url}
                                                    target="_blank"
                                                    rel="external noopener noreferrer nofollow"
                                                    className="pointer-events-auto break-all hover:underline text-blue-700 dark:text-blue-400"
                                                >
                                                    {hangeul.url}
                                                </a>
                                            )}
                                            {hangeul.guide && (
                                                <div className="whitespace-pre-wrap bg-black/5 dark:bg-white/10 p-2 rounded">
                                                    {hangeul.guide}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="mx-2 mt-1 pb-1 border-t border-black/10 dark:border-white/10" />
        </div>
    ),
    (prevProps, nextProps) =>
        JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

const GameHangeulsPage = ({ options }: Pick<PageProps, 'options'>) => {
    // Index List
    const indexList = useGameHangeulIndexList().data;

    /* Hangeul List */
    const router = useRouter();
    const char = router.query.char?.toString() || indexList?.[0].char || '';
    const index = indexList?.find((item) => item.char === char);

    const hangeulList = useGameHangeulList(char);

    /* Mobile */
    const [isOpen, setIsOpen] = React.useState(false);
    const openRef = useDetectClickOutside({
        onTriggered: () => {
            setIsOpen(false);
        }
    });

    /* Options */
    const [clientOptions, setClientOptions] =
        React.useState<GameHangeulsPageOptions>(options);

    React.useEffect(() => {
        const cookies = getCookies({ path: '/game/hangeuls' });

        Object.entries(clientOptions).forEach(([key, value]) => {
            if (cookies[key] !== value) {
                if (value) {
                    setCookies(key, value, {
                        path: '/game/hangeuls',
                        maxAge: 60 * 60 * 24 * 365
                    });
                } else if (cookies[key]) {
                    removeCookies(key, { path: '/game/hangeuls' });
                    removeCookies(key, {
                        path: encodeURI(`/game/hangeuls/${char}`)
                    });
                }
            }
        });

        document.body.style.overflow = isOpen ? 'hidden' : '';

        return () => {
            document.body.style.overflow = '';
        };
    }, [clientOptions, char, isOpen]);

    if (!indexList || !index || !hangeulList) return null;

    const settings = [
        {
            label: '게임 이미지',
            name: 'is_show_image',
            value: clientOptions.is_show_image || '',
            choices: [
                {
                    label: '반응형 표시 (기본, 모바일 데이터 보호)',
                    value: '',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            is_show_image: null
                        });
                    }
                },
                {
                    label: '표시',
                    value: 'true',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            is_show_image: 'true'
                        });
                    }
                },
                {
                    label: '감추기',
                    value: 'false',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            is_show_image: 'false'
                        });
                    }
                }
            ]
        },
        {
            label: '한국어화 표시',
            name: 'filter_hangeul',
            value: clientOptions.filter_hangeul || '',
            choices: [
                {
                    label: '전부표시',
                    value: '',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            filter_hangeul: null
                        });
                    }
                },
                {
                    label: '공식',
                    value: 'officials',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            filter_hangeul: 'officials'
                        });
                    }
                },
                {
                    label: '유저',
                    value: 'users',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            filter_hangeul: 'users'
                        });
                    }
                }
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto pb-8 md:px-4 mt-12">
            <div
                ref={openRef}
                className={classNames(
                    'md:block fixed z-30',
                    isOpen
                        ? 'w-[70%] top-12 bottom-0 shadow dark:shadow-black'
                        : 'hidden w-[6rem] lg:w-[18rem] top-16 bottom-4'
                )}
            >
                <div
                    className={classNames(
                        'h-full content-item whitespace-nowrap',
                        isOpen ? 'pt-16' : 'pt-14 lg:pt-16'
                    )}
                >
                    <div className="absolute top-0 inset-x-0">
                        <div
                            className={classNames(
                                'flex items-center gap-x-2 py-3 font-medium',
                                isOpen
                                    ? 'text-sm px-4'
                                    : 'justify-center lg:justify-start text-xs lg:text-sm lg:px-4'
                            )}
                        >
                            <i className="hidden lg:flex text-neutral-900 dark:text-neutral-200">
                                <HiOutlineFilter />
                            </i>
                            이름 순 필터링
                            {isOpen && (
                                <button
                                    type="button"
                                    className="flex ml-auto text-base"
                                    onClick={() => {
                                        setIsOpen(false);
                                    }}
                                >
                                    <HiX />
                                </button>
                            )}
                        </div>
                        <div className="flex items-center px-4 py-1 font-medium text-xs">
                            <div
                                className={classNames(
                                    'flex-1',
                                    isOpen
                                        ? 'text-left'
                                        : 'text-center lg:text-left'
                                )}
                            >
                                이름
                            </div>
                            <div
                                className={classNames(
                                    'items-center ml-auto',
                                    isOpen ? 'flex' : 'hidden lg:flex'
                                )}
                            >
                                <div className="w-16 text-right">유저</div>
                                <div className="w-16 text-right">공식</div>
                            </div>
                        </div>
                    </div>
                    <SimpleBar className="h-full py-1">
                        {indexList.map((item) => (
                            <div
                                key={item.char}
                                className="px-2 before:block before:border-t before:border-black/5 dark:before:border-white/10 before:mx-1.5 before:my-0.5"
                            >
                                <Link
                                    href={
                                        item.char === '_'
                                            ? '/game/hangeuls/'
                                            : `/game/hangeuls/${item.char}`
                                    }
                                >
                                    {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */}
                                    <a
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                setIsOpen(false);
                                            }
                                        }}
                                        className={classNames(
                                            item.char === char
                                                ? 'bg-black/10 dark:bg-white/20'
                                                : 'hover:bg-black/5 dark:hover:bg-white/10',
                                            'relative flex items-center justify-center lg:justify-start py-1 px-2 rounded'
                                        )}
                                    >
                                        <h2
                                            className={classNames(
                                                item.char === char
                                                    ? 'text-black dark:text-neutral-100 font-medium'
                                                    : 'text-neutral-700 dark:text-neutral-300',
                                                'lg:w-10 text-sm'
                                            )}
                                        >
                                            {item.label}
                                        </h2>
                                        {item.desc && (
                                            <p className="hidden lg:block italic text-xs text-neutral-500 dark:text-neutral-400">
                                                {item.desc}
                                            </p>
                                        )}
                                        <div
                                            className={classNames(
                                                'items-center leading-4 ml-auto',
                                                isOpen
                                                    ? 'flex'
                                                    : 'hidden lg:flex '
                                            )}
                                        >
                                            <div className="w-16 text-right">
                                                {item.user_counted !== 0 && (
                                                    <em className="text-xs not-italic text-neutral-500 dark:text-neutral-400">
                                                        {item.user_counted}
                                                    </em>
                                                )}
                                            </div>
                                            <div className="w-16 text-right">
                                                <em className="text-xs not-italic text-neutral-500 dark:text-neutral-400">
                                                    {item.official_counted}
                                                </em>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))}
                    </SimpleBar>
                </div>
            </div>
            {isOpen && (
                <div
                    className="fixed top-12 bottom-0 inset-x-0 h-screen bg-black/60 z-20"
                    role="presentation"
                />
            )}
            <div className="md:pl-[7rem] lg:pl-[19rem]">
                <div className="flex flex-col space-y-1 p-4 md:px-0 col-span-2">
                    <div className="flex items-center space-x-1 text-xs">
                        <Breadcrumb
                            item={[
                                <Link href="/games/">
                                    <a className="hover:underline">게임</a>
                                </Link>,
                                <Link href="/game/hangeuls/">
                                    <a className="hover:underline">
                                        한국어 지원 목록
                                    </a>
                                </Link>
                            ]}
                        />
                    </div>
                    <h1 className="flex items-center gap-x-2 font-semibold text-gray-900 dark:text-gray-100">
                        <i>
                            <IoLanguage />
                        </i>
                        한국어 지원 목록
                    </h1>
                </div>
                <div className="content-item mb-4 py-3 px-4">
                    <div className="mb-2">
                        <div className="flex items-center text-sm font-medium">
                            <i className="block align-middle mr-1.5 text-neutral-900 dark:text-neutral-200">
                                <HiOutlineCog />
                            </i>
                            설정
                        </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                        {settings.map((setting) => (
                            <div
                                key={setting.name}
                                className="flex items-baseline text-xs"
                            >
                                <div className="flex-none w-20 lg:w-28 font-medium">
                                    {setting.label}
                                </div>
                                <div className="flex flex-wrap items-baseline space-x-2">
                                    {setting.choices.map((choice) => (
                                        <label
                                            key={setting.label + choice.label}
                                            className="block cursor-pointer text-gray-500 dark:text-gray-400"
                                        >
                                            <input
                                                type="radio"
                                                name={setting.name}
                                                checked={
                                                    setting.value ===
                                                    choice.value
                                                }
                                                onChange={choice.onChange}
                                                className="hidden peer"
                                            />
                                            <span className="tracking-tight peer-checked:font-semibold peer-checked:text-neutral-900 dark:peer-checked:text-neutral-200">
                                                {choice.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-item py-1">
                    <h1 className="sticky top-12 px-4 mb-1 bg-white/95 dark:bg-dark/95 backdrop-blur z-10">
                        <button
                            type="button"
                            onClick={(e) => {
                                // MD Size
                                if (window.innerWidth < 768) {
                                    setIsOpen(true);
                                    e.stopPropagation();
                                }
                            }}
                            className="w-full flex items-center gap-x-2 py-2 font-semibold cursor-pointer md:cursor-auto"
                        >
                            <i className="flex md:hidden">
                                <BsLayoutSidebarInset />
                            </i>
                            {index.label}
                            <i className="flex md:hidden ml-auto">
                                <MdTouchApp />
                            </i>
                        </button>
                        <div className="border-b border-b-black/10 dark:border-b-white/10" />
                    </h1>
                    <div className="px-2">
                        {hangeulList.data.map((item) => {
                            if (clientOptions.filter_hangeul) {
                                if (
                                    clientOptions.filter_hangeul === 'officials'
                                ) {
                                    if (item.hangeul.officials.length < 1)
                                        return null;
                                }

                                if (clientOptions.filter_hangeul === 'users') {
                                    if (item.hangeul.users.length < 1)
                                        return null;
                                }
                            }

                            return (
                                <HangeulListItem
                                    key={item.appid}
                                    item={item}
                                    options={clientOptions}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Page({ swrConfig, options }: PageProps) {
    return (
        <SWRConfig value={swrConfig}>
            <GameHangeulsPage options={options} />
        </SWRConfig>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const indexList = await getGameHangeulIndexList();

    const char = context.query.char?.toString() || indexList[0].char;
    const hangeulsList = await getGameHangeulList(char);

    const cookies = getCookies({
        req: context.req,
        res: context.res,
        path: '/game/hangeuls'
    });

    const options: GameHangeulsPageOptions = {
        is_show_image: cookies.is_show_image || null,
        filter_hangeul: cookies.filter_hangeul || null
    };

    const props: PageProps = {
        swrConfig: {
            fallback: {
                [getGameHangeulIndexListKey()]: indexList,
                [getGameHangeulListKey(char)]: hangeulsList
            }
        },
        options
    };

    return { props };
};
