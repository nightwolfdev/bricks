import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';

import { filter, finalize, switchMap, tap } from 'rxjs';

import { host } from '../../api';
import { buildQueryParams, mapQueryParams } from '../shared/utils';
import { Set, SetMinifigResponse, SetMocResponse, SetPartResponse, SetSearchCriteria, setSearchCriteriaSchema, SetSearchResponse } from './set';

@Injectable({
    providedIn: 'root'
})
export class SetsApi {
    private _searchCriteria = signal<Partial<SetSearchCriteria> | null>(null);
    private http = inject(HttpClient);

    loading = signal<boolean>(false);
    searchCriteria = this._searchCriteria.asReadonly();
    searchResponse = signal<SetSearchResponse | null>(null);

    constructor() {
        toObservable(this._searchCriteria).pipe(
            filter(searchCriteria => !!searchCriteria),
            tap(() => {
                this.loading.set(true);
                this.searchResponse.set(null);
            }),
            switchMap(searchCriteria => {
                const queryParams = buildQueryParams(searchCriteria);

                return this.http.get<SetSearchResponse>(`${host}/sets/?${queryParams}`).pipe(
                    tap(response => this.searchResponse.set(response)),
                    finalize(() => this.loading.set(false))
                );
            })
        ).subscribe();
    }

    getMinifigsBySetId(id: string) {
        return this.http.get<SetMinifigResponse>(`${host}/sets/${id}/minifigs/?page_size=1000`);
    }

    getMocsBySetId(id: string) {
        return this.http.get<SetMocResponse>(`${host}/sets/${id}/alternates/?page_size=1000`);
    }

    getPartsBySetId(id: string, params: Params) {
        const queryParams = buildQueryParams(params);
        return this.http.get<SetPartResponse>(`${host}/sets/${id}/parts/?${queryParams}`);
    }

    getSetById(id: string) {
        return this.http.get<Set>(`${host}/sets/${id}/`);
    }

    search(params: Params) {
        const searchCriteria = mapQueryParams<SetSearchCriteria>(params, setSearchCriteriaSchema);
        this._searchCriteria.set(searchCriteria);
    }
}
