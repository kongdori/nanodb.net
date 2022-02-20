import { useGameList } from '@lib/apps/game';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListItem from '@containers/Apps/App/ListItem';
import SyncLoader from 'react-spinners/SyncLoader';

export default function GameList() {
    const { data, size, setSize, mutate } = useGameList();

    return (
        <div className="responsive">
            <div className="max-w-5xl mt-4 mx-auto px-4 shadow bg-white dark:bg-dark">
                <InfiniteScroll
                    dataLength={data ? data.length : 0}
                    next={() => setSize(size + 1)}
                    hasMore
                    loader={
                        <div className="flex items-center justify-center h-40">
                            <SyncLoader color="#dddddd" size={10} />
                        </div>
                    }
                    refreshFunction={mutate}
                >
                    {data?.map((item) => (
                        <ListItem key={item.appid} source="game" item={item} />
                    ))}
                </InfiniteScroll>
            </div>
        </div>
    );
}
