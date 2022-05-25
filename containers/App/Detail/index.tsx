import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiLink, BiLinkExternal } from 'react-icons/bi';
import classNames from 'classnames';
import { AppDetail } from '@lib/apps';
import ImageWithFallback from '@components/ImageWithFallback';
import Breadcrumb from '@components/Breadcrumb';
import Showcase from './Showcase';

const appName = {
    game: '게임'
};

const Reviews = React.memo(
    ({ detail }: { detail: AppDetail }) => (
        <>
            {detail.reviews.steam && (
                <div>
                    <h3 className="flex items-center space-x-1 mb-2 text-sm font-medium">
                        <Image
                            src="/logos/steam/icon.png"
                            width="20"
                            height="20"
                        />
                        <span>Steam</span>
                    </h3>
                    <div className="flex flex-1 gap-x-2">
                        {detail.reviews.steam.map((review) => (
                            <div key={review.name} className="w-1/2">
                                <h4 className="mb-1 font-medium">
                                    {review.name}
                                </h4>
                                <div className="flex items-center">
                                    <a
                                        href={review.url}
                                        target="_blank"
                                        rel="external noopener noreferrer nofollow"
                                        className={classNames(
                                            `steam_review_summary ${review.summary} hover:underline`,
                                            'flex flex-wrap items-baseline gap-x-1'
                                        )}
                                    >
                                        {review.summary_label}
                                        <em className="not-italic text-[0.65rem] text-neutral-600 dark:text-neutral-400 tracking-tight">
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
                        ))}
                    </div>
                </div>
            )}
            {detail.reviews.metacritic && (
                <div>
                    <h3 className="flex items-center space-x-1 mb-2 text-sm font-medium">
                        <Image
                            src="/logos/metacritic/icon.svg"
                            width="20"
                            height="20"
                        />
                        <span>Metacritic</span>
                    </h3>
                    <div>
                        <div className="flex items-center gap-x-2 mb-1 font-medium whitespace-nowrap">
                            <div className="flex w-1/2">메타스코어</div>
                            <div className="w-1/2">유저 평점</div>
                        </div>
                        {detail.reviews.metacritic.map((review) => (
                            <div key={review.platform}>
                                <div className="mb-1 border-black/10 dark:border-white/10">
                                    {review.platform}
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-1 gap-x-2">
                                        {review.reviews.map((review2) => (
                                            <div
                                                key={review2.name}
                                                className="flex items-center w-1/2"
                                            >
                                                {review2.url ? (
                                                    <a
                                                        href={review2.url}
                                                        rel="external noopener noreferrer nofollow"
                                                        target="_blank"
                                                        className={classNames(
                                                            'inline-block px-1.5 text-base rounded',
                                                            `metacritic_review_summary ${review2.summary}`
                                                        )}
                                                    >
                                                        <span>
                                                            {review2.score}
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <em
                                                        className={classNames(
                                                            'px-2 text-sm rounded',
                                                            `metacritic_review_summary ${review2.summary}`
                                                        )}
                                                    >
                                                        {review2.score}
                                                    </em>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    ),
    (prevProps, nextProps) =>
        JSON.stringify(prevProps.detail.reviews) ===
        JSON.stringify(nextProps.detail.reviews)
);

interface DetailProps {
    detail?: AppDetail;
    children?: React.ReactNode;
}

const Detail = ({ detail, children }: DetailProps) => {
    const router = useRouter();

    const appUrl = detail
        ? `/${detail.app}s/${detail.appid}/${detail.slug}/`
        : '';
    const [fullAppUrl, setFullAppUrl] = useState('');

    useEffect(() => {
        if (!fullAppUrl && appUrl) {
            setFullAppUrl(window.location.origin + appUrl);
        }
    }, [fullAppUrl, appUrl]);

    const isPopup = router.pathname !== '/games/[...queries]';

    return (
        <>
            {detail && (
                <Head>
                    <title>
                        {detail.name} : {appName[detail.app]}
                    </title>
                </Head>
            )}
            <div
                className={classNames(
                    'relative bg-white dark:bg-dark min-h-screen',
                    {
                        'pt-12': isPopup
                    }
                )}
            >
                {/* 배경 이미지 */}
                <div
                    className={classNames(
                        'relative w-full saturate-50',
                        isPopup ? 'sm:h-28' : 'h-12 sm:h-40'
                    )}
                >
                    <div className="w-full h-full bg-slate-400/20 animate-pulse -z-10" />
                    {detail && (
                        <ImageWithFallback
                            src={detail.image_hero}
                            fallbackSrc={`/assets/apps/${detail.app}/no_image_hero.jpg`}
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </div>
                <div className="max-w-6xl mx-auto sm:pl-6 sm:pr-4 relative">
                    <div className="lg:flex items-stretch">
                        {/* 메인 */}
                        <div className="lg:flex-1 sm:py-6">
                            {/* 대표 설명 */}
                            <div className="relative flex flex-col sm:flex-row mb-4 gap-y-2 gap-x-4">
                                <div className="w-full sm:w-40 md:w-52">
                                    {/* 대표 이미지 */}
                                    <div
                                        className={classNames(
                                            'relative w-full h-48 sm:h-24 md:h-32',
                                            {
                                                'animate-pulse': !detail
                                            }
                                        )}
                                    >
                                        <div className="relative w-full h-full sm:rounded overflow-hidden bg-slate-400/20">
                                            {detail && (
                                                <ImageWithFallback
                                                    src={detail.image_header}
                                                    fallbackSrc="/assets/apps/no_image_header.png"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            )}
                                        </div>
                                        {detail &&
                                            detail.app === 'game' &&
                                            detail.is_hangeuls && (
                                                <div className="absolute bottom-2 sm:bottom-1 left-4 sm:-left-1.5">
                                                    <span
                                                        className={classNames(
                                                            'flex items-center text-xs py-0.5 px-1.5 text-white rounded-sm shadow',
                                                            detail.is_official_hangeuls
                                                                ? 'bg-blue-600/95 dark:bg-blue-700/95'
                                                                : 'bg-amber-600/95 dark:bg-amber-700/95'
                                                        )}
                                                    >
                                                        {detail.is_official_hangeuls
                                                            ? '공식 '
                                                            : '유저 '}
                                                        한국어
                                                    </span>
                                                </div>
                                            )}
                                    </div>
                                    {/* 관련 링크 */}
                                    {detail && (
                                        <div className="flex gap-x-2 mt-3 px-4 sm:px-0 text-xs">
                                            <CopyToClipboard
                                                text={fullAppUrl}
                                                onCopy={() => {
                                                    alert(
                                                        `주소가 복사 되었습니다\r\n${fullAppUrl}`
                                                    );
                                                }}
                                            >
                                                <a
                                                    href={appUrl}
                                                    className="flex py-1 pl-1.5 pr-2.5 rounded space-x-1 bg-slate-400/20 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-400/40"
                                                    onClick={(e) =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <i className="flex-center text-sm">
                                                        <BiLink />
                                                    </i>
                                                    <span className="truncate">
                                                        링크 복사
                                                    </span>
                                                </a>
                                            </CopyToClipboard>
                                            {detail.links.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="external noopener noreferrer nofollow"
                                                    className="flex py-1 px-2 rounded space-x-1 bg-slate-400/20 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-400/40"
                                                >
                                                    <i className="flex-center text-sm">
                                                        <BiLinkExternal />
                                                    </i>
                                                    <span className="truncate">
                                                        {item.name}
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div
                                    className={classNames(
                                        'flex-1 px-4 sm:px-0',
                                        {
                                            'animate-pulse': !detail
                                        }
                                    )}
                                >
                                    {/* 제목 */}
                                    <h1
                                        className={classNames(
                                            'font-semibold text-lg text-slate-900 dark:text-slate-50',
                                            {
                                                'w-52 h-5 mb-2 bg-slate-400/20 rounded':
                                                    !detail
                                            }
                                        )}
                                    >
                                        {detail && detail.name}
                                    </h1>
                                    {/* 이동 경로 */}
                                    <div
                                        className={classNames(
                                            'flex items-center text-xs text-slate-500 dark:text-slate-400',
                                            {
                                                'w-40 h-4 bg-slate-400/20 rounded':
                                                    !detail
                                            }
                                        )}
                                    >
                                        {detail && (
                                            <Breadcrumb
                                                item={[
                                                    <Link
                                                        href={`/${detail.app}s/`}
                                                    >
                                                        <a className="hover:underline">
                                                            {
                                                                appName[
                                                                    detail.app
                                                                ]
                                                            }
                                                        </a>
                                                    </Link>,
                                                    <Link href={appUrl}>
                                                        <a className="hover:underline">
                                                            {detail.name}
                                                        </a>
                                                    </Link>
                                                ]}
                                            />
                                        )}
                                    </div>
                                    {/* 상세내용 */}
                                    {detail && (
                                        <>
                                            <div className="text-sm py-2">
                                                {detail.snippet}
                                            </div>
                                            <div className="flex flex-col gap-y-0.5">
                                                {detail.developers.length >
                                                    0 && (
                                                    <div className="flex gap-x-2 text-xs">
                                                        <h2 className="flex-none">
                                                            개발사:
                                                        </h2>
                                                        <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                                            {detail.developers.map(
                                                                (item) => (
                                                                    <div
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {detail.publishers.length >
                                                    0 && (
                                                    <div className="flex gap-x-2 text-xs">
                                                        <h2 className="flex-none">
                                                            배급사:
                                                        </h2>
                                                        <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                                            {detail.publishers.map(
                                                                (item) => (
                                                                    <div
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {detail.franchises.length >
                                                    0 && (
                                                    <div className="flex gap-x-2 text-xs">
                                                        <h2 className="flex-none">
                                                            프렌차이즈:
                                                        </h2>
                                                        <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                                            {detail.franchises.map(
                                                                (item) => (
                                                                    <div
                                                                        key={
                                                                            item
                                                                        }
                                                                    >
                                                                        {item}
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </>
                                    )}
                                    {/* {detail && (
                                        <div className="flex mt-2 gap-x-2 flex-wrap text-sm text-gray-700 dark:text-gray-400">
                                            {detail.tags.join(', ')}
                                        </div>
                                    )} */}
                                </div>
                            </div>
                            {/* 상세 설명 */}
                            <div className="px-4 sm:px-0">
                                {/* 스크린샷 - 모바일 */}
                                {detail && detail.screenshots.length > 0 && (
                                    <div className="lg:hidden mb-4">
                                        <Showcase
                                            detail={detail}
                                            swiperId={2}
                                            isMobile
                                            options={{
                                                spaceBetween: 2,
                                                slidesPerView: 3,
                                                freeMode: true,
                                                breakpoints: {
                                                    500: {
                                                        spaceBetween: 4,
                                                        slidesPerView: 4
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                )}
                                {/* 평가 - 모바일 */}
                                {detail &&
                                    Object.keys(detail.reviews).length > 0 && (
                                        <div className="lg:hidden mb-4 md:mb-6 lg:mb-8">
                                            <h2 className="flex items-center mb-1 font-medium dark:text-gray-300">
                                                평가
                                            </h2>
                                            <div className="w-full space-y-4 text-xs">
                                                <Reviews detail={detail} />
                                            </div>
                                        </div>
                                    )}
                                {/* 개별 내용 */}
                                {children}
                            </div>
                        </div>
                        <div className="hidden lg:block pl-6 my-6 mr-4 border-r border-black/10 dark:border-white/10" />
                        {/* 데스크탑 사이드 */}
                        <div
                            className={classNames(
                                'w-80 py-6 px-2 hidden lg:flex flex-col space-y-4',
                                {
                                    'animate-pulse': !detail
                                }
                            )}
                        >
                            {/* 스크린샷 */}
                            {detail ? (
                                detail.screenshots.length > 0 && (
                                    <Showcase
                                        detail={detail}
                                        swiperId={1}
                                        options={{
                                            mousewheel: true
                                        }}
                                    />
                                )
                            ) : (
                                <div className="h-40 lg:h-48 bg-slate-400/20" />
                            )}
                            {/* 평가 */}
                            {detail && Object.keys(detail.reviews).length > 0 && (
                                <div className="w-full space-y-4 text-xs">
                                    <Reviews detail={detail} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Detail.defaultProps = {
    detail: null,
    children: null
};

export { Detail, Showcase };
