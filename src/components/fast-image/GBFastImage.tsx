import React, { useState } from 'react'
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import { StyleProp } from 'react-native/types'

import { NoImage } from '@assets'
import { ResizeMode } from '@constants'

import { styles } from './gbFastImage.styles'

interface IGBFastImageProps extends FastImageProps {
  /** imageStyles: is an optional prop that give styles of image */
  imageStyles?: StyleProp<ImageStyle>
  /** resizeMode: is an optional prop that give resizeMode */
  resizeMode?: ResizeMode
}

const GBFastImage = (props: IGBFastImageProps) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const { source, imageStyles = {}, resizeMode = ResizeMode.contain } = props
  const [isLoading, setIsLoading] = useState(true)
  const [imageSource, setImageSource] = useState(source)
  const fallbackImage = NoImage

  const onImageError = () => {
    setImageSource(fallbackImage)
  }

  return (
    <FastImage
      {...props}
      source={imageSource}
      onLoadStart={() => setIsLoading(true)}
      onLoadEnd={() => setIsLoading(false)}
      onError={onImageError}
      style={[styles.image, imageStyles]}
      resizeMode={resizeMode}>
      {isLoading && (
        <ShimmerPlaceholder
          shimmerStyle={[styles.image, imageStyles]}
          // TODO : need to check these color , for finalization.
          shimmerColors={['#515555', '#7E8A8A', '#7E8A80']}
        />
      )}
    </FastImage>
  )
}

export default GBFastImage
