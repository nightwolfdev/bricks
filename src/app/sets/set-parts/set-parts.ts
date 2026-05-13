import { DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Params } from '@angular/router';
import { buildPagination, extractQueryParams } from '../../shared/utils';
import { Set, SetPartResponse } from '../set';
import { SetsApi } from '../sets-api';
import { SetPartCard } from './set-part-card/set-part-card';

@Component({
    selector: 'app-set-parts',
    imports: [DecimalPipe, NgTemplateOutlet, SetPartCard],
    templateUrl: './set-parts.html',
    styleUrl: './set-parts.scss'
})
export class SetParts implements OnInit {
    private destroyRef = inject(DestroyRef);
    private setsApi = inject(SetsApi);

    currentParams = signal<Params>({ page: 1, page_size: 25 });
    loading = signal<boolean>(false);
    partsResponse = signal<SetPartResponse | null>(null);
    set = input.required<Set>();

    pagination = computed(() => {
        const response = this.partsResponse();

        if (!response) return null;

        return buildPagination(this.currentParams(), response);
    });

    ngOnInit() {
        this.getParts(this.currentParams());
    }

    getParts(params: Params) {
        this.currentParams.set(params);
        this.loading.set(true);

        this.setsApi.getPartsBySetId(this.set().set_num, params).pipe(
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: response => {
                this.partsResponse.set(response);
                this.loading.set(false);
            }
        });
    }

    nextPage() {
        const next = this.partsResponse()?.next;

        if (next) {
            const params = extractQueryParams(next);
            this.getParts(params);
        }

    }

    previousPage() {
        const previous = this.partsResponse()?.previous;

        if (previous) {
            const params = extractQueryParams(previous);
            this.getParts(params);
        }
    }
}
