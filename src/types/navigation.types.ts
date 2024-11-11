import { SearchExerciseDataTypes } from '@stores'

interface ISearchNavigationParams {
  prevSearchedExercise: string
}

interface IDetailsNavigationParams {
  data: SearchExerciseDataTypes
}

export type RootStackParamList = {
  Default: undefined
  Alarm: undefined
  Details: IDetailsNavigationParams
  Home: undefined
  Planner: undefined
  Profile: undefined
  Search: ISearchNavigationParams
}
