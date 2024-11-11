export interface IApiEndPoints {
  [key: string]: string
}

export interface IApiConfig {
  baseUrl: string | undefined
  headers: {
    'x-rapidapi-key': string | undefined
    'x-rapidapi-host': string | undefined
  }
  endPoints: IApiEndPoints
}

export interface IApi {
  Exercise: IApiConfig
  YoutubeSearch: IApiConfig
}
