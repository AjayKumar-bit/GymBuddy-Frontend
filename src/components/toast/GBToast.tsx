import React, { useEffect } from 'react'
import { StyleProp, Text, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import LottieView from 'lottie-react-native'

import { DoneLottie, ErrorLottie, InfoLottie } from '@assets'
import { ToastPreset } from '@constants'
import { useStore } from '@stores'
import { Colors } from '@theme'

import { styles } from './gbToast.styles'

interface IGBToastProps {
  /** isApiResponseToast: is an optional prop that tells weather toast is ApiResponseToast or normal toast */
  isApiResponseToast?: boolean
  /** isVisible: is a required prop that tells weather toast is visible or not */
  isVisible: boolean
  /** message: is a required prop that give message to be shown */
  message: string
  /** preset: is a required prop that give preset of toast */
  preset: ToastPreset
}

const GBToast = (props: IGBToastProps) => {
  const { isVisible, message, preset, isApiResponseToast = false } = props

  const { viewStore } = useStore()
  const { setValidationToastData } = viewStore

  const duration = 3000

  const translateY = useSharedValue(0)
  const getToastDetails = () => {
    let containerStyles: StyleProp<ViewStyle>
    let lottie
    switch (preset) {
      case ToastPreset.Error:
        containerStyles = {
          backgroundColor: Colors.ToastError,
        }
        lottie = ErrorLottie
        break

      case ToastPreset.Info:
        containerStyles = {
          backgroundColor: Colors.ToastInfo,
        }
        lottie = InfoLottie
        break
      default:
        containerStyles = {
          backgroundColor: Colors.ToastSuccess,
        }
        lottie = DoneLottie
        break
    }
    return { containerStyles, lottie }
  }

  const { containerStyles, lottie } = getToastDetails()

  useEffect(() => {
    if (isVisible) {
      translateY.value = withTiming(-150, {
        duration: 500,
        easing: Easing.out(Easing.ease),
      })
      setTimeout(() => {
        translateY.value = withTiming(150, {
          duration: 500,
          easing: Easing.in(Easing.ease),
        })
        isApiResponseToast &&
          setTimeout(() => {
            setValidationToastData({
              isVisible: false,
              message: '',
              preset: ToastPreset.Info,
            })
          }, 500)
      }, duration)
    }
  }, [isVisible])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    }
  })

  return (
    <Animated.View style={[styles.toastContainer, animatedStyle, containerStyles]}>
      <LottieView source={lottie} autoPlay style={styles.lottie} />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  )
}

export default GBToast
