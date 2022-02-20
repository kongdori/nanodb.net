import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { ListItemProps } from '@lib/apps';
import { gamePlatformItem } from '@lib/apps/game';
import { HangeulIcon } from '@containers/Apps/Game/components';

const Abouts = ({ item }: ListItemProps) => (
    <>
        <h2 className="mb-1 flex items-center">
            <Link href={`/game/${item.appid}`}>
                <a className="text-sm font-semibold break-all">
                    {item.hangeuls_supported.length > 0 && (
                        <span className="inline-block leading-4 align-baseline mr-2">
                            {item.hangeuls_supported.map((hangeul) => (
                                <HangeulIcon key={hangeul} hangeul={hangeul} />
                            ))}
                        </span>
                    )}
                    {item.name}
                </a>
            </Link>
        </h2>
        {item.lowest_price && (
            <div className="mb-2 text-xs text-red-600 dark:text-red-400">
                {/* <i className="inline-block text-base align-middle h-5 -ml-0.5 mr-0.5">
                    <FaAngleDown />
                </i> */}
                <strong className="text-base">
                    {item.lowest_price.final_formatted}
                </strong>
                &nbsp;원
            </div>
        )}
        <div className="mb-1.5 flex items-start">
            <div className="h-4 flex items-stretch gap-2">
                {'steam' in item.esds && (
                    <a
                        href={item.esds.steam}
                        target="_blank"
                        rel="noreferrer external"
                        className="inline-block w-4 opacity-80 grayscale hover:opacity-100 hover:grayscale-0"
                    >
                        <i className="inline-block align-top relative w-full h-full">
                            <Image src="/assets/app/steam.ico" layout="fill" />
                        </i>
                    </a>
                )}
            </div>
            {item.platforms.length > 0 && (
                <div className="ml-auto">
                    <ul className="flex items-center gap-1 text-gray-400">
                        {item.platforms.map((platform) => (
                            <li key={platform}>{gamePlatformItem[platform]}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        <div className="w-full leading-normal text-xs text-gray-600 dark:text-gray-400">
            {item.tags.map((tag) => (
                <span
                    key={tag}
                    className="inline-block after:inline-block after:align-middle after:border-l after:border-black/10 dark:after:border-white/10 after:h-2 after:mx-1.5 last:after:hidden"
                >
                    {tag}
                </span>
            ))}
        </div>
    </>
);

const Reviews = ({ item }: ListItemProps) => (
    <>
        {item.reviews.steam?.all.summary_label && (
            <div className="mb-1.5">
                <h3 className="mb-0.5 text-xs text-gray-900 dark:text-gray-300">
                    Steam
                </h3>
                <div className="leading-tight whitespace-nowrap overflow-hidden">
                    <strong
                        className={classNames(
                            'align-top font-normal text-xs',
                            `steam_review_summary ${item.reviews.steam.all.summary}`
                        )}
                    >
                        {item.reviews.steam.all.summary_label}
                    </strong>
                    <em className="align-top font-normal not-italic text-xs text-slate-500 inline-block tracking-tight ml-1">
                        (
                        {item.reviews.steam.all.responsive
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        )
                    </em>
                </div>
            </div>
        )}
        {item.reviews.metacritic && (
            <>
                <h3 className="mb-0.5 text-xs text-gray-900 dark:text-gray-300">
                    Metactiric
                </h3>
                <strong
                    className={classNames(
                        'block w-6 h-6 leading-6 text-center text-xs rounded',
                        `metacritic_review_summary ${item.reviews.metacritic.summary}`
                    )}
                >
                    {item.reviews.metacritic.score}
                </strong>
            </>
        )}
    </>
);

export { Abouts, Reviews };
