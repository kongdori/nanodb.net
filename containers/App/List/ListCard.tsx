import { AppListItemProps } from '@lib/apps';
import classNames from 'classnames';
import ImageWithFallback from '@components/ImageWithFallback';
import CountdownDay from '@components/CountdownDay';
import DetailPopup from './DetailPopup';

const ListCard = ({ listItem }: AppListItemProps) => (
    <div>
        <div className="p-2 relative rounded lg:hover:bg-black/5 dark:lg:hover:bg-black/30">
            <DetailPopup
                app={listItem.app}
                appid={listItem.appid}
                slug={listItem.slug}
                className="absolute inset-0 p-2 pointer-events-auto"
            >
                <div className="relative">
                    <div className="relative w-28 h-16 sm:h-20 sm:w-32 rounded overflow-hidden bg-slate-400/20">
                        <ImageWithFallback
                            src={listItem.image_header}
                            fallbackSrc="/assets/apps/no_image_header.png"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    {listItem.app === 'game' && listItem.is_hangeuls && (
                        <div
                            className={classNames(
                                'absolute bottom-1 -left-1 flex items-center text-[0.65rem] px-1 text-white rounded-sm shadow',
                                listItem.is_official_hangeuls
                                    ? 'bg-blue-600/95 dark:bg-blue-700/95'
                                    : 'bg-amber-600/95 dark:bg-amber-700/95'
                            )}
                        >
                            {listItem.is_official_hangeuls ? '공식 ' : '유저 '}
                            한국어
                        </div>
                    )}
                </div>
            </DetailPopup>
            <div className="min-h-[4rem] sm:min-h-[5rem] flex flex-col sm:overflow-hidden">
                <div
                    className={classNames('pl-[7.8rem] sm:pl-[8.8rem]', {
                        'min-h-[4rem] sm:min-h-0':
                            listItem.prices.length > 0 &&
                            listItem.prices[0].discount
                    })}
                >
                    <h1 className="font-medium text-sm leading-tight mb-2 break-all sm:truncate dark:text-gray-200">
                        {listItem.name}
                    </h1>
                    <div className="flex gap-x-2 flex-wrap text-xs text-gray-700 dark:text-gray-400 sm:truncate">
                        {listItem.genres.map((item) => (
                            <span key={item}>{item}</span>
                        ))}
                    </div>
                </div>
                {listItem.prices.length > 0 && (
                    <div className="pt-1 sm:pt-0 sm:pl-[8.8rem] mt-auto w-full flex items-center text-sm">
                        {listItem.prices[0].discount && (
                            <div className="flex items-baseline gap-x-2 text-xs">
                                <span className="bg-lime-600/90 dark:bg-lime-700/90 text-white leading-[1.1rem] rounded-sm px-1">
                                    {listItem.prices[0].discount_formatted}
                                </span>
                                {listItem.prices[0].countdown && (
                                    <span className="text-lime-600 dark:text-lime-500 font-medium">
                                        <CountdownDay
                                            date={listItem.prices[0].countdown}
                                        />
                                    </span>
                                )}
                            </div>
                        )}
                        <div className="ml-auto flex items-baseline gap-x-2 font-medium tracking-tight">
                            {listItem.prices[0].discount && (
                                <span className="text-neutral-400 line-through text-xs">
                                    {listItem.prices[0].initial_formatted}
                                </span>
                            )}
                            <em
                                className={classNames('not-italic', {
                                    'text-red-600 dark:text-red-400':
                                        listItem.prices[0].discount
                                })}
                            >
                                {listItem.prices[0].final_formatted}
                            </em>
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="mt-1 mx-2 pb-1 border-t border-t-black/10 dark:border-t-white/10" />
    </div>
);

export default ListCard;
