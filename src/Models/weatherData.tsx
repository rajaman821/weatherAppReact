export interface IWeatherData {
    coord: ICoord,
    weather: IWeather
    base: string,
    main: IMain
    visibility: number,
    wind: IWind
    clouds: IClouds
    dt: number
    sys: ISys
    timezone: number,
    id: number,
    name: string,
    cod: number
}

export type ICoord = {
    lat: number,
    lon: number
}

export type IWeather = [{
    id: number,
    main: string,
    description: string,
    icon: string
}]

export type IMain = {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
}

export type IWind = {
    speed: number
    deg: number

}

export type IClouds = {
    all: number
}

export type ISys = {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number
}