import { Injectable } from '@angular/core';

export interface Theme {
    id: number;
    name: string;
}

@Injectable({
    providedIn: 'root'
})
export class ThemesApi {

    themes = [
        {
            id: 1,
            name: 'Technic'
        },
        {
            id: 52,
            name: 'City'
        },
        {
            id: 158,
            name: 'Star Wars'
        },
        {
            id: 252,
            name: 'Architecture'
        },
        {
            id: 435,
            name: 'Ninjago'
        },
        {
            id: 494,
            name: 'Friends'
        },
        {
            id: 576,
            name: 'Ideas'
        },
        {
            id: 577,
            name: 'Minecraft'
        },
        {
            id: 602,
            name: 'Jurassic World'
        },
        {
            id: 608,
            name: 'Disney'
        },
        {
            id: 610,
            name: 'Brickheadz'
        },
        {
            id: 709,
            name: 'Art'
        },
        {
            id: 721,
            name: 'Icons'
        },
        {
            id: 749,
            name: 'Dreamzzz'
        },
        {
            id: 766,
            name: 'Fortnite'
        },
        {
            id: 769,
            name: 'Botanicals'
        }
    ].sort((a: Theme, b: Theme) => a.name.localeCompare(b.name));

}
