import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { noPhotoUrl } from '../../../shared/utils';
import { SetMinifig } from '../../set';

@Component({
    selector: 'app-set-minifig-card',
    imports: [DecimalPipe],
    templateUrl: './set-minifig-card.html',
    styleUrl: './set-minifig-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetMinifigCard {
    setMinifig = input.required<SetMinifig>();
    setMinifigImage = computed(() => this.setMinifig().set_img_url ?? noPhotoUrl);
}
