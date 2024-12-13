import AsyncStorage from '@react-native-async-storage/async-storage'

import { cast, flow, getRoot, types } from 'mobx-state-tree'

import { log } from '@config'
import {
  API,
  AUTH_DATA_KEY,
  ApiStatusCode,
  ApiStatusPreset,
  RequestType,
  ToastPreset,
} from '@constants'
import { translate } from '@locales'
import { makeApiCall } from '@services'
import { IAddPlannerDate, IApiParams, ILoginUserParams, IRegisterUserParams } from '@types'

import { RootStoreType } from '../../root-store/rootStore'

const UserData = types.model('UserData', {
  emailId: types.string,
  isLoggedIn: types.boolean,
  name: types.string,
  plannerStartDate: types.string,
  token: types.string,
})

const UserStore = types
  .model('UserStore', {
    userData: UserData,
  })
  .actions(self => {
    const registerUser = flow(function* registerUser(params: IRegisterUserParams) {
      const { apiStatusStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { emailId, name, password } = params
      const { User, Register } = API.GymBuddy.endPoints
      const requestData = { emailId, name, password }
      try {
        setApiStatus({
          id: ApiStatusPreset.RegisterUser,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${Register}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          requestData,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Created) {
          log.info('UserRegister Api call successful')
          const authData = {
            isLoggedIn: true,
            token: response.data.data.accessToken,
          }

          yield AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData))
          const { emailId, name, accessToken, plannerStartDate } = response.data.data
          self.userData = cast({
            emailId,
            isLoggedIn: true,
            name,
            token: accessToken,
            plannerStartDate,
          })
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
        log.info('UserRegister Api call failed with error: ', error)
        setApiStatus({ id: ApiStatusPreset.RegisterUser, error })
        setValidationToastData({
          isVisible: true,
          message: translate('common.something_went_wrong'),
          preset: ToastPreset.Error,
        })
      } finally {
        setApiStatus({
          id: ApiStatusPreset.RegisterUser,
          isLoading: false,
        })
      }
    })

    const loginUser = flow(function* loginUser(params: ILoginUserParams) {
      const { apiStatusStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { User, Login } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.LoginUser,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${Login}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          requestData: params,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('LoginUser Api call successful')

          const authData = {
            isLoggedIn: true,
            token: response.data.data.accessToken,
          }

          yield AsyncStorage.setItem(AUTH_DATA_KEY, JSON.stringify(authData))
          const { emailId, name, accessToken, plannerStartDate } = response.data.data
          self.userData = cast({
            emailId,
            isLoggedIn: true,
            name,
            token: accessToken,
            plannerStartDate,
          })
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
        setApiStatus({ id: ApiStatusPreset.LoginUser, error })
        log.info('LoginUser Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.LoginUser,
          isLoading: false,
        })
      }
    })

    const addPlannerDate = flow(function* addPlannerDate(params: IAddPlannerDate) {
      const { apiStatusStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { User, AddPlannerDate } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.AddPlannerDate,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${AddPlannerDate}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          requestData: params,
          authToken: self.userData.token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('AddPlannerDate Api call successful')
          self.userData.plannerStartDate = response.data.data.plannerStartDate
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
        setApiStatus({ id: ApiStatusPreset.AddPlannerDate, error })
        log.info('AddPlannerDate Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.AddPlannerDate,
          isLoading: false,
        })
      }
    })

    const setAuthToken = (token: string) => {
      self.userData.token = token
    }
    const setPlannerStartDate = (plannerStartDate: string) => {
      self.userData.plannerStartDate = plannerStartDate
    }

    return {
      loginUser,
      registerUser,
      setAuthToken,
      setPlannerStartDate,
      addPlannerDate,
    }
  })

export { UserStore }
