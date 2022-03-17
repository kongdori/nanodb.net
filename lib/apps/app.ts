import useSWR, { Key } from 'swr';

export type App = 'game';
export type AppID = number;

/*
    App Modules
*/

export interface EsdListItem {
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

export type EsdList = EsdListItem[];

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
    tooltip: string;
    summary: string;
    summary_label: string;
    responsive: number;
}
export interface SteamReview {
    url: string;
    reviews: SteamReviewItem[];
}

export interface MetacriticReview {
    url: string;
    score: string;
    summary: string;
}

export interface ReviewListItem extends SteamReview, MetacriticReview {
    name: 'steam' | 'metacritic';
}

export type ReviewList = ReviewListItem[];

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
    reviews: ReviewList;
    prices: PriceList;
    esds: EsdList;
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
