import { Params } from "@angular/router";

export type Parser<T> = (value: any) => T | undefined;

export const noPhotoUrl = 'https://placeholdit.com/600x300/dddddd/999999?text=NO+PHOTO';

export const toNumber: Parser<number> = (value) => {
    const n = Number(value);
    return isNaN(n) ? undefined : n;
};

export const toString: Parser<string> = (value) => {
    if (typeof value !== 'string') return undefined;
    const v = value.trim();
    return v ? v : undefined;
};

export const toBoolean: Parser<boolean> = (value) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
};

export interface Pagination {
    count: number,
    end: number,
    next: string | null,
    page: number,
    page_size: number,
    previous: string | null,
    start: number,
    totalPages: number
}

export function buildPagination(params: Params, response: { count: number; next: string | null; previous: string | null }): Pagination {
    const page = Number(params['page']) || 1;
    const page_size = Number(params['page_size']) || 25;
    const count = response.count;
    const totalPages = Math.ceil(count / page_size);
    const start = (page - 1) * page_size;
    const end = start + page_size;

    return {
        count,
        end: Math.min(end, count),
        next: response.next,
        page,
        page_size,
        previous: response.previous,
        start: start + 1,
        totalPages
    }
}

export function buildQueryParams<T extends Record<string, any>>(searchCriteria: T): string {
    return (Object.keys(searchCriteria) as (keyof T)[])
        .filter(key => searchCriteria[key] !== undefined && searchCriteria[key] !== null)
        .map(key => {
            return `${String(key)}=${encodeURIComponent(String(searchCriteria[key]))}`;
        }).join('&');
}

export function deepClean<T>(value: T): T {
    if (Array.isArray(value)) {
        return value
            .map(v => deepClean(v))
            .filter(v => v !== undefined && v !== null && v !== '') as any;
    }

    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.entries(value)
                .map(([k, v]) => [k, deepClean(v)])
                .filter(([_, v]) =>
                    v !== undefined &&
                    v !== null &&
                    v !== '' &&
                    !(typeof v === 'object' && Object.keys(v).length === 0)
                )
        ) as T;
    }

    return value;
}

export function extractQueryParams(url: string): Params {
    if (!url) return {};

    const queryString = url.split('?')[1];
    if (!queryString) return {}

    return Object.fromEntries(new URLSearchParams(queryString).entries());
}

export function getViewParams(params: Params) {
    return {
        page: params['page'] ?? 1,
        page_size: params['page_size'] ?? 25
    };
}

export function mapQueryParams<T>(
    params: Params,
    schema: { [K in keyof T]?: Parser<T[K]> }
): Partial<T> {
    const result: Partial<T> = {};

    for (const key of Object.keys(params)) {
        const typedKey = key as keyof T;
        const parser = schema[typedKey];

        if (!parser) continue;

        const raw = params[key];
        const parsed = parser(raw);

        if (parsed !== undefined) {
            result[typedKey] = parsed;
        }
    }

    return result;
}