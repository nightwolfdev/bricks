import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Pagination } from '../pagination/pagination';
import { buildPagination } from '../shared/utils';
import { Theme } from '../themes/theme';
import { ThemesApi } from '../themes/themes-api';
import { defaultSetQueryParams } from './set';
import { SetCard } from './set-card/set-card';
import { SetSearch } from './set-search/set-search';
import { SetsApi } from './sets-api';

@Component({
    selector: 'app-sets',
    imports: [Pagination, SetCard, SetSearch],
    templateUrl: './sets.html',
    styleUrl: './sets.scss'
})
export class Sets implements OnInit {
    private destroyRef = inject(DestroyRef);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private setsApi = inject(SetsApi);
    private themesApi = inject(ThemesApi);

    loading = this.setsApi.loading;
    searchCriteria = this.setsApi.searchCriteria;
    searchResponse = this.setsApi.searchResponse;
    theme: Theme | undefined = undefined;

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
                    queryParams: defaultSetQueryParams,
                    relativeTo: this.route
                });
            }

            this.setsApi.search(params);
            this.theme = this.themesApi.getThemeById(params['theme_id'] ?? '');
        });
    }
}
