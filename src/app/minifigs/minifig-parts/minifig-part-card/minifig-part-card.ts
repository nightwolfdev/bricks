import { DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PartsApi } from '../../../parts/parts-api';
import { noPhotoUrl } from '../../../shared/utils';
import { MinifigPart } from '../../minifig';

@Component({
    selector: 'app-minifig-part-card',
    imports: [DecimalPipe, RouterLink],
    templateUrl: './minifig-part-card.html',
    styleUrl: './minifig-part-card.scss'
})
export class MinifigPartCard {
    private partsApi = inject(PartsApi);

    minifigPart = input.required<MinifigPart>();
    minifigPartCategory = computed(() => this.partsApi.getPartCategory(this.minifigPart().part.part_cat_id));
    minifigPartImage = computed(() => this.minifigPart().part.part_img_url ?? noPhotoUrl);
}
