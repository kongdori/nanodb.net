import React from 'react';
import { SWRConfig, SWRConfiguration } from 'swr';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/ko';
import classNames from 'classnames';
import { AppProps } from '@lib/apps';
import {
    GameDetail,
    getGameDetail,
    getGameDetailKey,
    useGameDetail
} from '@lib/apps/game';
import { Detail } from '@containers/App/Detail';
import CountdownDay from '@components/CountdownDay';
import { Steam } from '@components/Logo';

interface GameDetailPageProps extends Partial<AppProps> {}

export const GameDetailPage = ({ appid }: GameDetailPageProps) => {
    const router = useRouter();
    const gameid = appid || Number(router.query?.slug?.[0]);
    const slug = router.query?.slug?.[1] as string;

    const { ...swr } = useGameDetail(gameid);

    const detail = swr.data;

    React.useEffect(() => {
        if (!appid && detail && slug !== detail.slug) {
            router
                .push(
                    {
                        pathname: `/games/${detail.appid}/${detail.slug}/`
                    },
                    undefined,
                    { shallow: true }
                )
                .then(() => {})
                .catch(() => {});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Detail swr={swr} headerShowcase>
            {detail && (
                <div className="flex flex-col gap-6">
                    {detail.reviews.length > 0 && (
                        <div>
                            <h2 className="flex items-center py-2 font-medium text-neutral-900 dark:text-neutral-100">
                                평가
                            </h2>
                            <div>
                                <div className="db-table">
                                    {detail.reviews.map((item) => {
                                        if (item.name === 'steam')
                                            return (
                                                <div key={item.name}>
                                                    <div className="head">
                                                        <div className="key">
                                                            STEAM
                                                        </div>
                                                        <div className="depth">
                                                            평가
                                                        </div>
                                                    </div>
                                                    <div className="rows">
                                                        {item.reviews.map(
                                                            (review) => (
                                                                <div
                                                                    key={
                                                                        review.name
                                                                    }
                                                                >
                                                                    <div className="key">
                                                                        {
                                                                            review.name
                                                                        }
                                                                    </div>
                                                                    <div>
                                                                        <a
                                                                            href={
                                                                                item.url
                                                                            }
                                                                            target="_blank"
                                                                            rel="external noopener noreferrer nofollow"
                                                                            className={classNames(
                                                                                `steam_review_summary ${review.summary} hover:underline`,
                                                                                'flex items-baseline gap-1'
                                                                            )}
                                                                        >
                                                                            {
                                                                                review.summary_label
                                                                            }
                                                                            <em className="font-normal not-italic text-[0.65rem] text-slate-600 dark:text-slate-400 tracking-tight">
                                                                                (
                                                                                {review.responsive
                                                                                    .toString()
                                                                                    .replace(
                                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                                        ','
                                                                                    )}

                                                                                )
                                                                            </em>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            );

                                        if (item.name === 'metacritic')
                                            return (
                                                <div key={item.name}>
                                                    <div className="head">
                                                        <div className="key">
                                                            Metacritic
                                                        </div>
                                                        <div className="depth">
                                                            <div className="w-1/4">
                                                                메타스코어
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rows">
                                                        <div>
                                                            <h3 className="key">
                                                                PC
                                                            </h3>
                                                            {item.url ? (
                                                                <a
                                                                    href={
                                                                        item.url
                                                                    }
                                                                    rel="external noopener noreferrer nofollow"
                                                                    target="_blank"
                                                                    className={classNames(
                                                                        'w-8 h-8 leading-8 font-medium',
                                                                        `metacritic_review_summary ${item.summary}`
                                                                    )}
                                                                >
                                                                    {item.score}
                                                                </a>
                                                            ) : (
                                                                <em
                                                                    className={classNames(
                                                                        'w-8 h-8 leading-8 font-medium',
                                                                        `metacritic_review_summary ${item.summary}`
                                                                    )}
                                                                >
                                                                    {item.score}
                                                                </em>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );

                                        return null;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    {detail.hangeul.officials.length +
                        detail.hangeul.users.length >
                        0 && (
                        <div>
                            <h2 className="flex items-center py-2 font-medium text-neutral-900 dark:text-neutral-100">
                                한국어화
                            </h2>
                            <div className="db-table">
                                {detail.hangeul.officials.length > 0 && (
                                    <div>
                                        <div className="head">
                                            <div className="key">공식 지원</div>
                                            <div className="depth">
                                                지원 여부
                                            </div>
                                        </div>
                                        <div className="rows">
                                            {detail.hangeul.officials.map(
                                                (hangeul) => (
                                                    <div key={hangeul.id}>
                                                        <h3 className="key">
                                                            {hangeul.source}
                                                        </h3>
                                                        <div>
                                                            {hangeul.brief}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                                {detail.hangeul.users.length > 0 && (
                                    <div>
                                        <div className="head">
                                            <div className="key">유저 지원</div>
                                            <div className="w-20 text-xs">
                                                지원 여부 / 링크
                                            </div>
                                        </div>
                                        <div className="rows">
                                            {detail.hangeul.users.map(
                                                (hangeul) => (
                                                    <div key={hangeul.id}>
                                                        {hangeul.source && (
                                                            <h3 className="key">
                                                                {hangeul.source}
                                                            </h3>
                                                        )}
                                                        <div className="flex flex-col gap-y-0.5 break-words">
                                                            <div>
                                                                {hangeul.brief ||
                                                                    (hangeul.url && (
                                                                        <a
                                                                            href={
                                                                                hangeul.url
                                                                            }
                                                                            target="_blank"
                                                                            rel="external noopener noreferrer nofollow"
                                                                            className="pointer-events-auto break-all hover:underline text-blue-700 dark:text-blue-400"
                                                                        >
                                                                            {
                                                                                hangeul.url
                                                                            }
                                                                        </a>
                                                                    ))}
                                                            </div>
                                                            {hangeul.guide && (
                                                                <div className="whitespace-pre-wrap bg-black/5 dark:bg-white/10 p-2 rounded overflow-hidden">
                                                                    {
                                                                        hangeul.guide
                                                                    }
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div>
                        <h2 className="flex items-center py-2 font-medium text-neutral-900 dark:text-neutral-100">
                            공식 스토어
                        </h2>
                        <div className="db-table">
                            <div className="head">
                                <div className="key">상점</div>
                                <div className="depth">
                                    <div className="flex ml-auto">
                                        <div className="w-[10rem]">
                                            세일 / 남은시간
                                        </div>
                                        <div className="w-28 text-right">
                                            가격
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rows">
                                {detail.esds.map((price, index) => (
                                    <a
                                        key={price.store + index.toString()}
                                        href={price.url}
                                        target="_blank"
                                        rel="external noopener noreferrer nofollow"
                                    >
                                        <div className="w-24">
                                            {price.store === 'Steam' && (
                                                <i className="flex items-center w-20 h-8">
                                                    <Steam />
                                                </i>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-sm">
                                                {price.store}
                                            </span>
                                            <p className="text-xs text-neutral-400">
                                                마지막 업데이트:&nbsp;
                                                {moment(
                                                    price.last_updated
                                                ).fromNow()}
                                            </p>
                                        </div>
                                        {price.discount && (
                                            <div className="w-[10rem] flex items-baseline gap-x-2 text-sm">
                                                <span className="bg-lime-600/90 dark:bg-lime-700/90 text-white rounded-sm px-1">
                                                    {price.discount_formatted}
                                                </span>
                                                {price.countdown && (
                                                    <div className="text-right font-medium text-lime-600 dark:text-lime-500">
                                                        <CountdownDay
                                                            date={
                                                                price.countdown
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="w-28 flex flex-col items-end">
                                            {price.discount && (
                                                <div className="font-medium text-xs text-neutral-400 line-through">
                                                    {price.initial_formatted}
                                                </div>
                                            )}
                                            <em
                                                className={classNames(
                                                    'text-sm not-italic font-medium',
                                                    {
                                                        'text-red-600 dark:text-red-400':
                                                            price.discount
                                                    }
                                                )}
                                            >
                                                {price.final_formatted}
                                            </em>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
    const appid = Number(context.params?.slug?.[0]);
    const detail = await getGameDetail(appid);

    const props: PageProps = {
        fallback: {
            [getGameDetailKey(appid)]: detail
        }
    };

    return { props };
};
