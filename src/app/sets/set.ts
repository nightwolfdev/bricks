import { FormControl } from "@angular/forms";

import { Part } from '../parts/part';
import { toNumber, toString } from "../shared/utils";

export const defaultSetQueryParams = {
    ordering: '-year',
    page: 1,
    page_size: 25
}

export interface SetMinifig {
    id: string;
    quantity: number;
    set_img_url: string;
    set_name: string;
    set_num: string;
}

export interface SetMinifigResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SetMinifig[];
}

export interface SetPart {
    part: Part;
    quantity: number;
}

export interface SetPartResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: SetPart[];
}

export interface SetSearchCriteria {
    max_parts?: number;
    max_year?: number;
    min_parts?: number;
    min_year?: number;
    ordering: string;
    page: number;
    page_size: number;
    search?: string;
    theme_id?: number;
}

export const setSearchCriteriaSchema = {
    max_parts: toNumber,
    max_year: toNumber,
    min_parts: toNumber,
    min_year: toNumber,
    ordering: toString,
    page: toNumber,
    page_size: toNumber,
    search: toString,
    theme_id: toNumber
} satisfies { [K in keyof SetSearchCriteria]: any };

export interface SetSearchFormControls {
    ordering: FormControl<string>;
    search: FormControl<string>;
    theme_id: FormControl<string>;
}

export interface SetSearchResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Set[];
}

export interface Set {
    name: string;
    num_parts: number;
    set_img_url: string | null;
    set_num: string;
    theme_id: number;
    year: number;
}