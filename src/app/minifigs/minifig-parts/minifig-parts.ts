import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Minifig, MinifigPartResponse } from '../minifig';
import { MinifigsApi } from '../minifigs-api';
import { MinifigPartCard } from './minifig-part-card/minifig-part-card';

@Component({
    selector: 'app-minifig-parts',
    imports: [AsyncPipe, MinifigPartCard],
    templateUrl: './minifig-parts.html',
    styleUrl: './minifig-parts.scss'
})
export class MinifigParts implements OnInit {
    private minifigsApi = inject(MinifigsApi);

    minifig = input.required<Minifig>();

    minifigPartResponse$: Observable<MinifigPartResponse> = of({
        count: 0,
        next: null,
        previous: null,
        results: []
    });

    ngOnInit() {
        this.minifigPartResponse$ = this.minifigsApi.getPartsByMinifigId(this.minifig().set_num);
    }
}
