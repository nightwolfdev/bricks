import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';

import { noPhotoUrl } from '../../shared/utils';
import { Part } from '../part';
import { PartsApi } from '../parts-api';

@Component({
    selector: 'app-part-card',
    imports: [],
    templateUrl: './part-card.html',
    styleUrl: './part-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartCard {
    private partsApi = inject(PartsApi);

    part = input.required<Part>();
    partImage = computed(() => this.part().part_img_url ?? noPhotoUrl);
    partCategory = computed(() => this.partsApi.getPartCategory(this.part().part_cat_id));
}
