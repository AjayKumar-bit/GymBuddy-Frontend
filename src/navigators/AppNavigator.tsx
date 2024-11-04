import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack'

import { RouteName } from '@constants'
import { Alarm, Home, Planner, Profile, Search } from '@screens'
import { RootStackParamList } from '@types'

import DrawerNavigator from './DrawerNavigator'

export type AppStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>

const AppNavigator = () => {
  const AppStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <AppStack.Navigator initialRouteName={RouteName.Default} screenOptions={{ headerShown: false }}>
      <AppStack.Screen name={RouteName.Default} component={DrawerNavigator} />
      <AppStack.Screen name={RouteName.Alarm} component={Alarm} />
      <AppStack.Screen name={RouteName.Home} component={Home} />
      <AppStack.Screen name={RouteName.Planner} component={Planner} />
      <AppStack.Screen name={RouteName.Profile} component={Profile} />
      <AppStack.Screen name={RouteName.Search} component={Search} />
    </AppStack.Navigator>
  )
}

export { AppNavigator }
