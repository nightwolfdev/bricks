import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ColorResponse } from './color';
import { ColorsApi } from './colors-api';

@Component({
    selector: 'app-colors',
    imports: [AsyncPipe],
    templateUrl: './colors.html',
    styleUrl: './colors.scss'
})
export class Colors implements OnInit {

    private colorsApi = inject(ColorsApi);

    colorResponse: Observable<ColorResponse>;

    ngOnInit(): void {
        this.colorResponse = this.colorsApi.getColors();
    }

}
