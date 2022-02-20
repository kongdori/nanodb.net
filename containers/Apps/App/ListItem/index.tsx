import React from 'react';
import classNames from 'classnames';
import ImageWithFallback from '@components/ImageWithFallback';
import { ListItemProps } from '@lib/apps';
import * as Game from './Game';

const Prices = ({ item }: ListItemProps) => (
    <>
        {item.prices.map((item2, i) => {
            const store = Object.keys(item2)[0];
            const price = Object.values(item2)[0];
            let priceClasses = 'text-slate-800 dark:text-slate-100';

            if (item.prices.length > 1) {
                if (i === 0) {
                    priceClasses = 'text-orange-600 dark:text-orange-500';
                } else {
                    priceClasses = 'text-slate-600 dark:text-slate-400';
                }
            } else if (price.discount_formatted) {
                priceClasses = 'text-red-500 dark:text-red-400';
            }

            return (
                <div
                    key={store + i.toString()}
                    className="w-full flex items-center"
                >
                    <div className="w-16 pr-2 truncate text-left">
                        <span className="text-xs text-gray-900 dark:text-gray-300 tracking-tight">
                            {store}
                        </span>
                    </div>
                    <div className="flex-1 text-right">
                        {item.prices.length === 1 && price.discount_formatted && (
                            <div className="leading-3 pt-1">
                                <span className="align-bottom text-xs bg-red-600/90 text-white px-1 tracking-tight rounded-sm">
                                    {price.discount_formatted}
                                </span>
                            </div>
                        )}
                        <div className="leading-4">
                            <span
                                className={classNames(
                                    'align-top font-normal text-xs',
                                    priceClasses
                                )}
                            >
                                <a
                                    href={price.url}
                                    target="_blank"
                                    rel="external noreferrer noopener"
                                    className="text-sm not-italic hover:underline"
                                >
                                    {price.final_formatted}
                                </a>
                                &nbsp;원
                            </span>
                        </div>
                    </div>
                </div>
            );
        })}
    </>
);

interface ListSourceItemProps extends ListItemProps {
    source: 'game';
}

const ListItem = ({ source, item }: ListSourceItemProps) => {
    let aboutsComponent;
    let reviewsComponent;

    if (source === 'game') {
        aboutsComponent = <Game.Abouts item={item} />;
        reviewsComponent = <Game.Reviews item={item} />;
    }

    return (
        <div className="flex items-stretch border-b border-b-black/20 dark:border-b-white/20">
            <div className="flex-none py-4">
                <div className="block relative h-24 w-48 rounded-sm overflow-hidden">
                    <ImageWithFallback
                        src={item.image_header}
                        fallbackSrc={`/assets/apps/${source}/no_image_header.jpg`}
                        layout="fill"
                        objectFit="cover"
                        priority
                    />
                </div>
            </div>
            <div className="min-h-full flex-1 relative">
                <div className="absolute top-0 bottom-0 left-0 right-0 w-full h-full">
                    <div className="relative saturate-50 w-full h-full rounded overflow-hidden">
                        <ImageWithFallback
                            src={item.image_hero}
                            fallbackSrc={`/assets/apps/${source}/no_image_hero.jpg`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="h-full relative flex items-stretch">
                    <div className="w-6/12 py-4 pl-4 flex flex-col bg-gradient-to-r from-white via-white to-white/90 dark:from-dark dark:via-dark dark:to-dark/90">
                        {aboutsComponent}
                    </div>
                    <div className="w-3/12 py-4 flex flex-col pl-4 bg-white/90 dark:bg-dark/90">
                        <div className="h-full pl-4 border-l border-l-black/10 dark:border-l-white/10">
                            {reviewsComponent}
                        </div>
                    </div>
                    <div className="w-3/12 py-4 bg-gradient-to-l from-white via-white to-white/90 dark:from-dark dark:via-dark dark:to-dark/90">
                        <div className="h-full pl-4 border-l border-l-black/10 dark:border-l-white/10 flex flex-col items-center gap-y-0.5">
                            {item.prices && <Prices item={item} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const areEqualListItem = (prevProps: ListItemProps, nextProps: ListItemProps) =>
    prevProps.item.appid === nextProps.item.appid;

export default React.memo(ListItem, areEqualListItem);
