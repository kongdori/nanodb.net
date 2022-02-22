import useSWR from 'swr';
import fetcher from '../fetcher';
import { AppID, AppListItem } from './app';
import { useCursorPage, APIResponseCursorPage } from '../api';

export type EsdsItem = {
    store: string;
    url: string;
};

export type Esds = Array<EsdsItem>;

export type GamePlatformsItem = 'win' | 'mac' | 'linux';
export type GamePlatforms = Array<GamePlatformsItem>;

export type HangeulsSupportedItem = '공식' | '유저';
export type HangeulsSupported = Array<HangeulsSupportedItem>;

interface GameData {
    esds: Esds;
    platforms: GamePlatforms;
    hangeuls_supported: HangeulsSupported;
    is_free: boolean;
}

/*
    Game List
*/

export interface GameListItem extends AppListItem, GameData {}

const getGameListKey = (
    index: number,
    previousPageData: APIResponseCursorPage<GameListItem>
) => {
    if (index === 0) return '/games/';
    if (previousPageData.next) return previousPageData.next;
    return null;
};

export const useGameList = () => useCursorPage<GameListItem>(getGameListKey);

/*
    Game Hangeuls
*/

export interface GameHangeulsIndexGamesItem {
    appid: AppID;
    name: string;
    image_capsule_sm_120: string;
    hangeuls_supported: HangeulsSupported;
    hangeuls: any[];
}

export interface GameHangeulsIndexGames
    extends Array<GameHangeulsIndexGamesItem> {}

export interface GameHangeulsIndexListItem {
    id: number;
    label: string;
    char: string;
    desc: string;
    public_counted: number;
    user_counted: number;
    counted: number;
    games?: GameHangeulsIndexGames;
}

export interface GameHangeulsIndexList
    extends Array<GameHangeulsIndexListItem> {}

export const getGameHangeulsIndexListKey = (char?: string) =>
    `/game/hangeuls/${encodeURI(char as string)}`;

export const getGameHangeulsIndexList = (char?: string) =>
    fetcher
        .get<GameHangeulsIndexList>(getGameHangeulsIndexListKey(char))
        .then((res) => res.data);

export const useGameHangeulsIndexList = () =>
    useSWR<GameHangeulsIndexList>(getGameHangeulsIndexListKey);
