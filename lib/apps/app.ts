export type AppID = string;

type GameTypes = 'GAME' | 'DLC';
export type AppType = GameTypes;

/*
    App Modules
*/

export interface AppPricesItem {
    [key: string]: {
        initial_formatted: string;
        discount_formatted: string;
        final_formatted: string;
        url?: string;
    };
}

export interface AppPrices extends Array<AppPricesItem> {}

export interface AppReviews {
    steam?: {
        recently: null | {
            tooltip: string;
            summary: string;
            summary_label: string;
            responsive: number;
        };
        all: {
            tooltip: string;
            summary: string;
            summary_label: string;
            responsive: number;
        };
    };
    metacritic?: {
        url: string;
        score: string;
        summary: string;
    };
}

//

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
    lowest_price: AppPricesItem;
    reviews: AppReviews;
}

export interface AppList extends Array<AppListItem> {}
