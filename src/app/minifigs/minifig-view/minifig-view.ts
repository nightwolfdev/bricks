import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, switchMap } from 'rxjs';

import { noPhotoUrl } from '../../shared/utils';
import { Minifig } from '../minifig';
import { MinifigParts } from '../minifig-parts/minifig-parts';
import { MinifigSets } from '../minifig-sets/minifig-sets';
import { MinifigsApi } from '../minifigs-api';

interface Data {
    minifig: Minifig;
}

@Component({
    selector: 'app-minifig-view',
    imports: [AsyncPipe, DecimalPipe, MinifigParts, MinifigSets],
    templateUrl: './minifig-view.html',
    styleUrl: './minifig-view.scss'
})
export class MinifigView implements OnInit {
    private destroyRef = inject(DestroyRef);
    private minifigsApi = inject(MinifigsApi);
    private route = inject(ActivatedRoute);

    data$: Observable<Data>;
    readonly noPhotoUrl = noPhotoUrl;

    ngOnInit() {
        this.data$ = this.route.paramMap.pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(params => {
                const id = params.get('id');

                return this.minifigsApi.getMinifigById(id!).pipe(
                    map(minifig => ({ minifig }) as Data)
                )
            })
        );
    }
}
