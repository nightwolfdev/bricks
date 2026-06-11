import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';

import { filter, finalize, map, switchMap, tap } from 'rxjs';

import { host } from '../../api';
import { buildQueryParams, mapQueryParams } from '../shared/utils';
import { Color, ColorResponse, Part, PartCategory, PartCategoryResponse, PartColorResponse, PartSearchCriteria, partSearchCriteriaSchema, PartSearchResponse } from './part';

@Injectable({
    providedIn: 'root'
})
export class PartsApi {
    private _colors = signal<Color[] | null>(null);
    private _partCategories = signal<PartCategory[] | null>(null);
    private _searchCriteria = signal<Partial<PartSearchCriteria> | null>(null);
    private http = inject(HttpClient);

    colors = this._colors.asReadonly();
    loading = signal<boolean>(false);
    partCategories = this._partCategories.asReadonly();
    searchCriteria = this._searchCriteria.asReadonly();
    searchResponse = signal<PartSearchResponse | null>(null);

    constructor() {
        toObservable(this._searchCriteria).pipe(
            filter(searchCriteria => !!searchCriteria),
            tap(() => {
                this.loading.set(true);
                this.searchResponse.set(null);
            }),
            switchMap(searchCriteria => {
                const queryParams = buildQueryParams(searchCriteria);

                return this.http.get<PartSearchResponse>(`${host}/parts/?${queryParams}`).pipe(
                    tap(response => this.searchResponse.set(response)),
                    finalize(() => this.loading.set(false))
                );
            })
        ).subscribe();

        this.http.get<PartCategoryResponse>(`${host}/part_categories/?page_size=1000`).pipe(
            tap(response => this._partCategories.set(response.results.sort((a: PartCategory, b: PartCategory) => a.name.localeCompare(b.name))))
        ).subscribe();

        this.http.get<ColorResponse>(`${host}/colors/?page_size=1000`).pipe(
            tap(response => this._colors.set(response.results.sort((a: Color, b: Color) => a.name.localeCompare(b.name))))
        ).subscribe();
    }

    getColorsByPartId(id: string) {
        return this.http.get<PartColorResponse>(`${host}/parts/${id}/colors/?page_size=1000`).pipe(
            map(response => ({ ...response, results: response.results.map(color => ({ ...color, rgb: this.getRgbByColorId(color.color_id)?.rgb })) }))
        );
    }

    getPartById(id: string) {
        return this.http.get<Part>(`${host}/parts/${id}/`);
    }

    getPartCategory(partCategoryId: number) {
        return this.partCategories()?.find(partCategory => partCategory.id === partCategoryId);
    }

    getRgbByColorId(id: number) {
        return this.colors()?.find(color => color.id === id);
    }

    search(params: Params) {
        const searchCriteria = mapQueryParams<PartSearchCriteria>(params, partSearchCriteriaSchema);
        this._searchCriteria.set(searchCriteria);
    }
}
