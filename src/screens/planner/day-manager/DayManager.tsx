import React from 'react'

import { GBModal } from '@components'
import { DayPlannerPreset } from '@constants'

import DayForm from '../day-form/DayForm'

import { styles } from './dayManager.styles'

interface IDayManagerProps {
  /** dayId : is an optional prop that gives id of day  */
  dayId?: string
  /** dayName : is an optional prop that gives name of day  */
  dayName?: string
  /** dayName : is a required prop that gives preset of day planner  */
  preset: DayPlannerPreset
  /** closeDayManager : is a required prop that trigger to close day planner manager */
  closeDayManager: () => void
}

const DayManager = (props: IDayManagerProps) => {
  const { closeDayManager, dayId = '', dayName = '', preset } = props

  const toggleModalVisibility = () => {
    closeDayManager()
  }

  return (
    <GBModal isModalVisible onCloseModal={toggleModalVisibility} styles={styles.container}>
      <DayForm
        dayId={dayId}
        currentDay={dayName}
        preset={preset}
        closeModal={toggleModalVisibility}
      />
    </GBModal>
  )
}

export default DayManager
