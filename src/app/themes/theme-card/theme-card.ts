import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Theme } from '../theme';

@Component({
    selector: 'app-theme-card',
    imports: [RouterLink],
    templateUrl: './theme-card.html',
    styleUrl: './theme-card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeCard {
    theme = input.required<Theme>();
}
