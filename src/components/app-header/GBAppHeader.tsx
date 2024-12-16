import React from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { ChevronLeftIcon as BackIcon } from 'react-native-heroicons/outline'
import { SvgProps } from 'react-native-svg'

import { useNavigation } from '@react-navigation/native'

import { HIT_SLOP_FIVE } from '@constants'
import { Colors } from '@theme'
import { INavigation } from '@types'

import styles from './gbAppHeader.styles'

interface IGBAppHeaderProps {
  /** showBackButton: is an optional prop that determines whether to show the back button or not */
  showBackButton?: boolean
  /** title: is a required prop that gives the title */
  title: string
}

const GBAppHeader = (props: IGBAppHeaderProps) => {
  const { showBackButton = true, title } = props
  const navigation = useNavigation<INavigation>()
  // const leftIcon = showBackButton ? BackIcon : HamburgerIcon // Note: will uncomment in future
  const leftIcon = BackIcon

  const onLeftIconPress = () => {
    // showBackButton ? navigation.goBack() : navigation.dispatch(DrawerActions.openDrawer()) // Note: will uncomment in future
    navigation.goBack()
  }

  const renderIcon = (renderIconData: { icon: React.FC<SvgProps>; onPress: () => void }) => {
    const { icon: Icon, onPress } = renderIconData

    return (
      <TouchableOpacity onPress={onPress} hitSlop={HIT_SLOP_FIVE}>
        <Icon color={Colors.Label} />
      </TouchableOpacity>
    )
  }

  const startIconData = {
    icon: leftIcon,
    onPress: onLeftIconPress,
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.TextInputBackground} barStyle="dark-content" />
      <View style={styles.subContainer}>
        {showBackButton && renderIcon(startIconData)}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </View>
  )
}

export default GBAppHeader
