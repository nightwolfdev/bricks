import { Component, effect, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { deepClean, getViewParams } from '../../shared/utils';
import { Theme } from '../../themes/theme';
import { ThemesApi } from '../../themes/themes-api';
import { defaultSetQueryParams, SetSearchFormControls } from '../set';
import { SetsApi } from '../sets-api';

@Component({
    selector: 'app-set-search',
    imports: [ReactiveFormsModule],
    templateUrl: './set-search.html',
    styleUrl: './set-search.scss'
})
export class SetSearch implements OnInit {
    private fb = inject(NonNullableFormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private setsApi = inject(SetsApi);
    private themesApi = inject(ThemesApi);

    form: FormGroup<SetSearchFormControls>;
    themes: Theme[] = [];

    constructor() {
        effect(() => {
            const searchCriteria = this.setsApi.searchCriteria();

            this.form.patchValue({
                search: searchCriteria?.search,
                theme_id: String(searchCriteria?.theme_id ?? '')
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
            ordering: this.fb.control(defaultSetQueryParams.ordering),
            search: this.fb.control(''),
            theme_id: this.fb.control('')
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
