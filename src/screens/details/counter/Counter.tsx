import React from 'react'
import { Text, View } from 'react-native'
import AnimatedNumber from 'react-native-animated-numbers'
import { MinusIcon, PlusIcon } from 'react-native-heroicons/solid'

import { HIT_SLOP_FIVE } from '@constants'
import { Colors } from '@theme'

import { styles } from './counter.styles'

interface ICounterProps {
  /** count: is a required prop that gives count number */
  count: number
  /** isPlannerEnable: is an optional prop that tell wether is exercise getting adding by planner */
  isPlannerEnable?: boolean
  /** onIncrease: is a required prop that trigger an action on clicking increase button */
  onIncrease: () => void
  /** onDecrease: is a required prop that trigger an action on clicking decrease button */
  onDecrease: () => void
  /** label: is a required prop that gives label */
  label: string
}

const Counter = (props: ICounterProps) => {
  const { count, isPlannerEnable, onDecrease, onIncrease, label } = props
  const containerStyles = isPlannerEnable ? styles.containerSecondary : {}
  const contentContainerStyles = isPlannerEnable ? {} : styles.contentContainerSecondary
  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.subContainer}>
        {isPlannerEnable && (
          <MinusIcon color={Colors.Primary} onPress={onDecrease} hitSlop={HIT_SLOP_FIVE} />
        )}
        <AnimatedNumber
          animationDuration={500}
          includeComma
          animateToNumber={count}
          fontStyle={styles.count}
          containerStyle={[styles.contentContainer, contentContainerStyles]}
        />
        {isPlannerEnable && (
          <PlusIcon color={Colors.Primary} onPress={onIncrease} hitSlop={HIT_SLOP_FIVE} />
        )}
      </View>
    </View>
  )
}

export default Counter
