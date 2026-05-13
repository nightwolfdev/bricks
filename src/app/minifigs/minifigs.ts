import { Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { Pagination } from '../pagination/pagination';
import { buildPagination } from '../shared/utils';
import { Theme } from '../themes/theme';
import { ThemesApi } from '../themes/themes-api';
import { defaultMinifigQueryParams } from './minifig';
import { MinifigCard } from './minifig-card/minifig-card';
import { MinifigSearch } from './minifig-search/minifig-search';
import { MinifigsApi } from './minifigs-api';

@Component({
    selector: 'app-minifigs',
    imports: [MinifigCard, MinifigSearch, Pagination],
    templateUrl: './minifigs.html',
    styleUrl: './minifigs.scss'
})
export class Minifigs implements OnInit {
    private destroyRef = inject(DestroyRef);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private minifigsApi = inject(MinifigsApi);
    private themesApi = inject(ThemesApi);

    loading = this.minifigsApi.loading;
    searchCriteria = this.minifigsApi.searchCriteria;
    searchResponse = this.minifigsApi.searchResponse;
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
                    queryParams: defaultMinifigQueryParams,
                    relativeTo: this.route
                });
            }
            this.minifigsApi.search(params);
            this.theme = this.themesApi.getThemeById(params['in_theme_id'] ?? '');
        });
    }
}
