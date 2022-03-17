/* eslint-disable @typescript-eslint/no-empty-interface */
import { AxiosError } from 'axios';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import fetcher from './fetcher';

export interface APIResponseCursorPage<Data = any> {
    next: string | null;
    previous: string | null;
    results: Data[];
}

export interface APIResponse extends APIResponseCursorPage {}

export interface APIError {}

export const useAPICursorPage = <
    T = any,
    Request = any,
    Error = AxiosError<APIResponse, Request>
>(
    indexUrl: string,
    config?: SWRInfiniteConfiguration
) => {
    type Data = APIResponseCursorPage<T>;

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
        Data,
        Error
    >(
        (index: number, previousPageData: Data) => {
            if (index === 0) return indexUrl;
            if (previousPageData.next) return previousPageData.next;
            return null;
        },
        (url: string) =>
            fetcher.get<Data, Request>(url).then((res) => res.data),
        config
        // {
        //     https://swr.vercel.app/ko/docs/revalidation
        //     자동갱신 off
        //     revalidateIfStale: false,
        //     revalidateOnFocus: false,
        //     revalidateOnReconnect: false,
        // }
    );

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === 'undefined');
    const isEmpty = data?.[0].results.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.next === null);
    const isRefreshing = isValidating && data && data.length === size;

    const flatData = data ? data.flatMap((item) => item.results) : [];

    return {
        isLoadingInitialData,
        isLoadingMore,
        isEmpty,
        isReachingEnd,
        isRefreshing,
        data: flatData,
        error,
        mutate,
        size,
        setSize,
        isValidating
    };
};
