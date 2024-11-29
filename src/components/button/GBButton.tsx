import React from 'react'
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native'

import { observer } from 'mobx-react-lite'

import { ApiStatusPreset } from '@constants'
import { useStore } from '@stores'
import { Colors } from '@theme'

import { styles } from './gbButton.styles'

interface IGBButtonProps {
  /** apiStatusPreset: is optional props that give apiStatus preset */
  apiStatusPreset?: ApiStatusPreset
  /** containerCustomStyles: is an optional prop that gives container styles */
  containerCustomStyles?: StyleProp<ViewStyle>
  /** isDisable: is optional props that tells weather button is disabled or not */
  isDisable?: boolean
  /** leftIcon:is an optional prop that gives left icon */
  leftIcon?: React.FC
  /** onPress: is a required prop that trigger an action on click of button */
  onPress: () => void
  /** rightIcon: is an optional prop that gives right icon */
  rightIcon?: React.FC
  /** title: is a required prop that gives title of button */
  title: string
}

const GBButton = observer((props: IGBButtonProps) => {
  const {
    apiStatusPreset = '',
    containerCustomStyles = {},
    isDisable = false,
    leftIcon: LeftIcon = null,
    onPress,
    rightIcon: RightIcon = null,
    title,
  } = props

  const { apiStatusStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(apiStatusPreset) ?? {}

  const containerStyle = isDisable ? styles.disableContainer : styles.activeContainer

  return isLoading ? (
    <ActivityIndicator color={Colors.ActiveTab} style={styles.loader} />
  ) : (
    <TouchableOpacity
      disabled={isDisable}
      onPress={onPress}
      style={[styles.container, containerStyle, containerCustomStyles]}>
      {LeftIcon && <LeftIcon />}
      <Text style={styles.title}>{title}</Text>
      {RightIcon && <RightIcon />}
    </TouchableOpacity>
  )
})

export default GBButton
