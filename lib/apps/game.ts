import useSWR from 'swr';
import fetcher from '../fetcher';
import { useAPICursorPage } from '../api';
import { App, AppID, AppDetailBase, AppListItemBase } from './app';

export type PlatformListItem = 'win' | 'mac' | 'linux';
export type PlatformList = PlatformListItem[];

interface HangeulListItem {
    id: number;
    source: string;
    ordered: number;
    is_voice: boolean;
    is_subtitle: boolean;
    is_interface: boolean;
    brief: string;
    url: string;
    guide: string;
    visit_counted: number;
    last_updated: Date;
}

export interface Hangeul {
    officials: HangeulListItem[];
    users: HangeulListItem[];
}

export interface LanguageListItem {
    voice: boolean;
    support: string;
    subtitle: boolean;
    interface: boolean;
}
export type LanguageList = LanguageListItem[];

/*
    Game Detail
*/

export interface GameDetail extends AppDetailBase {
    platforms: PlatformList;
    developers: string[];
    publishers: string[];
    franchises: string[];
    hangeul: Hangeul;
    languages: LanguageList;
}

export const getGameDetailKey = (appid: AppID) => `/games/${appid}`;

export const getGameDetail = (appid: AppID) =>
    fetcher.get<GameDetail>(getGameDetailKey(appid)).then((res) => res.data);

export const useGameDetail = (appid: AppID) =>
    useSWR<GameDetail>(getGameDetailKey(appid), (url: string) =>
        fetcher.get<GameDetail>(url).then((res) => res.data)
    );

/*
    Game List
*/

export interface GameListItem extends AppListItemBase {
    platforms: PlatformList;
    is_hangeuls: boolean;
    is_official_hangeuls: boolean;
    is_user_hangeuls: boolean;
}

export interface GameList extends Array<GameListItem> {}

export const getGameListKey = () => '/games/';

export const getGameList = () =>
    fetcher.get<GameList>(getGameListKey()).then((res) => res.data);

export const useGameList = () =>
    useAPICursorPage<GameListItem>(getGameListKey(), {
        fallbackData: [useSWR<GameList>(getGameListKey()).data]
    });

/*
    Game Hangeuls
*/

export interface GameHangeulListItem {
    app: App;
    appid: AppID;
    name: string;
    slug: string;
    image_header: string;
    hangeul: Hangeul;
}

export interface GameHangeulList extends Array<GameHangeulListItem> {}

export const getGameHangeulListKey = (char: string) =>
    `/game/hangeuls/${encodeURI(char)}/`;

export const getGameHangeulList = (char: string) =>
    fetcher
        .get<GameHangeulList>(getGameHangeulListKey(char))
        .then((res) => res.data);

export const useGameHangeulList = (char: string) =>
    useAPICursorPage<GameHangeulListItem>(getGameHangeulListKey(char), {
        fallbackData: [
            useSWR<GameHangeulList>(getGameHangeulListKey(char)).data
        ]
    });

export interface GameHangeulIndexListItem {
    label: string;
    char: string;
    desc: string;
    official_counted: number;
    user_counted: number;
    counted: number;
}

export interface GameHangeulIndexList extends Array<GameHangeulIndexListItem> {}

export const getGameHangeulIndexListKey = () => '/game/hangeuls-index/';

export const getGameHangeulIndexList = () =>
    fetcher
        .get<GameHangeulIndexList>(getGameHangeulIndexListKey())
        .then((res) => res.data);

export const useGameHangeulIndexList = () =>
    useSWR<GameHangeulIndexList>(getGameHangeulIndexListKey);
