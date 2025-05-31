export interface User {
    id: number,
    username: string,
    urls: {
        id: number,
        identifier: string,
        urlOriginal: string,
        urlShortened: string,
        date: string
    }[]
}
