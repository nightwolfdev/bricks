export interface Color {
    id: number;
    name: string;
    rgb: string;
}

export interface ColorResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Color[];
}