import React from 'react'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import moment from 'moment'

import { DateTimePickerMode } from '@constants'
import { Colors } from '@theme'

interface IGBDateTimePickerProps {
  /** mode: is a required prop that gives the mode for date and time picker */
  mode: DateTimePickerMode
  /** onChange: is a required prop that triggers an action to handle date and time */
  onChange: (date: Date) => void
  /** onPickerClose: is a required prop that triggers an action to close the picker */
  onPickerClose: () => void
  /** showPicker: is a required prop that tells whether to show the picker or not */
  showPicker: boolean
}

const GBDateTimePicker = (props: IGBDateTimePickerProps) => {
  const { mode, onChange, onPickerClose, showPicker } = props

  const currentTime = moment().format()

  const onConfirm = (date: Date) => {
    onChange(date)
    onPickerClose()
  }

  return (
    <DateTimePickerModal
      textColor={Colors.Primary}
      accentColor={Colors.Primary}
      isVisible={showPicker}
      minimumDate={new Date(currentTime)}
      mode={mode}
      onCancel={onPickerClose}
      onConfirm={onConfirm}
      negativeButton={{ textColor: Colors.Primary }}
      positiveButton={{ textColor: Colors.Primary }}
    />
  )
}

export default GBDateTimePicker
