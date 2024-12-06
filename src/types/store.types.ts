import { RequestType } from '@constants'
import { exerciseDataType, videoRecommendationType } from '@stores'

import { IApiConfig } from './api.types'

export interface ISearchExerciseParams {
  exerciseName: string
  isLoading?: boolean
  isRefreshCall?: boolean
}

export interface IRegisterUserParams {
  confirmPassword: string
  emailId: string
  name: string
  password: string
}

export interface ILoginUserParams {
  emailId: string
  password: string
}

export interface IApiParams {
  apiData: IApiConfig
  authToken?: string
  endpoint: string
  request: RequestType
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  requestData?: any
}

interface AddExerciseData {
  dayIds: string[]
  exerciseDetails: exerciseDataType
  videoRecommendations: videoRecommendationType[]
}

export interface IAddExerciseParams {
  data: AddExerciseData
}

export interface IGetExerciseParams {
  dayId: string
  isLoading?: boolean
  isRefreshCall?: boolean
}
