import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: ':id',
        loadComponent: () => import('./minifig-view/minifig-view').then(c => c.MinifigView),
        title: 'View Minifig'
    },
    {
        path: '',
        loadComponent: () => import('./minifigs').then(c => c.Minifigs)
    }
];