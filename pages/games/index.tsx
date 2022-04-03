import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { SWRConfig } from 'swr';
import { SWRInfiniteConfiguration } from 'swr/infinite';
import { IoDesktopOutline } from 'react-icons/io5';
import {
    GameList,
    getGameList,
    getGameListKey,
    useGameList
} from '@lib/apps/game';
import Breadcrumb from '@components/Breadcrumb';
import AppList from '@containers/App/List';

function GameListPage() {
    const { ...props } = useGameList();

    return (
        <div className="mt-12 max-w-5xl mx-auto md:px-4">
            <div className="flex flex-col gap-y-1 p-4 md:px-0">
                <div className="flex items-center gap-x-1 text-xs">
                    <Breadcrumb
                        item={[
                            <Link href="/games/">
                                <a className="hover:underline">게임</a>
                            </Link>,
                            <Link href="/games/">
                                <a className="hover:underline">PC 게임</a>
                            </Link>
                        ]}
                    />
                </div>
                <h1 className="flex items-center gap-x-2 font-semibold text-gray-900 dark:text-gray-100">
                    <i>
                        <IoDesktopOutline />
                    </i>
                    PC 게임 목록
                </h1>
            </div>
            <div className="content-item">
                <div className="py-2 px-4 flex flex-col gap-y-2 text-xs">
                    <div className="flex items-center gap-x-4">
                        <h2>정렬</h2>
                        <span className="font-medium bg-black/5 dark:bg-white/20 rounded px-2 py-1 cursor-pointer">
                            스팀 인기제품
                        </span>
                    </div>
                    <div className="border-b border-black/10 dark:border-white/10" />
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-x-2.5 px-2">
                    <AppList {...props} />
                </div>
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
