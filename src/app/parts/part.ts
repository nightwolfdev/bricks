import { FormControl } from "@angular/forms";

import { toNumber, toString } from "../shared/utils";

export const defaultPartQueryParams = {
    ordering: 'name',
    page: 1,
    page_size: 25
}

export interface Color {
    id: number;
    name: string;
    rgb: string;
}

export interface ColorResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Color[];
}

export interface PartSearchCriteria {
    color_id?: number;
    ordering: string;
    page: number;
    page_size: number;
    part_cat_id?: number;
    part_num?: string;
    part_nums?: string;
    search?: string;
}

export const partSearchCriteriaSchema = {
    color_id: toNumber,
    ordering: toString,
    page: toNumber,
    page_size: toNumber,
    part_cat_id: toNumber,
    part_num: toString,
    part_nums: toString,
    search: toString
} satisfies { [K in keyof PartSearchCriteria]: any };

export interface PartSearchFormControls {
    color_id: FormControl<string>;
    ordering: FormControl<string>;
    part_cat_id: FormControl<string>;
    search: FormControl<string>;
}

export interface PartSearchResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Part[];
}

export interface Part {
    name: string;
    part_cat_id: number;
    part_img_url: string | null;
    part_num: string;
}

export interface PartCategory {
    id: number;
    name: string;
    part_count: number;
}

export interface PartCategoryResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PartCategory[];
}

export interface PartColor {
    color_id: number;
    color_name: string;
    num_sets: number;
    num_set_parts: number;
    rgb?: string;
}

export interface PartColorResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: PartColor[];
}