import { Instance, cast, flow, getRoot, types } from 'mobx-state-tree'
import moment from 'moment'

import { log } from '@config'
import { API, ApiStatusCode, ApiStatusPreset, RequestType, ToastPreset } from '@constants'
import { makeApiCall } from '@services'
import {
  IAddExerciseParams,
  IApiParams,
  IDeleteExerciseParams,
  IGetExerciseParams,
  IUpdateExerciseParams,
} from '@types'

import { RootStoreType } from '../../root-store/rootStore'

const exerciseDetailsItem = types.model('exerciseDetailsItem', {
  bodyPart: types.string,
  equipment: types.string,
  gifUrl: types.string,
  id: types.string,
  instructions: types.array(types.string),
  name: types.string,
  reps: types.optional(types.number, 1),
  secondaryMuscles: types.array(types.string),
  sets: types.optional(types.number, 1),
  target: types.string,
})

const videoRecommendation = types.model('videoRecommendation', {
  thumbnail: types.string,
  title: types.string,
  videoId: types.string,
})

const exerciseDataItems = types.model('exerciseDataItems', {
  _id: types.string,
  exerciseDetails: exerciseDetailsItem,
  videoRecommendations: types.array(videoRecommendation),
  dayId: types.optional(types.string, ''),
})

const ExerciseStore = types
  .model('ExerciseStore', {
    exerciseData: types.array(exerciseDataItems),
    offset: types.number,
    todaysExercise: types.array(exerciseDataItems),
    recommendedExercises: types.array(exerciseDetailsItem),
  })
  .actions(self => {
    const getExercise = flow(function* getExercise(params: IGetExerciseParams) {
      const { apiStatusStore, domainStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { Exercise, Exercises } = API.GymBuddy.endPoints
      const { dayId, isLoading = false, isRefreshCall = false, isFirstCall = false } = params

      try {
        if (isRefreshCall || isFirstCall) {
          self.offset = 0
        }
        setApiStatus({
          id: ApiStatusPreset.GetExercise,
          isLoading: isLoading || isRefreshCall,
          isRefreshCall,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${Exercises}/${dayId}?limit=${10}&offset=${self.offset}`,
          request: RequestType.GET,
          apiData: API.GymBuddy,
          authToken: token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('GetExercise Api call successful')
          const hasMoreData = response.data.data.length === 10
          setApiStatus({ id: ApiStatusPreset.GetExercise, hasMoreData })
          self.exerciseData = self.offset
            ? [...self.exerciseData, ...response.data.data]
            : response.data.data
          self.offset = cast(self.offset + 1)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetExercise, error })
        log.error('GetExercise Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetExercise,
          isLoading: false,
          isRefreshCall: false,
        })
      }
    })

    const resetExerciseData = () => {
      self.exerciseData = cast([])
      self.offset = 0
    }

    const addExercise = flow(function* addExercise(params: IAddExerciseParams) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { setValidationToastData } = viewStore
      const { Exercise, AddExercise } = API.GymBuddy.endPoints
      const { data } = params

      try {
        setApiStatus({
          id: ApiStatusPreset.AddExercise,
          isLoading: true,
          hasSuccess: false,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${AddExercise}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          authToken: token,
          requestData: data,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Created) {
          log.info('AddExercise Api call successful')
          setApiStatus({
            id: ApiStatusPreset.AddExercise,
            hasSuccess: true,
          })
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Success,
          })
        } else {
          setApiStatus({
            id: ApiStatusPreset.AddExercise,
            hasSuccess: false,
          })
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Error,
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({
          id: ApiStatusPreset.AddExercise,
          hasSuccess: false,
        })
        setApiStatus({ id: ApiStatusPreset.AddExercise, error })
        log.error('AddExercise Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.AddExercise,
          isLoading: false,
        })
      }
    })

    const updateExercise = flow(function* updateExercise(params: IUpdateExerciseParams) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { setValidationToastData } = viewStore
      const { Exercise, UpdateExercise } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.UpdateExercise,
          isLoading: true,
          hasSuccess: false,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${UpdateExercise}`,
          request: RequestType.PATCH,
          apiData: API.GymBuddy,
          authToken: token,
          requestData: params,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('Update Exercise Api call successful')
          const index = self.exerciseData.findIndex(data => data._id === params.exerciseId)
          self.exerciseData[index] = response.data.data
          setApiStatus({
            id: ApiStatusPreset.UpdateExercise,
            hasSuccess: true,
          })
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Success,
          })
        } else {
          setApiStatus({
            id: ApiStatusPreset.UpdateExercise,
            hasSuccess: false,
          })
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Error,
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({
          id: ApiStatusPreset.UpdateExercise,
          hasSuccess: false,
        })
        setApiStatus({ id: ApiStatusPreset.UpdateExercise, error })
        log.error('update Exercise Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.UpdateExercise,
          isLoading: false,
        })
      }
    })

    const deleteExercise = flow(function* updateExercise(params: IDeleteExerciseParams) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { setValidationToastData } = viewStore
      const { Exercise, DeleteExercise } = API.GymBuddy.endPoints
      const { dayId, exerciseId } = params
      try {
        setApiStatus({
          id: ApiStatusPreset.DeleteExercise,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${DeleteExercise}?dayId=${dayId}&exerciseId=${exerciseId}`,
          request: RequestType.DELETE,
          apiData: API.GymBuddy,
          authToken: token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('Delete Exercise Api call successful')
          self.exerciseData = cast(self.exerciseData.filter(({ _id }) => _id !== params.exerciseId))
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Success,
          })
        } else {
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Error,
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.DeleteExercise, error })
        log.error('Delete Exercise Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.DeleteExercise,
          isLoading: false,
        })
      }
    })

    const getTodaysExercises = flow(function* getTodaysExercises() {
      const { apiStatusStore, domainStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { Exercise, GetTodaysExercises } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.GetTodaysExercises,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${GetTodaysExercises}?limit=${10}&offset=${self.offset}`,
          request: RequestType.GET,
          apiData: API.GymBuddy,
          authToken: token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('GetTodaysExercises Api call successful')
          self.todaysExercise = response.data.data
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetTodaysExercises, error })
        log.error('GetTodaysExercises Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetTodaysExercises,
          isLoading: false,
        })
      }
    })

    const getRecommendedExercises = flow(function* getRecommendedExercises() {
      const { apiStatusStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      try {
        setApiStatus({
          id: ApiStatusPreset.GetRecommendedExercises,
          isLoading: true,
        })

        const offset = moment().format('DD')

        const apiParams = {
          endpoint: `${API.Exercise.endPoints.Exercise}?limit=${10}&offset=${offset}`,
          request: RequestType.GET,
          apiData: API.Exercise,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('GetRandomExercise Api call successful')
          self.recommendedExercises = response.data
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetRecommendedExercises, error })
        log.info('GetRandomExercise Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetRecommendedExercises,
          isLoading: false,
        })
      }
    })

    return {
      getExercise,
      addExercise,
      resetExerciseData,
      updateExercise,
      deleteExercise,
      getTodaysExercises,
      getRecommendedExercises,
    }
  })

export type exerciseDetailsType = Instance<typeof exerciseDetailsItem>

export type exerciseDataType = Instance<typeof exerciseDataItems>

export type videoRecommendationType = Instance<typeof videoRecommendation>

export { ExerciseStore }
