import { IApi } from '@types'
import Config from 'react-native-config'

export enum ApiMethod {
  Delete = 'delete',
  Get = 'get',
  Patch = 'patch',
  Post = 'post',
  Put = 'put',
}

export enum ApiStatusCode {
  BadRequest = 400,
  Created = 201,
  Forbidden = 403,
  MethodNotFound = 405,
  NetworkError = 'ERR_NETWORK',
  NoContent = 204,
  NotFound = 404,
  ServerError = 500,
  Success = 200,
  Unauthorized = 401,
}

export const EXERCISE_API = {
  baseUrl: Config.RAPID_EXERCISE_API_BASE_URL,
  headers: {
    'x-rapidapi-key': Config.RAPID_API_KEY,
    'x-rapidapi-host': Config.RAPID_EXERCISE_API_HOST,
  },
  endPoints: {
    Exercise: 'exercises',
    Name: 'name',
  },
}

export const YOUTUBE_SEARCH_API = {
  baseUrl: Config.RAPID_YOUTUBE_API_BASE_URL,
  headers: {
    'x-rapidapi-key': Config.RAPID_API_KEY,
    'x-rapidapi-host': Config.RAPID_YOUTUBE_API_HOST,
  },
  endPoints: {
    Search:'search'
  },
}

export interface IApiResponse<T> {
  code?: number | string
  data?: T
  message: string
  status?: number
  headers?: object
}

export enum RequestType {
  DELETE = 'DELETE',
  GET = 'GET',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}

export enum ApiStatusPreset {
  SearchExercise = 'searchExercise',
  GetExerciseVideo='getExerciseVideo'
}

export const API : IApi = {
  Exercise: EXERCISE_API,
  YoutubeSearch: YOUTUBE_SEARCH_API,
}

export const API_TIMEOUT = 150000
