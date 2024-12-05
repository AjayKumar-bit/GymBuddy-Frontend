import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { BookMarkIcon, UnMarkIcon } from '@assets'
import { ResizeMode } from '@constants'
import { Sizes } from '@theme'

import GBFastImage from '../fast-image/GBFastImage'

import { styles } from './gbExercise.styles'

interface IGBExerciseCardProps {
  /** containerStyles: is an optional prop that gives container styles */
  containerStyles?: StyleProp<ViewStyle>
  /** isAddingState: is an optional prop that tell whether is adding state or not  */
  isAddingState?: boolean
  /** imageUrl: is a required prop that give image url */
  imageUrl: string
  /** onPress: is a required prop that trigger an action on click of card */
  onPress: () => void
  /** title: is a required prop that give title */
  title: string
}

const GBExerciseCard = (props: IGBExerciseCardProps) => {
  const { containerStyles, isAddingState = false, imageUrl, onPress, title } = props
  const [isBookMarked, setIsBookMarked] = useState(false)

  const toggleState = () => {
    setIsBookMarked(prev => !prev)
  }

  const renderIcon = () =>
    isBookMarked ? (
      <BookMarkIcon
        height={Sizes.Size_28}
        width={Sizes.Size_28}
        onPress={toggleState}
        style={styles.icon}
      />
    ) : (
      <UnMarkIcon
        height={Sizes.Size_28}
        width={Sizes.Size_28}
        onPress={toggleState}
        style={styles.icon}
      />
    )

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, containerStyles]}>
      <GBFastImage
        imageStyles={styles.image}
        resizeMode={ResizeMode.Stretch}
        source={{ uri: imageUrl }}
      />
      <View style={styles.subContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {isAddingState && renderIcon()}
      </View>
    </TouchableOpacity>
  )
}

export default GBExerciseCard
