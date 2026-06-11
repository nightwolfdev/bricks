import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':id',
        loadComponent: () => import('./part-view/part-view').then(c => c.PartView),
        title: 'View Part'
    },
    {
        path: '',
        loadComponent: () => import('./parts').then(c => c.Parts)
    }
];