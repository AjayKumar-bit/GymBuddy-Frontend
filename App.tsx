import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { AppNavigator } from '@navigators'
import { MSTStoreContext, mstStore } from '@stores'

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  )
}

const AppWrapper = () => {
  return (
    <MSTStoreContext.Provider value={mstStore}>
      <App />
    </MSTStoreContext.Provider>
  )
}

export default AppWrapper
