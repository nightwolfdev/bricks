import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';

import { noPhotoUrl } from '../../../shared/utils';
import { SetMoc } from '../../set';

@Component({
    selector: 'app-set-moc-card',
    imports: [DecimalPipe],
    templateUrl: './set-moc-card.html',
    styleUrl: './set-moc-card.scss'
})
export class SetMocCard {
    setMoc = input.required<SetMoc>();
    setMocImage = computed(() => this.setMoc().moc_img_url ?? noPhotoUrl);
}
