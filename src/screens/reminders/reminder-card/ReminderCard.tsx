import React from 'react'
import { Text, View } from 'react-native'
import { BellIcon, TrashIcon as DeleteIcon } from 'react-native-heroicons/solid'

import { Colors, CommonStyles } from '@theme'

import { styles } from './reminderCard.styles'

interface IReminderCardProps {
  /** description : is a required prop that reminders description */
  description: string
  /** onDeletePress : is a required prop that get trigger on click of deleteIcon */
  onDeletePress: () => void
  /** title: is a required props that gives title */
  title: string
  /** time: is a required props that gives time */
  time: string
}

const ReminderCard = (props: IReminderCardProps) => {
  const { onDeletePress, title, time, description = '' } = props
  const containerStyles = description ? {} : styles.subContainerSecondary

  return (
    <View style={[styles.container, containerStyles]}>
      <BellIcon color={Colors.ActiveTab} />
      <View style={styles.subContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, CommonStyles.flex_1]}>{title}</Text>
          <Text style={[styles.title, styles.time]}>{time}</Text>
        </View>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <DeleteIcon color={Colors.Error} onPress={onDeletePress} />
    </View>
  )
}

export default ReminderCard
