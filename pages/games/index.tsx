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
        <div className="mt-16 max-w-5xl mx-auto content-item px-2.5">
            <div className="grid grid-cols-2 gap-x-2.5">
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
