import { Navigation, Pagination, Mousewheel, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import ImageWithFallback from '@components/ImageWithFallback';
import { AppDetailProps } from '@lib/apps';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel';

interface ShowcaseProps extends AppDetailProps {
    spaceBetween?: number;
    slidesPerGroup?: number;
    slidesPerView?: number;
    dynamicBullets?: boolean;
}

const Showcase = ({
    detail,
    spaceBetween,
    slidesPerGroup,
    slidesPerView,
    dynamicBullets
}: ShowcaseProps) => (
    <div className="swiper-custom">
        <Swiper
            modules={[Navigation, Pagination, Mousewheel, A11y]}
            {...spaceBetween}
            {...slidesPerGroup}
            {...slidesPerView}
            mousewheel
            navigation={{
                prevEl: '.showcase-swiper-navigation-prev',
                nextEl: '.showcase-swiper-navigation-next'
            }}
            pagination={{
                dynamicBullets,
                clickable: true,
                el: '.showcase-swiper-pagination-screenshots'
            }}
            className="h-44"
        >
            {detail.screenshots.map((item, index) => (
                <SwiperSlide
                    key={item.thumb + index.toString()}
                    className="h-full relative rounded overflow-hidden"
                >
                    <ImageWithFallback
                        src={item.thumb}
                        fallbackSrc={`/assets/apps/${detail.app}/no_image_hero.jpg`}
                        layout="fill"
                        objectFit="cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
        <button
            type="button"
            className="swiper-navigation-screenshots showcase-swiper-navigation-prev h-8 w-8 z-30 absolute top-[calc(50%-1rem)] -left-4"
        >
            <BiChevronLeft />
        </button>
        <button
            type="button"
            className="swiper-navigation-screenshots showcase-swiper-navigation-next h-8 w-8 z-30 absolute top-[calc(50%-1rem)] -right-4"
        >
            <BiChevronRight />
        </button>
        <div className="swiper-pagination-screenshots showcase-swiper-pagination-screenshots" />
    </div>
);

Showcase.defaultProps = {
    spaceBetween: undefined,
    slidesPerGroup: undefined,
    slidesPerView: undefined,
    dynamicBullets: false
};

export default Showcase;
