import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, switchMap } from 'rxjs';

import { noPhotoUrl } from '../../shared/utils';
import { Part, PartCategory } from '../part';
import { PartColors } from '../part-colors/part-colors';
import { PartsApi } from '../parts-api';

interface Data {
    category: PartCategory | undefined;
    part: Part;
}

@Component({
    selector: 'app-part-view',
    imports: [AsyncPipe, PartColors],
    templateUrl: './part-view.html',
    styleUrl: './part-view.scss'
})
export class PartView implements OnInit {
    private destroyRef = inject(DestroyRef);
    private partsApi = inject(PartsApi);
    private route = inject(ActivatedRoute);

    readonly noPhotoUrl = noPhotoUrl;

    data$: Observable<Data>;

    ngOnInit() {
        this.data$ = this.route.paramMap.pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(params => {
                const id = params.get('id');

                return this.partsApi.getPartById(id!).pipe(
                    map(part => ({ category: this.partsApi.getPartCategory(part.part_cat_id), part }) as Data)
                );
            })
        )
    }
}
