import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import BootSplash from 'react-native-bootsplash'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { NavigationContainer } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import { GBApiResponseToast } from '@components'
import { RootNavigator } from '@navigators'
import { MSTStoreContext, mstStore, useStore } from '@stores'
import { CommonStyles } from '@theme'

const App = observer(() => {
  const { viewStore } = useStore()
  const { validationToastData } = viewStore
  const { isVisible } = validationToastData

  const [isAppReady, setIsAppReady] = useState(false)

  useEffect(() => {
    if (isAppReady) {
      BootSplash.hide({ fade: true })
    }
  }, [isAppReady])

  return (
    <KeyboardProvider>
      <View style={CommonStyles.flex_1}>
        <NavigationContainer>
          <RootNavigator setIsAppReady={setIsAppReady} />
          {isVisible && <GBApiResponseToast />}
        </NavigationContainer>
      </View>
    </KeyboardProvider>
  )
})

const AppWrapper = () => {
  return (
    <MSTStoreContext.Provider value={mstStore}>
      <App />
    </MSTStoreContext.Provider>
  )
}

export default AppWrapper
