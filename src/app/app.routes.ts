import { Routes } from '@angular/router';

import { Themes } from './themes/themes';

export const routes: Routes = [
    {
        path: 'themes',
        component: Themes,
        title: 'Themes'
    },
    {
        path: 'minifigs',
        loadChildren: () => import('./minifigs/minifig-routes').then(r => r.routes),
        title: 'Minifigs'
    },
    {
        path: 'sets',
        loadChildren: () => import('./sets/set-routes').then(r => r.routes),
        title: 'Sets'
    },
    {
        path: 'parts',
        loadChildren: () => import('./parts/part-routes').then(r => r.routes),
        title: 'Parts'
    },
    {
        path: '**',
        redirectTo: 'themes'
    }
];
