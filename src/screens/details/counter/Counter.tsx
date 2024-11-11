import React from 'react'
import { Text, View } from 'react-native'
import AnimatedNumber from 'react-native-animated-numbers'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'

import { HIT_SLOP_FIVE } from '@constants'
import { Colors } from '@theme'

import { styles } from './counter.styles'

interface ICounterProps {
  /** count: is a required prop that gives count number */
  count: number
  /** onIncrease: is a required prop that trigger an action on clicking increase button */
  onIncrease: () => void
  /** onDecrease: is a required prop that trigger an action on clicking decrease button */
  onDecrease: () => void
  /** label: is a required prop that gives label */
  label: string
}

const Counter = (props: ICounterProps) => {
  const { count, onDecrease, onIncrease, label } = props
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.subContainer}>
        <MinusCircleIcon
          color={Colors.ActiveTab}
          onPress={onDecrease}
          hitSlop={HIT_SLOP_FIVE}
          style={styles.button}
        />
        <AnimatedNumber
          includeComma
          animateToNumber={count}
          fontStyle={styles.count}
          containerStyle={styles.contentContainer}
        />
        <PlusCircleIcon color={Colors.ActiveTab} onPress={onIncrease} hitSlop={HIT_SLOP_FIVE} />
      </View>
    </View>
  )
}

export default Counter
