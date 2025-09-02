import { Component, inject, OnInit } from '@angular/core';

import { Theme, ThemesApi } from '../shared/themes-api';

@Component({
    selector: 'app-home',
    imports: [],
    templateUrl: './home.html',
    styleUrl: './home.scss'
})
export class Home implements OnInit {

    private themesApi = inject(ThemesApi);

    themes: Theme[];

    ngOnInit(): void {
        this.themes = this.themesApi.themes;
    }

}
