import { Routes } from '@angular/router';

import { Home } from './home/home';

export const routes: Routes = [
    {
        path: 'colors',
        loadChildren: () => import('./colors/color-routes').then(r => r.routes),
        title: 'Colors'
    },
    {
        path: 'home',
        component: Home,
        title: 'Bricks'
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
