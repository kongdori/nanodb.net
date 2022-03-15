import * as app from './app';
import { GameDetail, GameList, GameListItem } from './game';

export type App = app.App;
export type AppID = app.AppID;

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

export interface AppListItemProps {
    listItem: AppListItem;
}
