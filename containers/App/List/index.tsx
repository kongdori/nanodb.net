/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { HTMLProps, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import { withRouter, NextRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useMountedState } from 'react-use';
import {
    App,
    AppID,
    AppListItem,
    AppListCursorPageProps,
    AppListItemProps,
    getAppListUrl
} from '@lib/apps';
import SyncLoader from 'react-spinners/SyncLoader';
import classNames from 'classnames';
import { GameDetailPage } from 'pages/games/[...queries]';
import ListCard from './ListCard';

interface ItemsPos extends HTMLProps<HTMLDivElement> {
    style?: { height: string };
}

type ItemsPosType = ItemsPos | undefined;
const itemsPos = new Map<AppID, ItemsPos>();

interface ListItemProps extends AppListItemProps {
    onClick?: (e: MouseEvent<HTMLAnchorElement>, listItem: AppListItem) => void;
}

const ListItem = ({ listItem, onClick }: ListItemProps) => {
    const isMounted = useMountedState();

    const { ref, inView, entry } = useInView({
        // initialInView: true,
        threshold: 0,
        rootMargin: '500px'
    });

    React.useEffect(() => {
        if (isMounted() && inView) {
            itemsPos.delete(listItem.appid);
        }
    }, [inView]);

    let wrapProps: ItemsPosType;
    if (!inView) {
        // 높이 캐시
        wrapProps = itemsPos.get(listItem.appid);

        if (!wrapProps && entry) {
            wrapProps = {
                style: { height: `${entry.target.clientHeight}px` }
            };

            itemsPos.set(listItem.appid, wrapProps);
        }
    }

    return React.useMemo(
        () => (
            <div ref={ref} {...wrapProps}>
                <div className={classNames({ hidden: !!wrapProps })}>
                    <ListCard listItem={listItem} onClick={onClick} />
                </div>
            </div>
        ),
        [wrapProps, listItem]
    );
};

interface ListProps extends AppListCursorPageProps {
    router: NextRouter;
}

const List = ({ cursorPage, router }: ListProps) => {
    const isMounted = useMountedState();

    // popup opener

    const [detail, setDetail] = React.useState<Partial<AppListItem> | null>(
        null
    );
    const [referrer, setReferrer] = React.useState('');

    const openAsPath = (listItem: AppListItem) => {
        setReferrer(router.asPath);

        router.push(
            {},
            getAppListUrl(listItem.app, listItem.appid, listItem.slug),
            { shallow: true }
        );
    };

    const closeAsPath = () => {
        if (router.asPath !== referrer) {
            router.push({}, referrer, { shallow: true });
        } else {
            router.back();
        }
    };

    const portalRef = useDetectClickOutside({
        onTriggered: () => {
            closeAsPath();
        }
    });

    const portalRender = () => {
        if (!detail) return null;

        switch (detail.app) {
            case 'game':
                return <GameDetailPage appid={detail.appid} />;

            default:
                return null;
        }
    };

    // observer

    const { ref, inView } = useInView({
        rootMargin: '552px',
        threshold: 0
    });

    React.useEffect(() => {
        if (!isMounted()) return undefined;

        if (!cursorPage.isLoadingMore && inView) {
            const fetchData = async () => {
                await cursorPage.setSize(cursorPage.size + 1);
            };

            fetchData().catch(console.error);
        }

        const handleBeforeChange = (url: string) => {
            const matches = url.match(
                /^\/(?<app>\w+)s\/(?<appid>\d+)\/(?<slug>.*)/u
            );

            if (matches && matches.groups) {
                setDetail({
                    app: matches.groups.app as App,
                    appid: Number(matches.groups.appid),
                    slug: matches.groups.slug
                });
                document.body.style.overflow = 'hidden';
            } else {
                setDetail(null);
                document.body.style.overflow = '';
            }
        };

        router.events.on('beforeHistoryChange', handleBeforeChange);

        return () => {
            router.events.off('beforeHistoryChange', handleBeforeChange);
        };
    }, [inView, detail]);

    return (
        <>
            {cursorPage.data.map((item) => (
                <ListItem
                    key={item.appid}
                    listItem={item}
                    onClick={(e, listItem) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openAsPath(listItem);
                    }}
                />
            ))}
            {!cursorPage.isReachingEnd && (
                <div ref={ref} className="flex-center h-32 col-span-full">
                    <SyncLoader color="#dddddd" size={10} />
                </div>
            )}
            {cursorPage.isReachingEnd && (
                <div className="flex-center h-20">
                    <span>더 이상 불러올 항목이 없습니다</span>
                </div>
            )}
            {detail &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 overflow-y-auto z-30">
                        <div
                            ref={portalRef}
                            className="relative z-40 max-w-6xl mx-auto shadow-xl dark:shadow-black/60 overflow-hidden"
                        >
                            <div className="w-full flex items-center justify-between absolute top-16 px-6 z-50 font-medium text-white">
                                <div className="text-sm">
                                    닫기: ESC, 뒤로가기
                                    <span className="hidden xl:inline">
                                        , 화면 밖 클릭
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => closeAsPath()}
                                    className="ml-auto"
                                >
                                    close
                                </button>
                            </div>
                            <div>{portalRender()}</div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default withRouter(List);
