import { Component, input } from '@angular/core';

import { PartColor } from '../../part';

@Component({
    selector: 'app-part-color-card',
    imports: [],
    templateUrl: './part-color-card.html',
    styleUrl: './part-color-card.scss'
})
export class PartColorCard {
    partColor = input.required<PartColor>();
}
