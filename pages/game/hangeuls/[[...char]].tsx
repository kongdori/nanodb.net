import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { SWRConfig, SWRConfiguration } from 'swr';
import classNames from 'classnames';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import { getCookies, setCookies, removeCookies } from 'cookies-next';
import { HiOutlineFilter, HiOutlineCog } from 'react-icons/hi';
import ImageWithFallback from '@components/ImageWithFallback';
import Dialog from '@containers/App/Detail/Dialog';
import {
    getGameHangeulIndexList,
    getGameHangeulIndexListKey,
    useGameHangeulIndexList,
    getGameHangeulList,
    getGameHangeulListKey,
    useGameHangeulList,
    GameHangeulListItem,
    GameHangeulIndexListItem
} from '@lib/apps/game';

interface GameHangeulsPageOptions {
    is_hide_image: null | string;
    filter_hangeul: null | string;
}

interface PageProps {
    swrConfig: SWRConfiguration;
    options: GameHangeulsPageOptions;
}

/*
    Components
*/

const IndexListItem = React.memo(
    ({ item, char }: { item: GameHangeulIndexListItem; char: string }) => (
        <div className="px-2 before:block before:border-t before:border-black/5 dark:before:border-white/10 before:mx-1.5 before:my-0.5">
            <Link
                href={
                    item.char === '_'
                        ? '/game/hangeuls/'
                        : `/game/hangeuls/${item.char}`
                }
            >
                <a
                    className={classNames(
                        item.char === char
                            ? 'bg-gray-200 dark:bg-white/20'
                            : 'hover:bg-gray-100 dark:hover:bg-white/10',
                        'relative flex items-center py-0.5 px-2 rounded'
                    )}
                >
                    <h2
                        className={classNames(
                            item.char === char
                                ? 'text-black dark:text-white'
                                : 'text-neutral-700 dark:text-neutral-300',
                            'w-10 text-sm'
                        )}
                    >
                        {item.label}
                    </h2>
                    {item.desc && (
                        <p className="italic text-xs text-neutral-500 dark:text-neutral-400">
                            {item.desc}
                        </p>
                    )}
                    <div className="ml-auto flex">
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
    ),
    (prevProps, nextProps) =>
        JSON.stringify(prevProps) === JSON.stringify(nextProps)
);

const HangeulListItem = React.memo(
    ({
        item,
        options
    }: {
        item: GameHangeulListItem;
        options: GameHangeulsPageOptions;
    }) => (
        <div key={item.appid} className="overflow-x-hidden">
            <div className="relative rounded p-1.5 hover:bg-gray-100 dark:hover:bg-black/30">
                <Dialog
                    app={item.app}
                    appid={item.appid}
                    slug={item.slug}
                    className="absolute inset-0 p-1.5 pointer-events-auto"
                >
                    {!options.is_hide_image && (
                        <div className="relative w-32 h-14 rounded overflow-hidden">
                            <ImageWithFallback
                                src={item.image_header}
                                fallbackSrc="/assets/apps/game/no_image_header.jpg"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    )}
                </Dialog>
                <div
                    className={classNames(
                        {
                            'pl-[8.65rem]': !options.is_hide_image
                        },
                        'relative pointer-events-none'
                    )}
                >
                    <h1 className="mb-2 text-sm font-semibold break-all leading-tight">
                        {item.name}
                    </h1>
                    <div className="flex flex-col gap-y-4 text-xs dark:text-neutral-300">
                        {item.hangeul.officials.length > 0 && (
                            <div>
                                <div className="mb-0.5 font-medium text-blue-600 dark:text-blue-500">
                                    공식
                                </div>
                                <div className="flex flex-col gap-y-1">
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
                                    유저
                                </div>
                                <div className="flex flex-col gap-y-2">
                                    {item.hangeul.users.map((hangeul) => (
                                        <div
                                            key={hangeul.id}
                                            className="flex flex-col gap-y-0.5 break-words"
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
                                                <div className="whitespace-pre-wrap bg-black/5 dark:bg-white/10 p-2 rounded overflow-hidden">
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
            <div className="mx-2 mt-1.5 pb-1.5 border-t border-black/10 dark:border-white/10" />
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
    }, [clientOptions, char]);

    if (!indexList || !index || !hangeulList) return null;

    const settings = [
        {
            label: '게임 이미지',
            name: 'is_hide_image',
            value: clientOptions.is_hide_image ? 'true' : 'false',
            choices: [
                {
                    label: '표시',
                    value: 'false',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            is_hide_image: null
                        });
                    }
                },
                {
                    label: '감추기',
                    value: 'true',
                    onChange: () => {
                        setClientOptions({
                            ...clientOptions,
                            is_hide_image: 'true'
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
        <div className="max-w-6xl mx-auto pt-16 pb-4 px-4">
            <div className="w-[20rem] fixed top-16">
                <div className="content-item h-full">
                    <h1 className="pl-3 pt-2 h-8">
                        <div className="flex items-center text-sm">
                            <i className="block align-middle mr-1.5 text-neutral-900 dark:text-neutral-200">
                                <HiOutlineFilter />
                            </i>
                            이름 순 필터링
                        </div>
                    </h1>
                    <div className="h-6 flex items-center px-4 font-medium text-xs">
                        <div className="flex-1">이름</div>
                        <div className="ml-auto flex">
                            <div className="w-16 text-right">유저</div>
                            <div className="w-16 text-right">공식</div>
                        </div>
                    </div>
                    <SimpleBar className="max-h-[calc(100vh-8.5rem)] py-1">
                        {indexList.map((item) => (
                            <IndexListItem
                                key={item.char}
                                item={item}
                                char={char}
                            />
                        ))}
                    </SimpleBar>
                </div>
            </div>
            <div className="pl-[21rem]">
                <div className="content-item mb-3">
                    <div className="pl-3 pt-2 h-8">
                        <div className="flex items-center text-sm">
                            <i className="block align-middle mr-1.5 text-neutral-900 dark:text-neutral-200">
                                <HiOutlineCog />
                            </i>
                            설정
                        </div>
                    </div>
                    <div className="px-4 pb-1">
                        {settings.map((setting) => (
                            <div
                                key={setting.name}
                                className="h-6 flex items-center text-xs"
                            >
                                <div className="w-28 font-medium">
                                    {setting.label}
                                </div>
                                <div className="flex items-baseline gap-2">
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
                                            <span className="peer-checked:font-bold peer-checked:text-black dark:peer-checked:text-white">
                                                {choice.label}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content-item">
                    <h1 className="sticky top-12 px-4 py-3 bg-white/95 dark:bg-dark/95 backdrop-blur z-20 rounded-t font-semibold text-lg text-neutral-900 dark:text-white">
                        {index.label}
                    </h1>
                    <div className="grid grid-rows-1 px-2">
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
        is_hide_image: cookies.is_hide_image || null,
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
