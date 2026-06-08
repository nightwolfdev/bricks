import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Params } from '@angular/router';

import { filter, finalize, switchMap, tap } from 'rxjs';

import { host } from '../../api';
import { buildQueryParams, mapQueryParams } from '../shared/utils';
import { Minifig, MinifigPartResponse, MinifigSearchCriteria, minifigSearchCriteriaSchema, MinifigSearchResponse, MinifigSetResponse } from './minifig';

@Injectable({
    providedIn: 'root'
})
export class MinifigsApi {
    private _searchCriteria = signal<Partial<MinifigSearchCriteria> | null>(null);
    private http = inject(HttpClient);

    loading = signal<boolean>(false);
    searchCriteria = this._searchCriteria.asReadonly();
    searchResponse = signal<MinifigSearchResponse | null>(null);

    constructor() {
        toObservable(this._searchCriteria).pipe(
            filter(searchCriteria => !!searchCriteria),
            tap(() => {
                this.loading.set(true);
                this.searchResponse.set(null);
            }),
            switchMap(searchCriteria => {
                const queryParams = buildQueryParams(searchCriteria);

                return this.http.get<MinifigSearchResponse>(`${host}/minifigs/?${queryParams}`).pipe(
                    tap(response => this.searchResponse.set(response)),
                    finalize(() => this.loading.set(false))
                );
            })
        ).subscribe();
    }

    getMinifigById(id: string) {
        return this.http.get<Minifig>(`${host}/minifigs/${id}/`);
    }

    getPartsByMinifigId(id: string) {
        return this.http.get<MinifigPartResponse>(`${host}/minifigs/${id}/parts/`);
    }

    getSetsByMinifigId(id: string) {
        return this.http.get<MinifigSetResponse>(`${host}/minifigs/${id}/sets/`);
    }

    search(params: Params) {
        const searchCriteria = mapQueryParams<MinifigSearchCriteria>(params, minifigSearchCriteriaSchema);
        this._searchCriteria.set(searchCriteria);
    }
}
