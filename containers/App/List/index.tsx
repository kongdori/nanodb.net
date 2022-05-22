/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, HTMLProps } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMountedState } from 'react-use';
import { AppID, AppListItemProps } from '@lib/apps';
import { useGameList } from '@lib/apps/game';
import SyncLoader from 'react-spinners/SyncLoader';
import classNames from 'classnames';
import ListCard from './ListCard';

interface ItemsPos extends HTMLProps<HTMLDivElement> {
    style?: { height: string };
}

type ItemsPosType = ItemsPos | undefined;
const itemsPos = new Map<AppID, ItemsPos>();

const ListItem = ({ listItem }: AppListItemProps) => {
    const isMounted = useMountedState();

    const { ref, inView, entry } = useInView({
        // initialInView: true,
        threshold: 0,
        rootMargin: '500px'
    });

    useEffect(() => {
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
                    <ListCard listItem={listItem} />
                </div>
            </div>
        ),
        [wrapProps, listItem]
    );
};

type ListProps = ReturnType<typeof useGameList>;

const List = ({ ...props }: ListProps) => {
    const isMounted = useMountedState();

    const { ref, inView } = useInView({
        rootMargin: '552px',
        threshold: 0
    });

    useEffect(() => {
        if (!isMounted() || props.isLoadingMore) return;

        if (inView) {
            const fetchData = async () => {
                await props.setSize(props.size + 1);
            };

            fetchData().catch(console.error);
        }
    }, [inView]);

    return (
        <>
            {props.data.map((item) => (
                <ListItem key={item.appid} listItem={item} />
            ))}
            {!props.isReachingEnd && (
                <div ref={ref} className="flex-center h-32 col-span-full">
                    <SyncLoader color="#dddddd" size={10} />
                </div>
            )}
            {props.isReachingEnd && (
                <div className="flex-center h-20">
                    <span>더 이상 불러올 항목이 없습니다</span>
                </div>
            )}
        </>
    );
};

export default List;
