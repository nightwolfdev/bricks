import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Set, SetMinifigResponse } from '../set';
import { SetsApi } from '../sets-api';
import { SetMinifigCard } from './set-minifig-card/set-minifig-card';

@Component({
    selector: 'app-set-minifigs',
    imports: [AsyncPipe, SetMinifigCard],
    templateUrl: './set-minifigs.html',
    styleUrl: './set-minifigs.scss'
})
export class SetMinifigs implements OnInit {
    private setsApi = inject(SetsApi);

    set = input.required<Set>();

    setMinifigResponse$: Observable<SetMinifigResponse> = of({
        count: 0,
        next: null,
        previous: null,
        results: []
    });

    ngOnInit() {
        this.setMinifigResponse$ = this.setsApi.getMinifigsBySetId(this.set().set_num);
    }
}
