import React, { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { observer } from 'mobx-react-lite'

import { USER_DATA_KEY, USER_DEFAULT_DATA } from '@constants'
import { useStore } from '@stores'

import { AppNavigator } from './AppNavigator'
import { AuthNavigator } from './AuthNavigator'

interface IRootNavigatorProps {
  /** setIsAppReady: is a required prop that triggered when app is ready */
  setIsAppReady: (value: boolean) => void
}

const RootNavigator = observer((props: IRootNavigatorProps) => {
  const { setIsAppReady } = props
  const { domainStore } = useStore()
  const { userStore } = domainStore
  const { setUserData, userData } = userStore

  useEffect(() => {
    const init = async () => {
      const data = await AsyncStorage.getItem(USER_DATA_KEY)
      const userDetails = data ? await JSON.parse(data) : USER_DEFAULT_DATA
      setUserData(userDetails)
      setIsAppReady(true)
    }

    init()
  }, [])

  return userData.isLoggedIn ? <AppNavigator /> : <AuthNavigator />
})

export { RootNavigator }
