import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { RouteName } from '@constants'
import { Login, Registration } from '@screens'
import { RootStackParamList } from '@types'

const AuthNavigator = () => {
  const AuthStack = createNativeStackNavigator<RootStackParamList>()

  return (
    <AuthStack.Navigator initialRouteName={RouteName.Login} screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={RouteName.Login} component={Login} />
      <AuthStack.Screen name={RouteName.Registration} component={Registration} />
    </AuthStack.Navigator>
  )
}

export { AuthNavigator }
