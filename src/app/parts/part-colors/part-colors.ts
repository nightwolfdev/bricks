import { AsyncPipe } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Part, PartColorResponse } from '../part';
import { PartsApi } from '../parts-api';
import { PartColorCard } from './part-color-card/part-color-card';

@Component({
    selector: 'app-part-colors',
    imports: [AsyncPipe, PartColorCard],
    templateUrl: './part-colors.html',
    styleUrl: './part-colors.scss'
})
export class PartColors implements OnInit {
    private partsApi = inject(PartsApi);

    part = input.required<Part>();

    partColorResponse$: Observable<PartColorResponse> = of({
        count: 0,
        next: null,
        previous: null,
        results: []
    });

    ngOnInit() {
        this.partColorResponse$ = this.partsApi.getColorsByPartId(this.part().part_num);
    }
}
