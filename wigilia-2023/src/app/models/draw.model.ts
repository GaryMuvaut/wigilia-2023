export interface Osoba {
    podpis: string,
    wykluczenia: WykluczonaOsoba[],
    wylosowanaOsoba: string,
    foto: string,
    key: string
}

export interface WykluczonaOsoba {
    osoba: string
}