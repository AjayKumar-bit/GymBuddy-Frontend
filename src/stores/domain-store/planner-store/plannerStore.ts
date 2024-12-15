import { Instance, cast, flow, getRoot, types } from 'mobx-state-tree'

import { log } from '@config'
import { API, ApiStatusCode, ApiStatusPreset, RequestType, ToastPreset } from '@constants'
import { makeApiCall } from '@services'
import { IApiParams } from '@types'

import { RootStoreType } from '../../root-store/rootStore'

export const DayItem = types.model('DayItem', {
  _id: types.string,
  dayName: types.string,
})

const PlannerStore = types
  .model('PlannerStore', {
    days: types.array(DayItem),
  })
  .actions(self => {
    const getDays = flow(function* getDays() {
      const { apiStatusStore, domainStore } = getRoot<RootStoreType>(self)
      const { userStore } = domainStore
      const { userData, setPlannerStartDate } = userStore
      const { token } = userData
      const { setApiStatus } = apiStatusStore
      const { Days, GetDays } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.GetDays,
          isLoading: true,
        })
        const apiParams: IApiParams = {
          endpoint: `${Days}/${GetDays}`,
          request: RequestType.GET,
          apiData: API.GymBuddy,
          authToken: token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          setApiStatus({
            id: ApiStatusPreset.GetDays,
            hasSuccess: true,
          })
          const { days, plannerStartDate } = response.data.data
          log.info('GetDays Api call successful')
          self.days = days
          setPlannerStartDate(plannerStartDate)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.GetDays, error })
        log.error('GetDays Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.GetDays,
          isLoading: false,
        })
      }
    })

    const addDay = flow(function* addDay(dayName: string) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { userStore } = domainStore
      const { setValidationToastData } = viewStore
      const { token } = userStore.userData
      const { setApiStatus } = apiStatusStore
      const { Days, AddDay } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.AddDay,
          isLoading: true,
        })
        const requestData = { dayName }

        const apiParams: IApiParams = {
          endpoint: `${Days}/${AddDay}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          authToken: token,
          requestData,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Created) {
          log.info('AddDay Api call successful')
          self.days.push(response.data.data)
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
        setApiStatus({ id: ApiStatusPreset.AddDay, error })
        log.error('AddDay Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.AddDay,
          isLoading: false,
        })
      }
    })

    const updateDay = flow(function* updateDay(dayName: string, oldDayId: string) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { userStore } = domainStore
      const { setValidationToastData } = viewStore
      const { token } = userStore.userData
      const { setApiStatus } = apiStatusStore
      const { Days, UpdateDay } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.UpdateDay,
          isLoading: true,
        })

        const requestData = { dayName, dayId: oldDayId }

        const apiParams: IApiParams = {
          endpoint: `${Days}/${UpdateDay}`,
          request: RequestType.PATCH,
          apiData: API.GymBuddy,
          authToken: token,
          requestData,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('UpdateDay Api call successful')
          const index = self.days.findIndex(({ _id }) => _id === oldDayId)
          if (index >= 0) {
            const updatedDay = { ...self.days[index], dayName }
            self.days[index] = updatedDay
          }
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
        setApiStatus({ id: ApiStatusPreset.UpdateDay, error })
        log.error('UpdateDay Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.UpdateDay,
          isLoading: false,
        })
      }
    })

    const deleteDay = flow(function* deleteDay(dayId: string) {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { userStore } = domainStore
      const { setValidationToastData } = viewStore
      const { token } = userStore.userData
      const { setApiStatus } = apiStatusStore
      const { Days, DeleteDay } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.DeleteDay,
          isLoading: true,
        })
        const requestData = { dayId }

        const apiParams: IApiParams = {
          endpoint: `${Days}/${DeleteDay}`,
          request: RequestType.DELETE,
          apiData: API.GymBuddy,
          authToken: token,
          requestData,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('DeleteDay Api call successful')
          self.days = cast(self.days.filter(({ _id }) => _id !== dayId))
          setValidationToastData({
            isVisible: true,
            message: response.data.message,
            preset: ToastPreset.Success,
          })
        } else {
          setValidationToastData({
            isVisible: true,
            message: response.data?.message,
            preset: ToastPreset.Error,
          })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setApiStatus({ id: ApiStatusPreset.DeleteDay, error })
        log.error('DelateDay Api call failed with error :', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.DeleteDay,
          isLoading: false,
        })
      }
    })

    const resetDayData = () => {
      self.days = cast([])
    }

    return {
      addDay,
      deleteDay,
      getDays,
      updateDay,
      resetDayData,
    }
  })

export type DaysItemTypes = Instance<typeof DayItem>

export { PlannerStore }
