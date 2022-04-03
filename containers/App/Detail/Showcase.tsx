import React from 'react';
import {
    Navigation,
    Pagination,
    FreeMode,
    Mousewheel,
    A11y,
    SwiperOptions
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import ImageWithFallback from '@components/ImageWithFallback';
import { AppDetailProps } from '@lib/apps';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';
import classNames from 'classnames';

interface ShowcaseProps extends AppDetailProps {
    swiperId: number;
    isMobile?: boolean;
    options?: SwiperOptions;
}

const Showcase = ({ detail, swiperId, isMobile, options }: ShowcaseProps) => (
    <div
        className={classNames('swiper-custom group', {
            'pb-6': !isMobile
        })}
    >
        <Swiper
            modules={[Navigation, Pagination, FreeMode, Mousewheel, A11y]}
            // spaceBetween={spaceBetween}
            // slidesPerGroup={slidesPerGroup}
            // slidesPerView={slidesPerView}
            // mousewheel={!isMobile}
            // freeMode={isMobile}
            {...options}
            navigation={{
                prevEl: `.showcase-swiper-navigation-prev${swiperId}`,
                nextEl: `.showcase-swiper-navigation-next${swiperId}`
            }}
            pagination={{
                dynamicBullets: true,
                clickable: true,
                el: `.showcase-swiper-pagination-screenshots${swiperId}`
            }}
            className={classNames(
                'rounded overflow-hidden',
                isMobile ? 'h-20 sm:h-24 md:h-32' : 'h-40 lg:h-48'
            )}
        >
            {detail.screenshots.map((item, index) => (
                <SwiperSlide
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.thumb}${index}`}
                >
                    <div className="h-full relative rounded overflow-hidden">
                        <ImageWithFallback
                            src={item.thumb}
                            fallbackSrc={`/assets/apps/${detail.app}/no_image_hero.jpg`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        <button
            type="button"
            className={classNames(
                'bg-white dark:bg-dark rounded-full items-center justify-center text-lg text-black dark:text-white shadow-lg shadow-black/20 dark:shadow-black/60 h-7 w-7 z-30 absolute top-[calc(50%-1rem)] -left-3.5',
                `showcase-swiper-navigation-prev${swiperId}`,
                isMobile ? 'hidden group-hover:flex' : 'flex'
            )}
        >
            <BiChevronLeft />
        </button>
        <button
            type="button"
            className={classNames(
                'bg-white dark:bg-dark rounded-full items-center justify-center text-lg text-black dark:text-white shadow-lg shadow-black/20 dark:shadow-black/60 h-7 w-7 z-30 absolute top-[calc(50%-1rem)] -right-3.5',
                `showcase-swiper-navigation-next${swiperId}`,
                isMobile ? 'hidden group-hover:flex' : 'flex'
            )}
        >
            <BiChevronRight />
        </button>
        {!isMobile && (
            <div
                className={classNames(
                    'swiper-pagination-screenshots',
                    {
                        bullets: !isMobile
                    },
                    `showcase-swiper-pagination-screenshots${swiperId}`
                )}
            />
        )}
    </div>
);

Showcase.defaultProps = {
    isMobile: false,
    options: undefined
};

export default React.memo(
    Showcase,
    (prevProps, nextProps) =>
        JSON.stringify(prevProps.detail.reviews) ===
        JSON.stringify(nextProps.detail.reviews)
);
