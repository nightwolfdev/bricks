import { FormControl } from "@angular/forms";

import { Part } from '../parts/part';
import { Set } from '../sets/set';
import { toNumber, toString } from "../shared/utils";

export const defaultMinifigQueryParams = {
    ordering: 'name',
    page: 1,
    page_size: 25
}

export interface MinifigPart {
    part: Part;
    quantity: number;
}

export interface MinifigPartResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: MinifigPart[];
}

export interface MinifigSearchCriteria {
    in_set_num?: string;
    in_theme_id?: number;
    max_parts?: number;
    min_parts?: number;
    ordering: string;
    page: number;
    page_size: number;
    search?: string;
}

export const minifigSearchCriteriaSchema = {
    in_set_num: toString,
    in_theme_id: toNumber,
    max_parts: toNumber,
    min_parts: toNumber,
    ordering: toString,
    page: toNumber,
    page_size: toNumber,
    search: toString,
} satisfies { [K in keyof MinifigSearchCriteria]: any };

export interface MinifigSearchFormControls {
    ordering: FormControl<string>;
    in_theme_id: FormControl<string>;
    search: FormControl<string>;
}

export interface MinifigSearchResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Minifig[];
}

export interface MinifigSetResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Set[];
}

export interface Minifig {
    name: string;
    num_parts: number;
    set_img_url: string | null;
    set_num: string;
}