import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ColorResponse } from './color';
import { host } from '../../api';

@Injectable({
    providedIn: 'root'
})
export class ColorsApi {

    private http = inject(HttpClient);

    getColors(): Observable<ColorResponse> {
        return this.http.get<ColorResponse>(`${host}/colors/?ordering=name&page_size=1000`);
    }

}
