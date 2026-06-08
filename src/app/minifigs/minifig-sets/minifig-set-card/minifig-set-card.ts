import { DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Set } from '../../../sets/set';
import { noPhotoUrl } from '../../../shared/utils';

@Component({
    selector: 'app-minifig-set-card',
    imports: [DecimalPipe, RouterLink],
    templateUrl: './minifig-set-card.html',
    styleUrl: './minifig-set-card.scss'
})
export class MinifigSetCard {
    minifigSet = input.required<Set>();
    minifigSetImage = computed(() => this.minifigSet().set_img_url ?? noPhotoUrl);
}
