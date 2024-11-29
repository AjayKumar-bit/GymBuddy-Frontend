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
