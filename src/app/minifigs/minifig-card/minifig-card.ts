import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { noPhotoUrl } from '../../shared/utils';
import { Minifig } from '../minifig';

@Component({
    selector: 'app-minifig-card',
    imports: [DecimalPipe],
    templateUrl: './minifig-card.html',
    styleUrl: './minifig-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinifigCard {
    minifig = input.required<Minifig>();
    minifigImage = computed(() => this.minifig().set_img_url ?? noPhotoUrl);
}
