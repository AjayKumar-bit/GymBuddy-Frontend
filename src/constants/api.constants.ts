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

export const API = {
  baseUrl: Config.API_BASE_URL,
  config: {
    headers: {
      'Accept': 'application/json',
      'Authorization': '',
      'Content-Type': 'application/json',
    },
  },

  endPoints: {
    // TODO: endpoints will placed here in future
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

export const API_TIMEOUT = 15000
