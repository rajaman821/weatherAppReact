export interface ICities {
    id: number;
    name: string,
    state: string,
    country: string,
    coord: ICoord
}


export type ICoord = {
    lat: number,
    lon: number
}