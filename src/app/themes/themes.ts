import { Component, inject } from '@angular/core';

import { Theme } from './theme';
import { ThemeCard } from './theme-card/theme-card';
import { ThemesApi } from './themes-api';

@Component({
    selector: 'app-themes',
    imports: [ThemeCard],
    templateUrl: './themes.html',
    styleUrl: './themes.scss'
})
export class Themes {
    private themesApi = inject(ThemesApi);

    themes: Theme[];

    ngOnInit() {
        this.themes = this.themesApi.themes;
    }
}
