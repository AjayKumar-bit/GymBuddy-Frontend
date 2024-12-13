import { Moment } from 'moment'

import { RequestType } from '@constants'
import { exerciseDetailsType, videoRecommendationType } from '@stores'

import { IApiConfig } from './api.types'

export interface ISearchExerciseParams {
  exerciseName: string
  isLoading?: boolean
  isNewCall?: boolean
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
  exerciseDetails: exerciseDetailsType
  videoRecommendations: videoRecommendationType[]
}

export interface IAddExerciseParams {
  data: AddExerciseData
}

export interface IGetExerciseParams {
  dayId: string
  isLoading?: boolean
  isRefreshCall?: boolean
  isFirstCall?: boolean
}

interface IExerciseDetailsTypes {
  sets: number
  reps: number
}

export interface IUpdateExerciseParams {
  dayId: string
  exerciseDetails?: IExerciseDetailsTypes
  exerciseId: string
  newAddedVideos?: videoRecommendationType[]
  removedVideos?: string[]
}

export interface IDeleteExerciseParams {
  dayId: string
  exerciseId: string
}

export interface IAddPlannerDate {
  plannerStartDate: Moment
}
