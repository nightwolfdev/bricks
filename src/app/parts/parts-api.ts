import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';

import { filter, finalize, switchMap, tap } from 'rxjs';

import { host } from '../../api';
import { buildQueryParams, mapQueryParams } from '../shared/utils';
import { Part, PartCategory, PartCategoryResponse, PartColor, PartColorResponse, PartSearchCriteria, partSearchCriteriaSchema, PartSearchResponse } from './part';

@Injectable({
    providedIn: 'root'
})
export class PartsApi {
    private _partCategories = signal<PartCategory[] | null>(null);
    private _partColors = signal<PartColor[] | null>(null);
    private _searchCriteria = signal<Partial<PartSearchCriteria> | null>(null);
    private http = inject(HttpClient);

    loading = signal<boolean>(false);
    partCategories = this._partCategories.asReadonly();
    partColors = this._partColors.asReadonly();
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

        this.http.get<PartColorResponse>(`${host}/colors/?page_size=1000`).pipe(
            tap(response => this._partColors.set(response.results.sort((a: PartColor, b: PartColor) => a.name.localeCompare(b.name))))
        ).subscribe();
    }

    getPartById(id: string) {
        return this.http.get<Part>(`${host}/parts/${id}/`);
    }

    getPartCategory(partCategoryId: number) {
        return this.partCategories()?.find(partCategory => partCategory.id === partCategoryId);
    }

    search(params: Params) {
        const searchCriteria = mapQueryParams<PartSearchCriteria>(params, partSearchCriteriaSchema);
        this._searchCriteria.set(searchCriteria);
    }
}
