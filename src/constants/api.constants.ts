import Config from 'react-native-config'

import { IApi } from '@types'

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
    Search: 'search',
  },
}

export const GYMBUDDY_API = {
  baseUrl: Config.GYMBUDDY_BASE_URL,
  endPoints: {
    AddDay: 'addDay',
    AddExercise: 'addExercise',
    AddPlannerDate: 'addPlannerDate',
    ChangePassword: 'changePassword',
    Days: 'days',
    DeleteDay: 'deleteDay',
    DeleteExercise: 'deleteExercise',
    DeleteUser: 'deleteUser',
    Exercise: 'exercise',
    Exercises: 'exercises',
    GetDays: 'getDays',
    GetTodaysExercises: 'getTodayExercises',
    Login: 'login',
    Logout: 'Logout',
    Register: 'register',
    UpdateDay: 'updateDay',
    UpdateExercise: 'updateExercise',
    UpdateUser: 'updateProfile',
    User: 'users',
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
  AddDay = 'addDay',
  AddExercise = 'addExercise',
  AddPlannerDate = 'addPlannerDate',
  ChangePassword = 'changePassword',
  DeleteDay = 'deleteDay',
  DeleteExercise = 'deleteExercise',
  DeleteUser = 'deleteUser',
  GetDays = 'getDays',
  GetExercise = 'getExercise',
  GetExerciseVideo = 'getExerciseVideo',
  GetRecommendedExercises = 'getRecommendedExercises',
  GetTodaysExercises = 'getTodaysExercises',
  LoginUser = 'LoginUser',
  LogoutUser = 'LogoutUser',
  RegisterUser = 'RegisterUser',
  SearchExercise = 'searchExercise',
  UpdateDay = 'updateDay',
  UpdateExercise = 'updateExercise',
  UpdateUser = 'updateUser',
}

export const API: IApi = {
  Exercise: EXERCISE_API,
  GymBuddy: GYMBUDDY_API,
  YoutubeSearch: YOUTUBE_SEARCH_API,
}

export const API_TIMEOUT = 150000
