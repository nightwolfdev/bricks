import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { noPhotoUrl } from '../../shared/utils';
import { ThemesApi } from '../../themes/themes-api';
import { Set } from '../set';

@Component({
    selector: 'app-set-card',
    imports: [DecimalPipe, RouterLink],
    templateUrl: './set-card.html',
    styleUrl: './set-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetCard {
    private themesSvc = inject(ThemesApi);

    set = input.required<Set>();
    setImage = computed(() => this.set().set_img_url ?? noPhotoUrl);
    setTheme = computed(() => this.themesSvc.getThemeById(this.set().theme_id));
}
