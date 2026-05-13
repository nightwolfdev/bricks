import { Component, effect, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { deepClean, getViewParams } from '../../shared/utils';
import { Theme } from '../../themes/theme';
import { ThemesApi } from '../../themes/themes-api';
import { defaultMinifigQueryParams, MinifigSearchFormControls } from '../minifig';
import { MinifigsApi } from '../minifigs-api';

@Component({
    selector: 'app-minifig-search',
    imports: [ReactiveFormsModule],
    templateUrl: './minifig-search.html',
    styleUrl: './minifig-search.scss'
})
export class MinifigSearch implements OnInit {
    private fb = inject(NonNullableFormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private minifigsApi = inject(MinifigsApi);
    private themesApi = inject(ThemesApi);

    form: FormGroup<MinifigSearchFormControls>;
    themes: Theme[] = [];

    constructor() {
        effect(() => {
            const searchCriteria = this.minifigsApi.searchCriteria();

            this.form.patchValue({
                in_theme_id: String(searchCriteria?.in_theme_id ?? ''),
                search: searchCriteria?.search
            }, {
                emitEvent: false
            });
        });
    }

    ngOnInit() {
        this.themes = this.themesApi.themes;
        this.buildForm();
    }

    private buildForm() {
        this.form = this.fb.group({
            ordering: this.fb.control(defaultMinifigQueryParams.ordering),
            in_theme_id: this.fb.control(''),
            search: this.fb.control('')
        });
    }

    onSubmit() {
        const viewParams = getViewParams(this.route.snapshot.queryParams);
        const cleanFormValues = deepClean(this.form.value);

        this.router.navigate([], {
            queryParams: {
                ...cleanFormValues,
                ...viewParams,
                page: 1
            },
            relativeTo: this.route
        });
    }
}
