import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import ImageWithFallback from '@components/ImageWithFallback';
import { AppListItemProps } from '@lib/apps';
import { PriceList, ReviewList } from '@lib/apps/app';

export type Listapp = 'game';

const Reviews = ({ reviews }: { reviews: ReviewList }) => (
    <div className="flex flex-col gap-2">
        {reviews.map((item) => {
            switch (item.name) {
                case 'steam':
                    return (
                        <div key={item.name}>
                            <h3 className="text-xs text-neutral-700 dark:text-neutral-300 leading-5">
                                STEAM
                            </h3>
                            <div className="flex flex-col">
                                {item.reviews.map((review) => (
                                    <a
                                        key={review.name}
                                        href={item.url}
                                        target="_blank"
                                        rel="external noopener noreferrer nofollow"
                                        className={classNames(
                                            `steam_review_summary ${review.summary}`,
                                            'flex items-baseline hover:underline'
                                        )}
                                    >
                                        <h3 className="sr-only">
                                            {review.name}:
                                        </h3>
                                        <span className="flex mr-0.5 font-normal text-xs">
                                            {review.summary_label}
                                        </span>
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
                                ))}
                            </div>
                        </div>
                    );
                case 'metacritic':
                    return (
                        <div key={item.name}>
                            <h3 className="text-xs text-neutral-700 dark:text-neutral-300 leading-5">
                                METACTIRIC
                            </h3>
                            {item.url ? (
                                <a
                                    href={item.url}
                                    rel="external noopener noreferrer nofollow"
                                    target="_blank"
                                    className={classNames(
                                        'w-6 h-6 leading-6 text-xs font-medium',
                                        `metacritic_review_summary ${item.summary}`
                                    )}
                                >
                                    {item.score}
                                </a>
                            ) : (
                                <em
                                    className={classNames(
                                        'w-6 h-6 leading-6 text-xs font-medium',
                                        `metacritic_review_summary ${item.summary}`
                                    )}
                                >
                                    {item.score}
                                </em>
                            )}
                        </div>
                    );
                default:
                    return <div />;
            }
        })}
    </div>
);

const Prices = ({ prices }: { prices: PriceList }) => {
    const oneStore = prices.length === 1;

    if (oneStore) {
        const price = prices[0];

        return (
            <a
                href={price.url}
                rel="external noopener noreferrer nofollow"
                target="_blank"
                className="flex flex-col items-stretch group"
            >
                <div className="flex items-baseline leading-4">
                    <h2 className="text-sm text-neutral-700 dark:text-neutral-300 w-20 truncate flex-none leading-5 group-hover:underline">
                        {price.store}
                    </h2>
                    <div className="flex-1 text-right">
                        {price.discount_formatted ? (
                            <span className="font-medium text-sm text-neutral-400 line-through">
                                {price.initial_formatted}
                            </span>
                        ) : (
                            <em className="not-italic font-medium text-sm text-neutral-800 dark:text-neutral-200 group-hover:underline">
                                {price.final_formatted}
                            </em>
                        )}
                    </div>
                </div>
                {price.discount_formatted && (
                    <div className="flex items-center justify-end gap-2">
                        <div className="flex text-xs bg-red-600/90 text-white px-1 rounded-sm">
                            {price.discount_formatted}
                        </div>
                        <em className="not-italic font-medium text-sm text-red-600 dark:text-red-400 group-hover:underline">
                            {price.final_formatted}
                        </em>
                    </div>
                )}
            </a>
        );
    }

    return <div className="flex flex-col items-center gap-y-0.5" />;
};

const Abouts = ({ listItem }: AppListItemProps) => {
    if (listItem.app === 'game') {
        return (
            <div className="flex justify-between mb-2">
                <div className="flex items-center gap-1">
                    {listItem.esds.map((esd) =>
                        esd.store === 'steam' ? (
                            <a
                                key={esd.store}
                                href={esd.url}
                                target="_blank"
                                rel="external noopener noreferrer nofollow"
                                className="flex w-4 h-4 opacity-80 grayscale hover:opacity-100 hover:grayscale-0"
                            >
                                <i className="flex relative w-full h-full">
                                    <Image
                                        src="/assets/apps/game/steam.ico"
                                        layout="fill"
                                    />
                                </i>
                            </a>
                        ) : (
                            <i />
                        )
                    )}
                </div>
            </div>
        );
    }

    return <div />;
};

const TagItem = React.memo(({ tag }: { tag: string }) => (
    <span className="inline-block after:inline-block after:align-middle after:border-l after:border-black/10 dark:after:border-white/10 after:h-2 after:mx-1.5 last:after:hidden">
        {tag}
    </span>
));

const ListStore = ({ listItem }: AppListItemProps) => {
    let abouts;

    if (listItem.app === 'game') {
        abouts = <Abouts listItem={listItem} />;
    }

    return (
        <div className="flex items-stretch border-b border-b-black/20 dark:border-b-white/20">
            <div className="flex-none py-4">
                <div className="relative h-24 w-48 rounded-sm overflow-hidden">
                    <ImageWithFallback
                        src={listItem.image_header}
                        fallbackSrc={`/assets/apps/${listItem.app}/no_image_header.jpg`}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>
            <div className="min-h-full flex-1 relative">
                {/* 배경 처리 */}
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
                    <div className="absolute w-full h-full">
                        <div className="relative saturate-50 w-full h-full rounded overflow-hidden">
                            {/* <ImageWithFallback
                                src={listItem.image_hero}
                                fallbackSrc={`/assets/apps/${app}/no_image_hero.jpg`}
                                layout="fill"
                                objectFit="cover"
                            /> */}
                        </div>
                    </div>
                    <div className="absolute w-full h-full flex">
                        <div className="p-4 flex-1 flex flex-col bg-gradient-to-r from-white via-white to-white/95 dark:from-dark dark:via-dark dark:to-dark/95" />
                        <div className="w-3/12 py-4 bg-white/95 dark:bg-dark/95" />
                        <div className="w-3/12 py-4 bg-gradient-to-l from-white via-white to-white/95 dark:from-dark dark:via-dark dark:to-dark/95" />
                    </div>
                </div>
                {/* // */}
                <div className="h-full relative flex items-stretch">
                    <div className="p-4 flex-1 flex flex-col">
                        <h2 className="mb-2 flex items-center">
                            <Link
                                href={`/${listItem.app}s/${listItem.appid}/${listItem.slug}`}
                            >
                                <a className="text-sm font-semibold break-all">
                                    {listItem.name}
                                </a>
                            </Link>
                        </h2>
                        {abouts}
                        <div className="w-full leading-normal text-xs text-neutral-600 dark:text-neutral-400">
                            {listItem.tags.map((tag) => (
                                <TagItem key={tag} tag={tag} />
                            ))}
                        </div>
                    </div>
                    <div className="w-3/12 py-4">
                        {listItem.reviews.length > 0 && (
                            <div className="h-full pl-4 border-l border-l-black/10 dark:border-l-white/10">
                                <Reviews reviews={listItem.reviews} />
                            </div>
                        )}
                    </div>
                    <div className="w-3/12 py-4">
                        {listItem.prices.length > 0 && (
                            <div className="h-full pl-4 border-l border-l-black/10 dark:border-l-white/10">
                                <Prices prices={listItem.prices} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(
    ListStore,
    (prevProps, nextProps) =>
        JSON.stringify(prevProps) === JSON.stringify(nextProps)
);
