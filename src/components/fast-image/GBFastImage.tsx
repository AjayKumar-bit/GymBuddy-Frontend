import React, { useState } from 'react'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'

import { NoImage } from '@assets'

import { styles } from './gbFastImage.styles'

const GBFastImage = (props: FastImageProps) => {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
  const { source } = props
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
      style={styles.image}
      resizeMode="contain">
      {isLoading && (
        <ShimmerPlaceholder
          shimmerStyle={styles.image}
          // TODO : need to check these color , for finalization.
          shimmerColors={['#515555', '#7E8A8A', '#7E8A80']}
        />
      )}
    </FastImage>
  )
}

export default GBFastImage
