import useSWR from 'swr';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';
import fetcher from '../fetcher';
import { AppID, AppListItem } from './app';
import { useCursorPage, APIResponseCursorPage } from '../api';

export const gamePlatformItem = {
    win: <FaWindows />,
    mac: <FaApple />,
    linux: <FaLinux />
};

export type HangeulsSupportedItem = '공식' | '유저';
export type HangeulsSupported = Array<HangeulsSupportedItem>;

export type GamePlatform = Array<keyof typeof gamePlatformItem>;

interface GameData {
    esds: {
        [key: string]: string;
    };
    platforms: GamePlatform;
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

export interface GameHangeulsIndexRecordsListItem {
    appid: AppID;
    name: string;
    image_capsule_sm_120: string;
    hangeuls_supported: HangeulsSupported;
    hangeuls: any[];
}

export interface GameHangeulsIndexRecordsList
    extends Array<GameHangeulsIndexRecordsListItem> {}

export interface GameHangeulsIndexListItem {
    id: number;
    nlabel: string;
    nvalue: string;
    public_counted: number;
    user_counted: number;
    counted: number;
    records?: GameHangeulsIndexRecordsList;
}

export interface GameHangeulsIndexList
    extends Array<GameHangeulsIndexListItem> {}

export const getGameHangeulsIndexListKey = (nvalue?: string) =>
    `/game/hangeuls/${encodeURI(nvalue as string)}`;

export const getGameHangeulsIndexList = (nvalue?: string) =>
    fetcher
        .get<GameHangeulsIndexList>(getGameHangeulsIndexListKey(nvalue))
        .then((res) => res.data);

export const useGameHangeulsIndexList = () =>
    useSWR<GameHangeulsIndexList>(getGameHangeulsIndexListKey);
