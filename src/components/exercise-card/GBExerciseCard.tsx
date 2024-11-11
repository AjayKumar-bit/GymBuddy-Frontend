import React from 'react'
import { StyleProp, Text, TouchableOpacity, ViewStyle } from 'react-native'

import { ResizeMode } from '@constants'

import GBFastImage from '../fast-image/GBFastImage'

import { styles } from './gbExercise.styles'

interface IGBExerciseCardProps {
  /** containerStyles: is an optional prop that gives container styles */
  containerStyles?: StyleProp<ViewStyle>
  /** imageUrl: is a required prop that give image url */
  imageUrl: string
  /** onPress: is a required prop that trigger an action on click of card */
  onPress: () => void
  /** title: is a required prop that give title */
  title: string
}

const GBExerciseCard = (props: IGBExerciseCardProps) => {
  const { containerStyles, imageUrl, onPress, title } = props

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyles]}>
      <GBFastImage
        imageStyles={styles.image}
        resizeMode={ResizeMode.Stretch}
        source={{ uri: imageUrl }}
      />
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default GBExerciseCard
