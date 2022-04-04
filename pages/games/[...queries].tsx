import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SWRConfig, SWRConfiguration } from 'swr';
import moment from 'moment';
import 'moment/locale/ko';
import classNames from 'classnames';
import { AppProps, getAppListQueries, getAppListUrl } from '@lib/apps';
import {
    GameDetail,
    getGameDetail,
    getGameDetailKey,
    useGameDetail
} from '@lib/apps/game';
import { Detail, About } from '@containers/App/Detail';
import CountdownDay from '@components/CountdownDay';
import { Steam } from '@components/Logo';

const GameSummary = ({ detail }: { detail: GameDetail }) => (
    <>
        <p className="text-sm break-words">{detail && detail.snippet}</p>
        <div className="lg:hidden py-2">
            {detail && <About detail={detail} />}
        </div>
        {detail.is_hangeuls && (
            <div className="py-3">
                <h2 className="flex items-center py-2 font-medium dark:text-gray-300">
                    한국어화
                </h2>
                <div className="flex flex-col space-y-4 text-sm dark:text-neutral-300">
                    {detail.hangeul.officials.length > 0 && (
                        <div>
                            <div className="mb-0.5 font-medium text-blue-600 dark:text-blue-500">
                                공식 한국어 지원
                            </div>
                            <div className="flex flex-col space-y-1">
                                {detail.hangeul.officials.map((hangeul) => (
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
                    {detail.hangeul.users.length > 0 && (
                        <div>
                            <div className="mb-0.5 font-medium text-amber-600 dark:text-amber-500">
                                유저 한국어 지원
                            </div>
                            <div className="flex flex-col space-y-2">
                                {detail.hangeul.users.map((hangeul) => (
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
        )}
        {detail.prices.length > 0 && (
            <div className="py-3">
                <h2 className="flex items-center py-2 font-medium dark:text-gray-300">
                    가격 목록
                </h2>
                <div>
                    <div className="flex items-center text-xs font-medium">
                        <div className="flex-1">상점</div>
                        <div className="flex ml-auto">
                            <div className="w-40 hidden sm:block">
                                세일 / 남은시간
                            </div>
                            <div className="w-28 text-right">가격</div>
                        </div>
                    </div>
                    <div className="flex flex-col divide-y -mx-2 divide-black/5 dark:divide-whte/5">
                        {detail.prices.map((price, index) => (
                            <a
                                key={price.store + index.toString()}
                                href={price.url}
                                target="_blank"
                                rel="external noopener noreferrer nofollow"
                                className="flex flex-wrap items-center w-full py-1 px-2 rounded sm:hover:bg-black/5 sm:dark:hover:bg-black/30"
                            >
                                <div className="flex flex-1 items-center gap-x-2 md:gap-x-4">
                                    <div className="w-20 h-8">
                                        {price.store === 'Steam' && (
                                            <i className="flex items-center w-full h-full">
                                                <Steam />
                                            </i>
                                        )}
                                    </div>
                                    <div>
                                        <strong className="text-sm font-medium">
                                            {price.store}
                                        </strong>
                                        <p className="text-xs text-neutral-400">
                                            마지막 업데이트:{' '}
                                            {moment(
                                                price.last_updated
                                            ).fromNow()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-start">
                                    {price.discount && (
                                        <div className="w-40 hidden sm:flex items-baseline space-x-2 text-xs sm:text-sm">
                                            <span className="bg-lime-600/90 dark:bg-lime-700/90 text-white rounded-sm px-1">
                                                {price.discount_formatted}
                                            </span>
                                            {price.countdown && (
                                                <div className="text-right font-medium text-lime-600 dark:text-lime-500">
                                                    <CountdownDay
                                                        date={price.countdown}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <div className="w-28 flex flex-col items-end font-medium">
                                        {price.discount && (
                                            <div className="text-xs text-neutral-400 line-through">
                                                {price.initial_formatted}
                                            </div>
                                        )}
                                        <em
                                            className={classNames(
                                                'text-sm not-italic',
                                                {
                                                    'text-red-600 dark:text-red-400':
                                                        price.discount
                                                }
                                            )}
                                        >
                                            {price.final_formatted}
                                        </em>
                                    </div>
                                </div>
                                {/* mobile discount */}
                                {price.discount && (
                                    <>
                                        <div className="sm:hidden basis-full" />
                                        <div className="sm:hidden flex ml-auto items-baseline space-x-2 text-xs sm:text-sm">
                                            <span className="bg-lime-600/90 dark:bg-lime-700/90 text-white rounded-sm px-1">
                                                {price.discount_formatted}
                                            </span>
                                            {price.countdown && (
                                                <div className="text-right font-medium text-lime-600 dark:text-lime-500">
                                                    <CountdownDay
                                                        date={price.countdown}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
);

export const GameDetailPage = ({ appid }: Partial<AppProps>) => {
    const router = useRouter();
    const queries = getAppListQueries(router.query?.queries);
    const gameid = (appid || queries?.appid) as number;

    const { ...swrResponse } = useGameDetail(gameid);
    const detail = swrResponse.data;
    // const detail = undefined; // skeleton tests

    // 기본 메인 선택
    let menuList;
    const [menuSelected, setMenuSelected] = React.useState(0);

    if (detail) {
        menuList = [
            {
                name: '요약',
                href: getAppListUrl(detail.app, detail.appid, detail.slug),
                menu: undefined,
                component: <GameSummary detail={detail} />
            }
        ];
    }

    React.useEffect(() => {
        if (!appid && detail && queries?.slug !== detail.slug) {
            router
                .push(
                    getAppListUrl(detail.app, detail.appid, detail.slug),
                    undefined,
                    { shallow: true }
                )
                .then(() => {})
                .catch(() => {});
        }
    }, [detail, queries]);

    return (
        <Detail detail={detail}>
            <div
                className={classNames({
                    'animate-pulse': !detail
                })}
            >
                <div className="mb-2 border-b border-b-black/10 dark:border-b-white/10">
                    <div className="flex space-x-2 text-sm">
                        {menuList ? (
                            menuList.map((menu) =>
                                queries?.menu === menu.menu ? (
                                    <div
                                        key={menu.name}
                                        className="flex py-1 px-2 font-medium cursor-pointer text-slate-900 dark:text-slate-100 border-b-[3px] border-b-slate-800 dark:border-b-slate-200"
                                    >
                                        <span>{detail && menu.name}</span>
                                    </div>
                                ) : (
                                    <Link key={menu.name} href={menu.href}>
                                        <a className="py-1 px-2">
                                            <span>{detail && menu.name}</span>
                                        </a>
                                    </Link>
                                )
                            )
                        ) : (
                            <div className="w-full h-5 mb-2 max-w-lg bg-slate-400/20 rounded" />
                        )}
                    </div>
                </div>
                <div
                    className={classNames({
                        'max-w-2xl h-72 bg-slate-400/20 rounded': !detail
                    })}
                >
                    {menuList && menuList[menuSelected].component}
                </div>
            </div>
        </Detail>
    );
};

type PageProps = SWRConfiguration<GameDetail>;

export default function Page({ ...props }: PageProps) {
    return (
        <SWRConfig value={props}>
            <GameDetailPage />
        </SWRConfig>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
    context
) => {
    const queries = getAppListQueries(context.params?.queries);
    const appid = queries?.appid as number;
    const detail = await getGameDetail(appid);

    const props: PageProps = {
        fallback: {
            [getGameDetailKey(appid)]: detail
        }
    };

    return { props };
};
