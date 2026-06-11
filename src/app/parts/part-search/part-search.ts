import { Component, effect, inject, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { deepClean, getViewParams } from '../../shared/utils';
import { defaultPartQueryParams, PartSearchFormControls } from '../part';
import { PartsApi } from '../parts-api';

@Component({
    selector: 'app-part-search',
    imports: [ReactiveFormsModule],
    templateUrl: './part-search.html',
    styleUrl: './part-search.scss'
})
export class PartSearch implements OnInit {
    private fb = inject(NonNullableFormBuilder);
    private partsApi = inject(PartsApi);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    colors = this.partsApi.colors;
    partCategories = this.partsApi.partCategories;
    form: FormGroup<PartSearchFormControls>;

    constructor() {
        effect(() => {
            const searchCriteria = this.partsApi.searchCriteria();

            this.form.patchValue({
                color_id: String(searchCriteria?.color_id ?? ''),
                part_cat_id: String(searchCriteria?.part_cat_id ?? ''),
                search: searchCriteria?.search
            }, {
                emitEvent: false
            });
        });
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm() {
        this.form = this.fb.group({
            color_id: this.fb.control(''),
            ordering: this.fb.control(defaultPartQueryParams.ordering),
            part_cat_id: this.fb.control(''),
            search: this.fb.control(''),
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
