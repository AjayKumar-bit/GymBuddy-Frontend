import React, { useEffect, useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'

import { useNetInfo } from '@react-native-community/netinfo'

import LottieView from 'lottie-react-native'
import { observer } from 'mobx-react-lite'

import { ExerciseLottie } from '@assets'
import { LoaderSize } from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'

import { styles } from './gbLoader.styles'

interface IGBLoaderProps {
  /** fetchData: is an optional prop that give action to fetch data again */
  fetchData?: () => void
  /** retryEnabled : is an optional prop that tell is retry data fetching enable or not */
  retryEnabled?: boolean
  /** size: is an optional prop that gives size of loader */
  size?: LoaderSize
  /** title: is an optional prop that gives title */
  title?: string
}

const GBLoader = observer((props: IGBLoaderProps) => {
  const {
    fetchData = () => {},
    retryEnabled = false,
    size = LoaderSize.Medium,
    title = translate('common.loading'),
  } = props
  const { isConnected } = useNetInfo()
  const { apiStatusStore } = useStore()
  const { isInterneDisconnected, setInternetDisconnect } = apiStatusStore
  const [triedAgain, setTriedAgain] = useState(true)

  const onPress = () => {
    fetchData()
    setTriedAgain(prev => !prev)
  }

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

  useEffect(() => {
    if (isConnected === false) {
      setInternetDisconnect()
      setTriedAgain(true)
    }
  }, [isConnected])

  return (
    <View style={styles.container}>
      <LottieView source={ExerciseLottie} autoPlay style={loaderStyles} />
      <Text style={styles.title}>{title}</Text>
      {triedAgain && isInterneDisconnected && retryEnabled && (
        <TouchableOpacity onPress={onPress}>
          <Text style={[styles.title, styles.tryAgain]}>{translate('common.try_again')}</Text>
        </TouchableOpacity>
      )}
    </View>
  )
})

export default GBLoader
