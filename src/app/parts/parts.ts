import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Pagination } from '../pagination/pagination';
import { buildPagination } from '../shared/utils';
import { defaultPartQueryParams } from './part';
import { PartCard } from './part-card/part-card';
import { PartSearch } from './part-search/part-search';
import { PartsApi } from './parts-api';

@Component({
    selector: 'app-parts',
    imports: [Pagination, PartCard, PartSearch],
    templateUrl: './parts.html',
    styleUrl: './parts.scss'
})
export class Parts implements OnInit {
    private destroyRef = inject(DestroyRef);
    private partsApi = inject(PartsApi);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    loading = this.partsApi.loading;
    searchCriteria = this.partsApi.searchCriteria;
    searchResponse = this.partsApi.searchResponse;

    pagination = computed(() => {
        const response = this.searchResponse();
        const params = this.route.snapshot.queryParams;

        if (!response) return null;

        return buildPagination(params, response);
    });

    ngOnInit() {
        this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(params => {
            if (Object.keys(params).length === 0) {
                this.router.navigate([], {
                    queryParams: defaultPartQueryParams,
                    relativeTo: this.route
                });
            }

            this.partsApi.search(params);
        });
    }
}
