import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PartsApi } from '../../../parts/parts-api';
import { noPhotoUrl } from '../../../shared/utils';
import { SetPart } from '../../set';

@Component({
    selector: 'app-set-part-card',
    imports: [DecimalPipe, RouterLink],
    templateUrl: './set-part-card.html',
    styleUrl: './set-part-card.scss'
})
export class SetPartCard {
    private partsApi = inject(PartsApi);

    setPart = input.required<SetPart>();
    setPartCategory = computed(() => this.partsApi.getPartCategory(this.setPart().part.part_cat_id));
    setPartImage = computed(() => this.setPart().part.part_img_url ?? noPhotoUrl);
}
