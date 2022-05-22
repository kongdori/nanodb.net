import * as _app from './app';
import { GameDetail, GameList, GameListItem, useGameList } from './game';

export type App = _app.App;
export type AppID = _app.AppID;

export interface AppProps {
    app: App;
    appid: AppID;
}

export type AppDetail = GameDetail;

export interface AppDetailProps {
    detail: AppDetail;
}

export type AppList = GameList;
export type AppListItem = GameListItem;

export interface AppListCursorPageProps {
    cursorPage: ReturnType<typeof useGameList>;
}
export interface AppListItemProps {
    listItem: AppListItem;
}

export const getAppListQueries = (
    queries: string | string[] | undefined
): {
    appid: number;
    slug: string | undefined;
    menu: string | undefined;
} | null => {
    if (!queries) return null;
    if (!Array.isArray(queries)) return null;

    return {
        appid: Number(queries[0]),
        slug: queries[1] || undefined,
        menu: queries[2] || undefined
    };
};

export const getAppListUrl = (app: App, appid: AppID, slug?: string) => {
    let url = `/${app}s/${appid}/`;

    if (slug) {
        url += `${slug}/`;
    }

    return url;
};
