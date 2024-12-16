import AsyncStorage from '@react-native-async-storage/async-storage'

import { Instance, cast, flow, getRoot, types } from 'mobx-state-tree'

import { log } from '@config'
import {
  API,
  ApiStatusCode,
  ApiStatusPreset,
  RequestType,
  ToastPreset,
  USER_DATA_KEY,
} from '@constants'
import { translate } from '@locales'
import { makeApiCall } from '@services'
import {
  IAddPlannerDateParams,
  IApiParams,
  IChangePasswordParams,
  ILoginUserParams,
  IRegisterUserParams,
  IUpdateUserParams,
} from '@types'

import { RootStoreType } from '../../root-store/rootStore'

const UserData = types.model('UserData', {
  emailId: types.string,
  isLoggedIn: types.boolean,
  name: types.string,
  plannerStartDate: types.string,
  token: types.string,
})

export type userDataTypes = Instance<typeof UserData>

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
          const { emailId, name, accessToken, plannerStartDate } = response.data.data
          const userData = {
            emailId,
            isLoggedIn: true,
            name,
            token: accessToken,
            plannerStartDate: plannerStartDate ?? '',
          }

          yield AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
          self.userData = cast(userData)
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

          const { emailId, name, accessToken, plannerStartDate } = response.data.data
          const userData = {
            emailId,
            isLoggedIn: true,
            name,
            token: accessToken,
            plannerStartDate: plannerStartDate ?? '',
          }

          yield AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
          self.userData = cast(userData)
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

    const addPlannerDate = flow(function* addPlannerDate(params: IAddPlannerDateParams) {
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

    const setUserData = (data: userDataTypes) => {
      self.userData = data
    }

    const setPlannerStartDate = (plannerStartDate: string) => {
      self.userData.plannerStartDate = plannerStartDate
    }

    const changePassword = flow(function* changePassword(params: IChangePasswordParams) {
      const { apiStatusStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { User, ChangePassword } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.ChangePassword,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${ChangePassword}`,
          request: RequestType.PATCH,
          apiData: API.GymBuddy,
          requestData: params,
          authToken: self.userData.token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('ChangePassword Api call successful')
          const { emailId, name, accessToken, plannerStartDate } = response.data.data
          const userData = {
            emailId,
            isLoggedIn: true,
            name,
            token: accessToken,
            plannerStartDate: plannerStartDate ?? '',
          }

          yield AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
          self.userData = cast(userData)
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
        setApiStatus({ id: ApiStatusPreset.ChangePassword, error })
        log.info('ChangePassword Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.ChangePassword,
          isLoading: false,
        })
      }
    })

    const logoutUser = flow(function* logoutUser() {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { plannerStore } = domainStore
      const { resetDayData } = plannerStore
      const { User, Logout } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.LogoutUser,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${Logout}`,
          request: RequestType.POST,
          apiData: API.GymBuddy,
          authToken: self.userData.token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('LogoutUser Api call successful')
          resetDayData()
          setApiStatus({
            id: ApiStatusPreset.LogoutUser,
            hasSuccess: true,
          })

          const userData = {
            emailId: '',
            isLoggedIn: false,
            name: '',
            token: '',
            plannerStartDate: '',
          }

          yield AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
          self.userData = cast(userData)
          setApiStatus({
            id: ApiStatusPreset.LogoutUser,
            hasSuccess: true,
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
        setApiStatus({ id: ApiStatusPreset.LogoutUser, error })
        log.info('LogoutUser Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.LogoutUser,
          isLoading: false,
        })
      }
    })

    const updateUser = flow(function* updateUser(params: IUpdateUserParams) {
      const { apiStatusStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { User, UpdateUser } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.UpdateUser,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${UpdateUser}`,
          request: RequestType.PATCH,
          apiData: API.GymBuddy,
          requestData: params,
          authToken: self.userData.token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('UpdateUser Api call successful')
          const { name, emailId } = response.data.data
          self.userData.name = name ?? self.userData.name
          self.userData.emailId = emailId ?? self.userData.emailId
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
        setApiStatus({ id: ApiStatusPreset.UpdateUser, error })
        log.info('UpdateUser Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.UpdateUser,
          isLoading: false,
        })
      }
    })

    const deleteUser = flow(function* deleteUser() {
      const { apiStatusStore, domainStore, viewStore } = getRoot<RootStoreType>(self)
      const { setApiStatus } = apiStatusStore
      const { setValidationToastData } = viewStore
      const { plannerStore } = domainStore
      const { resetDayData } = plannerStore
      const { User, DeleteUser } = API.GymBuddy.endPoints

      try {
        setApiStatus({
          id: ApiStatusPreset.DeleteUser,
          isLoading: true,
        })

        const apiParams: IApiParams = {
          endpoint: `${User}/${DeleteUser}`,
          request: RequestType.DELETE,
          apiData: API.GymBuddy,
          authToken: self.userData.token,
        }

        const response = yield makeApiCall(apiParams)

        if (response.status === ApiStatusCode.Success) {
          log.info('DeleteUser Api call successful')
          resetDayData()
          const userData = {
            emailId: '',
            isLoggedIn: false,
            name: '',
            token: '',
            plannerStartDate: '',
          }

          yield AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData))
          self.userData = cast(userData)
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
        setApiStatus({ id: ApiStatusPreset.DeleteUser, error })
        log.info('DeleteUser Api call failed with error: ', error)
      } finally {
        setApiStatus({
          id: ApiStatusPreset.DeleteUser,
          isLoading: false,
        })
      }
    })

    return {
      addPlannerDate,
      changePassword,
      loginUser,
      registerUser,
      setUserData,
      setPlannerStartDate,
      logoutUser,
      updateUser,
      deleteUser,
    }
  })

export { UserStore }
