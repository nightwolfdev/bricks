import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Minifig, MinifigSetResponse } from '../minifig';
import { MinifigsApi } from '../minifigs-api';
import { MinifigSetCard } from './minifig-set-card/minifig-set-card';

@Component({
    selector: 'app-minifig-sets',
    imports: [AsyncPipe, MinifigSetCard],
    templateUrl: './minifig-sets.html',
    styleUrl: './minifig-sets.scss'
})
export class MinifigSets implements OnInit {
    private minifigsApi = inject(MinifigsApi);

    minifig = input.required<Minifig>();

    minifigSetResponse$: Observable<MinifigSetResponse> = of({
        count: 0,
        next: null,
        previous: null,
        results: []
    });

    ngOnInit() {
        this.minifigSetResponse$ = this.minifigsApi.getSetsByMinifigId(this.minifig().set_num);
    }
}
