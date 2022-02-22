export type AppID = string;

type GameTypes = 'GAME' | 'DLC';
export type AppType = GameTypes;

/*
    App Modules
*/

export interface AppPricesItem {
    store: string;
    initial_formatted: string;
    discount_formatted: string;
    final_formatted: string;
    url?: string;
}

export interface AppPrices extends Array<AppPricesItem> {}

export interface SteamReviewsItem {
    name: '모든 평가' | '최근 평가';
    tooltip: string;
    summary: string;
    summary_label: string;
    responsive: number;
}
export interface SteamReview {
    url: string;
    reviews: Array<SteamReviewsItem>;
}

export interface MetacriticReview {
    url: string;
    score: string;
    summary: string;
}

export interface AppReviewsItem extends SteamReview, MetacriticReview {
    name: 'steam' | 'metacritic';
}

export interface AppReviews extends Array<AppReviewsItem> {}

/*
    App
*/

export interface App {
    type: AppType;
    name: string;
    snippet: string;
    logo_image: string;
    header_image: string;
    hero_image: string;
}

export interface AppListItem {
    appid: AppID;
    apptype: AppType;
    name: string;
    image_header: string;
    image_hero: string;
    is_adult: boolean;
    tags: Array<string>;
    prices: AppPrices;
    reviews: AppReviews;
}

export interface AppList extends Array<AppListItem> {}
