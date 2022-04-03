import useSWR, { Key } from 'swr';

export type App = 'game';
export type AppID = number;

/*
    App Modules
*/

export interface LinkListItem {
    name: string;
    url: string;
}

export type LinkList = LinkListItem[];

export interface PriceListItem {
    store: string;
    initial?: number;
    initial_formatted?: string;
    discount?: number;
    discount_formatted?: string;
    countdown?: Date;
    final: number;
    final_formatted: string;
    url: string;
    last_updated: Date;
}

export type PriceList = PriceListItem[];

export interface SteamReviewItem {
    name: '모든 평가' | '최근 평가';
    url: string;
    tooltip: string;
    summary: string;
    summary_label: string;
    responsive: number;
}
export type SteamReview = SteamReviewItem[];

export interface MetacriticReviewItem {
    platform: string;
    reviews: { name: string; summary: string; url?: string; score: string }[];
}
export type MetacriticReview = MetacriticReviewItem[];

export interface Reviews {
    steam?: SteamReview;
    metacritic?: MetacriticReview;
}

export interface ScreenshotsItem {
    hd: string;
    thumb: string;
}
export type Screenshots = ScreenshotsItem[];

export interface MoviesItem {
    mp4: string;
    mp4_hd: string;
    webm: string;
    webm_hd: string;
    thumb: string;
}
export type Movies = MoviesItem[];

/*
    App Detail
*/

interface AppBase {
    app: App;
    appid: AppID;
    name: string;
    slug: string;
    snippet: string;
    release_date: string;
    is_adult: boolean;
    is_free: boolean;
    image_header: string;
    image_hero: string;
    tags: Array<string>;
    genres: Array<string>;
    reviews: Reviews;
    prices: PriceList;
    links: LinkList;
}

export interface AppDetailBase extends AppBase {
    screenshots: Screenshots;
    movies: Movies;
}

export const useAppDetail = (key: Key) => useSWR(key);

/*
    App List
*/

export interface AppListItemBase extends Omit<AppBase, 'snippet'> {}
