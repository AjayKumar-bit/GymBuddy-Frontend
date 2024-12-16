/* eslint-disable @typescript-eslint/no-explicit-any */
import { Instance, cast, flow, getRoot, types } from 'mobx-state-tree'

import { log } from '@config'
import { API, ApiStatusCode, ApiStatusPreset, RequestType, SearchApiPreset } from '@constants'
import { makeApiCall } from '@services'
import { ISearchExerciseParams } from '@types'

import { RootStoreType } from '../../root-store/rootStore'

export const searchExerciseDataItem = types.model('searchExerciseDataItem', {
  bodyPart: types.string,
  equipment: types.string,
  gifUrl: types.string,
  id: types.string,
  name: types.string,
  target: types.string,
  secondaryMuscles: types.array(types.string),
  instructions: types.array(types.string),
})

const thumbnailsItem = types.model({
  url: types.string,
  width: types.number,
  height: types.number,
})

export const videoRecommendationItem = types.model('videoRecommendationItem', {
  thumbnails: types.array(thumbnailsItem),
  title: types.string,
  video_id: types.string,
})

const SearchStore = types
  .model('SearchStore', {
    searchedExerciseData: types.array(searchExerciseDataItem),
    videoRecommendation: types.array(videoRecommendationItem),
    ytContinuationToken: types.string,
    offset: types.number,
  })
  .actions(self => {
    const searchExercise = flow(function* searchExercise(params: ISearchExerciseParams) {
      const { apiStatusStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { exerciseName, isLoading = false, isRefreshCall = false } = params
      const exercise = exerciseName.toLowerCase()
      const { Exercise, Name } = API.Exercise.endPoints

      try {
        if (isRefreshCall) {
          self.offset = 0
        }

        setApiStatus({
          id: ApiStatusPreset.SearchExercise,
          isLoading: isLoading || isRefreshCall,
          isRefreshCall,
        })

        // Mapping presets to corresponding endpoints
        const endpointMap = {
          [SearchApiPreset.Name]: `${Exercise}/${Name}/${exercise}`,
          [SearchApiPreset.Target]: `${Exercise}/target/${exercise}`,
          [SearchApiPreset.Equipment]: `${Exercise}/equipment/${exercise}`,
          [SearchApiPreset.BodyPart]: `${Exercise}/bodyPart/${exercise}`,
        }

        let dataFetched = false // Track if data has been successfully fetched

        // eslint-disable-next-line no-restricted-syntax
        for (const [preset, endpoint] of Object.entries(endpointMap)) {
          if (dataFetched) break

          try {
            // Build API parameters
            const apiParams = {
              endpoint: `${endpoint}?limit=10&offset=${self.offset}`,
              request: RequestType.GET,
              apiData: API.Exercise,
            }

            // Make the API call
            const response = yield makeApiCall(apiParams)

            if (response.status === ApiStatusCode.Success) {
              if (response.data.length > 0) {
                // Successfully fetched data, update the store
                log.info(`SearchExercise API call successful for preset: ${preset}`)
                const hasMoreData = response.data.length === 10

                setApiStatus({ id: ApiStatusPreset.SearchExercise, hasMoreData })
                self.searchedExerciseData = self.offset
                  ? [...self.searchedExerciseData, ...response.data]
                  : response.data
                self.offset = cast(self.offset + 1)

                dataFetched = true // Data fetched successfully, break the loop
              } else {
                log.warn(`No data found for preset: ${preset}. Trying next preset.`)
              }
            } else {
              log.error(`API call failed for preset: ${preset} with status: ${response.status}`)
            }
          } catch (error: any) {
            log.error(`Error during API call for preset: ${preset}`, error)
          }
        }

        if (!dataFetched) {
          log.warn('All presets exhausted. No data found.')
          setApiStatus({ id: ApiStatusPreset.SearchExercise, hasMoreData: false })
        }
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.SearchExercise, error })
        log.error('SearchExercise API call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.SearchExercise,
          isLoading: false,
          isRefreshCall: false,
        })
      }
    })

    const getExerciseVideo = flow(function* getExerciseVideo(
      exerciseName: string,
      isNewCall: boolean = false,
    ) {
      const { apiStatusStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      try {
        if (isNewCall) {
          self.ytContinuationToken = ''
        }
        setApiStatus({
          id: ApiStatusPreset.GetExerciseVideo,
          isLoading: true,
          showBottomLoader: !!self.ytContinuationToken,
        })

        const endPointParams = self.ytContinuationToken
          ? `continuation?continuation_token=${self.ytContinuationToken}&query=${exerciseName}`
          : `?query=${exerciseName}`

        const apiParams = {
          endpoint: endPointParams,
          request: RequestType.GET,
          apiData: API.YoutubeSearch,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          const hasMoreData = !!response.data.continuation_token
          setApiStatus({ id: ApiStatusPreset.GetExerciseVideo, hasMoreData })
          self.videoRecommendation = self.ytContinuationToken
            ? [...self.videoRecommendation, ...response.data.videos]
            : response.data.videos
          log.info('GetExerciseVideo Api call successful')
          self.ytContinuationToken = response.data.continuation_token
        }
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetExerciseVideo, error })
        log.error('GetExerciseVideo Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetExerciseVideo,
          isLoading: false,
          showBottomLoader: false,
        })
      }
    })

    const resetSearchedExercise = () => {
      self.offset = 0
      self.searchedExerciseData = cast([])
    }

    return {
      getExerciseVideo,
      searchExercise,
      resetSearchedExercise,
    }
  })

export type SearchExerciseDataTypes = Instance<typeof searchExerciseDataItem>

export type videoRecommendationItemType = Instance<typeof videoRecommendationItem>

export { SearchStore }
