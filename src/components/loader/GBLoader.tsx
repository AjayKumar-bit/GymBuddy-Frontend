import React from 'react'
import { StyleProp, Text, View, ViewStyle } from 'react-native'

import LottieView from 'lottie-react-native'

import { ExerciseLottie } from '@assets'
import { LoaderSize } from '@constants'
import { translate } from '@locales'

import { styles } from './gbLoader.styles'

interface IGBLoaderProps {
  /** size: is an optional prop that gives size of loader */
  size?: LoaderSize
  /** title: is an optional prop that gives title */
  title?: string
}

const GBLoader = (props: IGBLoaderProps) => {
  const { size = LoaderSize.Medium, title = translate('common.loading') } = props

  const loaderSize = () => {
    let loaderStyles: StyleProp<ViewStyle>

    switch (size) {
      case LoaderSize.Large:
        loaderStyles = styles.large
        break
      case LoaderSize.Small:
        loaderStyles = styles.small
        break
      default:
        loaderStyles = styles.medium
        break
    }

    return loaderStyles
  }

  const loaderStyles = loaderSize()

  return (
    <View style={styles.container}>
      <LottieView source={ExerciseLottie} autoPlay style={loaderStyles} />
      <Text style={styles.title}>{title}....</Text>
    </View>
  )
}

export default GBLoader
