/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
    Method,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosInstance
} from 'axios';

export interface FetcherRequestConfig
    extends Omit<AxiosRequestConfig, 'url' | 'method' | 'baseURL' | 'data'> {}

export class Fetcher {
    apiAxios: AxiosInstance;

    protected apiAxiosConfig: AxiosRequestConfig;

    constructor() {
        this.apiAxiosConfig = {
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            responseType: 'json'
        };

        this.apiAxios = axios.create(this.apiAxiosConfig);
    }

    request<T = any, D = any>(
        url: string,
        method: Method,
        data?: D,
        appendConfig?: FetcherRequestConfig
    ) {
        this.apiAxiosConfig.url = url;
        this.apiAxiosConfig.method = method;

        if (appendConfig) {
            this.apiAxiosConfig = { ...this.apiAxiosConfig, ...appendConfig };
        }

        return this.apiAxios.request<T, AxiosResponse<T>, D>({
            data,
            ...this.apiAxiosConfig
        });
    }

    get<T = any, D = any>(
        url: string,
        data?: D,
        config?: FetcherRequestConfig
    ) {
        return this.request<T, D>(url, 'GET', data, config);
    }

    delete<T = any, D = any>(url: string, config?: FetcherRequestConfig) {
        return this.request<T, D>(url, 'DELETE', undefined, config);
    }

    head<T = any, D = any>(url: string, config?: FetcherRequestConfig) {
        return this.request<T, D>(url, 'HEAD', undefined, config);
    }

    options<T = any, D = any>(url: string, config?: FetcherRequestConfig) {
        return this.request<T, D>(url, 'OPTIONS', undefined, config);
    }

    post<T = any, D = any>(
        url: string,
        data?: D,
        config?: FetcherRequestConfig
    ) {
        return this.request<T, D>(url, 'POST', data, config);
    }

    put<T = any, D = any>(
        url: string,
        data?: D,
        config?: FetcherRequestConfig
    ) {
        return this.request<T, D>(url, 'PUT', data, config);
    }

    patch<T = any, D = any>(
        url: string,
        data?: D,
        config?: FetcherRequestConfig
    ) {
        return this.request<T, D>(url, 'PATCH', data, config);
    }
}

const fetcher = new Fetcher();

export default fetcher;
