import { Text, View } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { RouteName } from '@constants'

import { TabNavigator } from './tab-navigator/TabNavigator'

const DrawerContent = () => {
  return (
    <View>
      <Text>This is the DrawerContent</Text>
    </View>
  )
}

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator()
  return (
    <Drawer.Navigator
      initialRouteName={RouteName.Default}
      // TODO: this will get updated later
      drawerContent={DrawerContent}
      screenOptions={{ headerShown: false }}>
      <Drawer.Screen name={RouteName.DefaultDrawer} component={TabNavigator} />
    </Drawer.Navigator>
  )
}

export { DrawerNavigator }
