import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [RouterLink, RouterLinkActive, RouterOutlet],
    templateUrl: './app.html',
    styleUrl: './app.scss'
})
export class App {
    private router = inject(Router);

    constructor() {
        const route = localStorage.getItem('route');

        if (route) {
            localStorage.removeItem('route');
            this.router.navigate([route]);
        }
    }

    readonly navigationLinks = [
        {
            routerLink: '/themes',
            text: 'Themes'
        },
        {
            routerLink: '/sets',
            text: 'Sets'
        },
        {
            routerLink: '/minifigs',
            text: 'Minifigs'
        },
        {
            routerLink: '/parts',
            text: 'Parts'
        }
    ];
}
