import { Instance, flow, getRoot, types } from 'mobx-state-tree'

import { log } from '@config'
import { API, ApiStatusCode, ApiStatusPreset, RequestType, ToastPreset } from '@constants'
import { makeApiCall } from '@services'
import { IAddExerciseParams, IApiParams, IGetExerciseParams } from '@types'

import { RootStoreType } from '../../root-store/rootStore'

const exerciseDetailsItem = types.model('exerciseDetailsItem', {
  bodyPart: types.string,
  equipment: types.string,
  gifUrl: types.string,
  id: types.string,
  instructions: types.array(types.string),
  name: types.string,
  reps: types.number,
  secondaryMuscles: types.array(types.string),
  sets: types.number,
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
})

const ExerciseStore = types
  .model('ExerciseStore', {
    exerciseData: types.array(exerciseDataItems),
    offset: types.number,
  })
  .actions(self => {
    const getExercise = flow(function* getExercise(params: IGetExerciseParams) {
      const { apiStatusStore, domainStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { userStore } = domainStore
      const { token } = userStore.userData
      const { Exercise, Exercises } = API.GymBuddy.endPoints
      const { dayId, isLoading, isRefreshCall } = params

      try {
        if (isRefreshCall) {
          self.offset = 0
        }
        setApiStatus({
          id: ApiStatusPreset.GetExercise,
          isLoading: isLoading || isRefreshCall,
          isRefreshCall,
        })

        const apiParams: IApiParams = {
          endpoint: `${Exercise}/${Exercises}${dayId}?limit=${10}&offset=${self.offset}`,
          request: RequestType.GET,
          apiData: API.GymBuddy,
          authToken: token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('GetExerciseVideo Api call successful')
          const hasMoreData = response.data.data.length === 10
          setApiStatus({ id: ApiStatusPreset.GetExercise, hasMoreData })
          self.exerciseData = response.data.data
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetExercise, error })
        log.error('GetExerciseVideo Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetExercise,
          isLoading: false,
        })
      }
    })

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

    return {
      getExercise,
      addExercise,
    }
  })

export type exerciseDataType = Instance<typeof exerciseDetailsItem>

export type videoRecommendationType = Instance<typeof videoRecommendation>

export { ExerciseStore }
