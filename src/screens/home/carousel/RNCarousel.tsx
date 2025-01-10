/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { interpolate, useSharedValue } from 'react-native-reanimated'
import Carousel, { TAnimationStyle } from 'react-native-reanimated-carousel'

import { RNCarouselPreset, SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants'

import { styles } from './rnCarousel.styles'

interface RNCarouselProps {
  /** data: is a required prop that gives the data for carousel */
  data: any
  /** preset: is an optional prop that gives the preset of the carousel. */
  preset?: RNCarouselPreset
  /** renderItem: is a required prop that specifies a function to render item in the carousel. */
  renderItem: (item: any) => React.ReactElement
  /** autoPlay: is an optional prop that enables or disables the autoplay feature of the carousel. */
  autoPlay?: boolean
  /** style: is an optional prop that gives custom styles for the container of the carousel. */
  style?: StyleProp<ViewStyle>
  /** width: is an optional prop that gives the width of carousel. */
  width?: number
  /** modeConfig: is an optional prop that gives configuration options for the animation mode. */
  modeConfig?: any
  /** height: is an optional prop that gives the height of carousel. */
  height?: number
}

const RNCarousel = (props: RNCarouselProps) => {
  const {
    data,
    preset = RNCarouselPreset.Parallax,
    renderItem,
    autoPlay = true,
    style = {},
    width = SCREEN_WIDTH * 0.5,
    modeConfig = {
      parallaxScrollingScale: 0.86,
      parallaxScrollingOffset: 50,
    },
    height = SCREEN_HEIGHT * 0.24,
  } = props
  const progress = useSharedValue<number>(0)
  const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
    'worklet'

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30])
    const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0])
    const translateX = interpolate(value, [-1, 0, 1], [-SCREEN_WIDTH, 0, SCREEN_WIDTH])

    return {
      zIndex,
      opacity,
      translateX,
    }
  }, [])

  return (
    <View>
      <Carousel
        autoPlay={autoPlay}
        customAnimation={preset === RNCarouselPreset.QuickSWipe ? animationStyle : null}
        data={data}
        height={height}
        loop
        minScrollDistancePerSwipe={10}
        mode="parallax"
        modeConfig={modeConfig}
        onProgressChange={progress}
        renderItem={renderItem}
        scrollAnimationDuration={1000}
        snapEnabled
        style={[styles.container, style]}
        width={width}
      />
    </View>
  )
}

export default RNCarousel
