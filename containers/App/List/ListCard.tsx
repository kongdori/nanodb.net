import { AppListItemProps } from '@lib/apps';
import classNames from 'classnames';
import Dialog from '@containers/App/Detail/Dialog';
import ImageWithFallback from '@components/ImageWithFallback';
import CountdownDay from '@components/CountdownDay';

const ListCard = ({ listItem }: AppListItemProps) => (
    <div className="py-1.5 relative">
        <div className="h-[5.5rem] relative rounded hover:bg-gray-100 dark:hover:bg-white/10">
            <Dialog
                app={listItem.app}
                appid={listItem.appid}
                slug={listItem.slug}
                className="absolute inset-0 p-1.5 pointer-events-auto"
            >
                <div className="relative h-full w-[8.5rem] rounded overflow-hidden">
                    <ImageWithFallback
                        src={listItem.image_header}
                        fallbackSrc={`/assets/apps/${listItem.app}/no_image_header.jpg`}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </Dialog>
            <div className="h-full py-1.5 pl-[9.5rem] pr-1.5 flex-1 flex flex-col overflow-hidden">
                <h1 className="flex gap-4 font-semibold text-sm leading-tight mb-2">
                    <span className="truncate">{listItem.name}</span>
                    {listItem.app === 'game' && listItem.is_hangeuls && (
                        <div className="ml-auto flex-none">
                            <span
                                className={classNames(
                                    'flex items-center text-[0.65rem] px-1.5 leading-4 font-medium rounded-full border-2',
                                    listItem.is_official_hangeuls
                                        ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                        : 'text-amber-600 border-amber-600'
                                )}
                            >
                                한국어
                            </span>
                        </div>
                    )}
                </h1>
                <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400 truncate">
                    {listItem.genres.map((item) => (
                        <span key={item} className="inline-block text-xs mr-2">
                            {item}
                        </span>
                    ))}
                </div>
                {listItem.prices.length > 0 && (
                    <div className="mt-auto w-full flex items-center text-xs">
                        {listItem.prices[0].discount && (
                            <div className="flex items-baseline gap-2 mr-3 font-medium">
                                <span className="bg-red-600/90 text-white leading-[1.1rem] rounded-sm px-1">
                                    {listItem.prices[0].discount_formatted}
                                </span>
                                {listItem.prices[0].countdown && (
                                    <span className="text-orange-600">
                                        <CountdownDay
                                            date={listItem.prices[0].countdown}
                                        />
                                    </span>
                                )}
                            </div>
                        )}
                        <div className="ml-auto flex items-baseline gap-2 font-medium">
                            {listItem.prices[0].discount && (
                                <span className="text-neutral-400 line-through">
                                    {listItem.prices[0].initial_formatted}
                                </span>
                            )}
                            <em
                                className={classNames('not-italic text-sm', {
                                    'text-red-600 dark:text-red-500':
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
        <div className="absolute bottom-0 left-1.5 right-1.5 border-b border-b-black/20 dark:border-b-white/20" />
    </div>
);

export default ListCard;
