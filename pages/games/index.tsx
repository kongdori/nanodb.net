import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { SWRInfiniteConfiguration } from 'swr/infinite';
import {
    GameList,
    getGameList,
    getGameListKey,
    useGameList
} from '@lib/apps/game';
import AppList from '@containers/App/List';

function GameListPage() {
    const { ...props } = useGameList();

    return (
        <div className="mt-16 max-w-5xl mx-auto content-item">
            <div className="h-2" />
            <div className="py-2 px-4 text-xs flex items-center gap-x-4">
                <h2>정렬</h2>
                <span className="font-medium bg-black/5 rounded px-2 py-1 cursor-pointer">
                    스팀 인기제품
                </span>
            </div>
            <div className="grid grid-cols-2 gap-x-2.5 px-2.5">
                <AppList {...props} />
            </div>
        </div>
    );
}

type PageProps = SWRInfiniteConfiguration<GameList>;

export default function Page({ ...props }: PageProps) {
    return (
        <>
            <Head>
                <title>게임 목록</title>
            </Head>
            <SWRConfig value={props}>
                <GameListPage />
            </SWRConfig>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async () => {
    const list = await getGameList();

    const props: PageProps = {
        fallback: {
            [getGameListKey()]: list
        }
    };

    return { props };
};
