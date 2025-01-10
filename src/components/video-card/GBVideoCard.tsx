import React, { useEffect, useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { BookMarkIcon, UnMarkIcon } from '@assets'
import { ResizeMode } from '@constants'
import { Sizes } from '@theme'

import GBFastImage from '../fast-image/GBFastImage'

import { styles } from './gbVideoCard.styles'

interface IGBVideoCardProps {
  /** containerStyles: is an optional prop that gives container styles */
  containerStyles?: StyleProp<ViewStyle>
  /** isAddingState: is an optional prop that tell whether is adding state or not  */
  isAddingState?: boolean
  /** isRemovingVideos: is an optional prop that tell whether is removing video state or not  */
  isRemovingVideos?: boolean
  /** imageUrl: is a required prop that give image url */
  imageUrl: string
  /** onBookmarkPress: is an optional prop that trigger an action on click of bookmark icon */
  onBookmarkPress?: () => void
  /** onPress: is a required prop that trigger an action on click of card */
  onPress: () => void
  /** onPress: is a required prop that trigger an action on click of card to remove video */
  onRemove?: () => void
  /** title: is a required prop that give title */
  title: string
}

const GBVideoCard = (props: IGBVideoCardProps) => {
  const {
    containerStyles,
    imageUrl,
    isAddingState = false,
    isRemovingVideos = false,
    onBookmarkPress = () => {},
    onPress,
    onRemove = () => {},
    title,
  } = props
  const [isBookMarked, setIsBookMarked] = useState(false)
  const [isRemoveMarked, setIsRemoveMarked] = useState(false)
  const removeBorderStyle = isRemoveMarked && isRemovingVideos ? styles.containerSecondary : {}
  const borderStyles = isBookMarked ? styles.border : {}

  const toggleState = () => {
    setIsBookMarked(prev => !prev)
    onBookmarkPress()
  }

  const OnRemoveVideo = () => {
    setIsRemoveMarked(prev => !prev)
    onRemove()
  }

  const renderIcon = () =>
    isBookMarked ? (
      <BookMarkIcon
        height={Sizes.Size_28}
        onPress={toggleState}
        style={styles.icon}
        width={Sizes.Size_28}
      />
    ) : (
      <UnMarkIcon
        height={Sizes.Size_28}
        onPress={toggleState}
        style={styles.icon}
        width={Sizes.Size_28}
      />
    )

  const onCardPress = isRemovingVideos ? OnRemoveVideo : onPress

  useEffect(() => {
    !isAddingState && setIsBookMarked(false)
  }, [isAddingState])

  useEffect(() => {
    isRemovingVideos && setIsRemoveMarked(false)
  }, [isRemovingVideos])

  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={[styles.container, borderStyles, containerStyles, removeBorderStyle]}>
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

export default GBVideoCard
