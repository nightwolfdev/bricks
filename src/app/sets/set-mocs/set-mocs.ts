import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Set, SetMocResponse } from '../set';
import { SetsApi } from '../sets-api';
import { SetMocCard } from './set-moc-card/set-moc-card';

@Component({
    selector: 'app-set-mocs',
    imports: [AsyncPipe, SetMocCard],
    templateUrl: './set-mocs.html',
    styleUrl: './set-mocs.scss'
})
export class SetMocs implements OnInit {
    private setsApi = inject(SetsApi);

    set = input.required<Set>();

    setMocResponse$: Observable<SetMocResponse> = of({
        count: 0,
        next: null,
        previous: null,
        results: []
    });

    ngOnInit() {
        this.setMocResponse$ = this.setsApi.getMocsBySetId(this.set().set_num);
    }
}
