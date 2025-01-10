import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  CalendarDaysIcon,
  TrashIcon as DeleteIcon,
  PencilSquareIcon as EditIcon,
} from 'react-native-heroicons/solid'

import { DayPlannerPreset } from '@constants'
import { Colors } from '@theme'

import DayManager from '../day-manager/DayManager'

import { styles } from './days.styles'

interface IDaysCardProps {
  /** _id: is a required props that gives id */
  id: string
  /** onCardPress : is a required prop that get trigger on click of card */
  onCardPress: () => void
  /** title: is a required props that gives title */
  title: string
}

const DaysCard = (props: IDaysCardProps) => {
  const { id, onCardPress, title } = props
  const [isDayManagerOpen, setIsDayManagerOpen] = useState(false)
  const [preset, setPreset] = useState(DayPlannerPreset.UpdateDay)

  const onDeletePress = () => {
    setIsDayManagerOpen(true)
    setPreset(DayPlannerPreset.DeleteDay)
  }

  const onEditPress = () => {
    setIsDayManagerOpen(true)
    setPreset(DayPlannerPreset.UpdateDay)
  }

  const closeDayManager = () => {
    setIsDayManagerOpen(false)
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.subContainer} onPress={onCardPress}>
        <CalendarDaysIcon color={Colors.Secondary} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <EditIcon color={Colors.Secondary} onPress={onEditPress} />
        <DeleteIcon color={Colors.Error} onPress={onDeletePress} />
      </View>
      {isDayManagerOpen && (
        <DayManager dayId={id} dayName={title} preset={preset} closeDayManager={closeDayManager} />
      )}
    </View>
  )
}

export default DaysCard
