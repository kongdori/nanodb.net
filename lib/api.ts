/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import useSWRInfinite, { SWRInfiniteKeyLoader } from 'swr/infinite';
import fetcher from './fetcher';

export interface APIResponseCursorPage<Data = any> {
    next: string;
    previous: string;
    results: Data[];
}

export function useCursorPage<T = any, E = any>(getKey: SWRInfiniteKeyLoader) {
    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite<
        APIResponseCursorPage<T>,
        E
    >(getKey, (url: string) =>
        fetcher.get<APIResponseCursorPage<T>, E>(url).then((res) => res.data)
    );

    return {
        data: data?.flatMap((item) => item.results),
        error,
        mutate,
        size,
        setSize,
        isValidating
    };
}
