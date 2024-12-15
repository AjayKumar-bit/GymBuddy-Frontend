import { ExerciseListScreenPreset } from '@constants'
import { SearchExerciseDataTypes, exerciseDetailsType, videoRecommendationType } from '@stores'

interface ISearchNavigationParams {
  dayId?: string
  dayName?: string
  preset: ExerciseListScreenPreset
  prevSearchedExercise?: string
}

interface IDetailsNavigationParams {
  data: exerciseDetailsType | SearchExerciseDataTypes
  dayId?: string
  exerciseId?: string
  isPlannerEnable?: boolean
  videos?: Array<videoRecommendationType>
}

export type RootStackParamList = {
  Default: undefined
  Details: IDetailsNavigationParams
  Home: undefined
  Login: undefined
  Planner: undefined
  Profile: undefined
  Registration: undefined
  Reminders: undefined
  Search: ISearchNavigationParams
}
