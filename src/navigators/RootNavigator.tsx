import React, { useEffect, useState } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { observer } from 'mobx-react-lite'

import { AUTH_DATA_KEY } from '@constants'
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
  const { setAuthToken, userData } = userStore

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  useEffect(() => {
    const init = async () => {
      const data = await AsyncStorage.getItem(AUTH_DATA_KEY)
      const authData = data ? await JSON.parse(data) : {}
      const isLoggedIn = authData ? authData.isLoggedIn : false
      const token = authData ? authData.token : ''
      setAuthToken(token ?? '')
      setIsUserLoggedIn(isLoggedIn)
      setIsAppReady(true)
    }

    init()
  }, [])

  return isUserLoggedIn || userData.isLoggedIn ? <AppNavigator /> : <AuthNavigator />
})

export { RootNavigator }
