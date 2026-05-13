import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':id',
        loadComponent: () => import('./set-view/set-view').then(c => c.SetView),
        title: 'View Set'
    },
    {
        path: '',
        loadComponent: () => import('./sets').then(c => c.Sets)
    }
];