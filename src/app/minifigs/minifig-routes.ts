import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./minifigs').then(c => c.Minifigs)
    }
];