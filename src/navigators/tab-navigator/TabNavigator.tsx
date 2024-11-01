import { Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TAB_DATA } from '@constants'
import { Colors } from '@theme'
import { SvgProps } from 'react-native-svg'
import { styles } from './tabNavigator.styles'

const RenderIcon =
  (Icon: React.FC<SvgProps>, name: string) =>
  ({ focused }: { focused: boolean }) => {
    const tabColor = focused ? Colors.ActiveTab : Colors.InactiveTab
    const labelStyle = focused ? styles.activeLabel : styles.inactiveLabel

    return (
      <View style={styles.iconContainer}>
        <Icon color={tabColor} />
        <Text style={labelStyle}>{name}</Text>
      </View>
    )
  }

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator()

  const renderScreen = () =>
    TAB_DATA.map(item => {
      const { component, icon: Icon, name } = item

      return (
        <Tab.Screen
          component={component}
          key={name}
          name={name}
          options={{
            tabBarShowLabel: false,
            // Pass RenderIcon as a function, with Icon and name as arguments
            tabBarIcon: RenderIcon(Icon, name),
          }}
        />
      )
    })

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
      }}>
      {renderScreen()}
    </Tab.Navigator>
  )
}
