import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map, Observable, switchMap } from 'rxjs';

import { noPhotoUrl } from '../../shared/utils';
import { Theme } from '../../themes/theme';
import { ThemesApi } from '../../themes/themes-api';
import { Set } from '../set';
import { SetMinifigs } from '../set-minifigs/set-minifigs';
import { SetMocs } from '../set-mocs/set-mocs';
import { SetParts } from '../set-parts/set-parts';
import { SetsApi } from '../sets-api';

interface Data {
    set: Set;
    theme: Theme | undefined;
}

@Component({
    selector: 'app-set-view',
    imports: [AsyncPipe, DecimalPipe, SetMinifigs, SetMocs, SetParts],
    templateUrl: './set-view.html',
    styleUrl: './set-view.scss'
})
export class SetView implements OnInit {
    private destroyRef = inject(DestroyRef);
    private route = inject(ActivatedRoute);
    private setsApi = inject(SetsApi);
    private themesApi = inject(ThemesApi);

    data$: Observable<Data>;
    readonly noPhotoUrl = noPhotoUrl;

    ngOnInit() {
        this.data$ = this.route.paramMap.pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(params => {
                const id = params.get('id');

                return this.setsApi.getSetById(id!).pipe(
                    map(set => ({ set, theme: this.themesApi.getThemeById(set.theme_id) }) as Data)
                )
            })
        );
    }
}
