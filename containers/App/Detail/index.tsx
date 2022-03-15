import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SWRResponse } from 'swr';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { BiCopyAlt } from 'react-icons/bi';
import { HiChevronRight } from 'react-icons/hi';
import classNames from 'classnames';
import ImageWithFallback from '@components/ImageWithFallback';
import { APIError } from '@lib/api';
import { AppDetailProps, AppDetail } from '@lib/apps';
import Showcase from './Showcase';

const appName = {
    game: '게임'
};

const AppInfo = ({ detail }: AppDetailProps) => {
    let components = (
        <div>
            <h2 className="mb-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                장르
            </h2>
            <div className="overflow-hidden text-sm text-neutral-800 dark:text-neutral-200">
                {detail.genres.join(', ')}
            </div>
        </div>
    );

    switch (detail.app) {
        case 'game':
            components = (
                <>
                    {components}
                    {detail.developers.length > 0 && (
                        <div>
                            <h2 className="mb-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                                개발사
                            </h2>
                            <div className="overflow-hidden text-sm text-neutral-800 dark:text-neutral-200">
                                {detail.developers.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                    {detail.publishers.length > 0 && (
                        <div>
                            <h2 className="mb-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                                배급사
                            </h2>
                            <div className="overflow-hidden text-sm text-neutral-800 dark:text-neutral-200">
                                {detail.publishers.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                    {detail.franchises.length > 0 && (
                        <div>
                            <h2 className="mb-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                                프렌차이즈
                            </h2>
                            <div className="overflow-hidden text-sm text-neutral-800 dark:text-neutral-200">
                                {detail.franchises.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            );

        // no default
    }

    return components;
};

interface DetailProps {
    swr: SWRResponse<AppDetail, APIError>;
    headerShowcase?: boolean;
    children?: React.ReactNode;
}

const Detail = ({ swr, headerShowcase, children }: DetailProps) => {
    const router = useRouter();

    const { data } = swr;
    const detail = data;

    const appUrl = detail
        ? `/${detail.app}s/${detail.appid}/${detail.slug}/`
        : '';
    const [fullAppUrl, setFullAppUrl] = useState('');

    useEffect(() => {
        if (!fullAppUrl && appUrl) {
            setFullAppUrl(window.location.origin + appUrl);
        }
    }, [fullAppUrl, appUrl]);

    return (
        <>
            {detail && (
                <Head>
                    <title>
                        {detail.name} : {appName[detail.app]}
                    </title>
                </Head>
            )}
            <div className="relative bg-white dark:bg-dark min-h-screen">
                <div
                    className={classNames(
                        'relative w-full saturate-50',
                        router.pathname === '/games/[...slug]' ? 'h-36' : 'h-24'
                    )}
                >
                    {detail && (
                        <ImageWithFallback
                            src={detail.image_hero}
                            fallbackSrc={`/assets/apps/${detail.app}/no_image_hero.jpg`}
                            layout="fill"
                            objectFit="cover"
                        />
                    )}
                </div>
                <div className="max-w-6xl mx-auto relative z-16 pt-4 flex items-start bg-white dark:bg-dark rounded">
                    <div className="flex-1">
                        {detail && (
                            <div className="px-4 mb-4">
                                <div className="flex font-medium items-center gap-1 mb-1 text-sm">
                                    <Link href={`/${detail.app}s/`}>
                                        <a className="hover:underline">
                                            {appName[detail.app]}
                                        </a>
                                    </Link>
                                    <HiChevronRight className="text-neutral-500 dark:text-neutral-400 text-lg" />
                                    <Link href={appUrl}>
                                        <a className="hover:underline">
                                            {detail.name}
                                        </a>
                                    </Link>
                                </div>
                                <div className="flex truncate">
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
                                            className="truncate text-xs text-neutral-400 hover:underline"
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <i className="inline-block w-5 h-5 align-middle text-base">
                                                <BiCopyAlt />
                                            </i>
                                            <span>{appUrl}</span>
                                        </a>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        )}
                        <div className="px-4">{children}</div>
                    </div>
                    <div className="flex-none max-w-[22rem] px-6">
                        <h1 className="font-semibold text-lg leading-tight pb-4">
                            {detail && detail.name}
                        </h1>
                        <div className="flex flex-col gap-3 pb-4">
                            <div className="relative w-full h-36 z-20 rounded overflow-hidden">
                                {detail && (
                                    <>
                                        <ImageWithFallback
                                            src={detail.image_header}
                                            fallbackSrc={`/assets/apps/${detail.app}/no_image_header.png`}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <span className="sr-only">
                                            {detail.name} Header Image
                                        </span>
                                    </>
                                )}
                            </div>
                            {detail &&
                                detail.screenshots.length > 0 &&
                                headerShowcase && (
                                    <Showcase detail={detail} dynamicBullets />
                                )}
                        </div>
                        <p className="text-sm text-neutral-900 break-words dark:text-neutral-300">
                            {detail && detail.snippet}
                        </p>
                        <div className="py-4 w-full flex flex-col gap-3">
                            {detail && <AppInfo detail={detail} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

Detail.defaultProps = {
    headerShowcase: false,
    children: null
};

export { Detail };
export { default as Showcase } from './Showcase';
