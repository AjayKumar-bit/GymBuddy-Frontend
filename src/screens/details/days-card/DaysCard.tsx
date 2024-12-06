import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import { CheckedIcon, UncheckedIcon } from '@assets'

import { styles } from './days.styles'

interface IDaysCardProps {
  /** dayName: is a required props that gives day name */
  dayName: string
  /** onCardPress : is a required prop that get trigger on click of card */
  onCardPress: () => void
}

const DaysCard = (props: IDaysCardProps) => {
  const { onCardPress, dayName } = props

  const [isDaySelected, setIsDaySelected] = useState(false)

  const onPress = () => {
    setIsDaySelected(prev => !prev)
    onCardPress()
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {isDaySelected ? <CheckedIcon /> : <UncheckedIcon />}
      <Text style={styles.title}>{dayName}</Text>
    </TouchableOpacity>
  )
}

export default DaysCard
