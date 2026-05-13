import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { extractQueryParams, Pagination as Page } from '../shared/utils';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.html',
    styleUrl: './pagination.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pagination {
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    pagination = input.required<Page | null>();

    nextPage() {
        const next = this.pagination()?.next;
        if (!next) return;

        const queryParams = extractQueryParams(next);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }

    previousPage() {
        const previous = this.pagination()?.previous;
        if (!previous) return;

        const queryParams = extractQueryParams(previous);

        this.router.navigate([], {
            relativeTo: this.route,
            queryParams
        });
    }
}
