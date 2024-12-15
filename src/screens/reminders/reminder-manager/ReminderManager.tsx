import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import LottieView from 'lottie-react-native'

import { WelcomeLottie } from '@assets'
import { GBButton, GBModal, GBTextInput } from '@components'
import { ReminderManagerPreset, TextInputPreset } from '@constants'
import { translate } from '@locales'
import { Colors } from '@theme'
import { IReminderType } from '@types'
import { addReminder, deleteReminder, getPermissions } from '@utils'

import { styles } from './reminderManager.styles'

interface IReminderManagerProps {
  /** closeReminderManager : is a required prop that trigger to close reminder manager */
  closeReminderManager: () => void
  /** onReminderAdd : is an optional prop that trigger an action when an reminder get added */
  onReminderAdd?: (item: IReminderType) => void
  /** onReminderDelete : is an optional prop that trigger an action when an reminder get deleted */
  onReminderDelete?: (reminderId: string) => void
  /** reminderId : is an optional prop that gives id of reminder  */
  reminderId?: string
  /** title : is an optional prop that gives name of reminder */
  title?: string
  /** preset : is a required prop that gives preset of reminder */
  preset: ReminderManagerPreset
}

const ReminderManager = (props: IReminderManagerProps) => {
  const {
    closeReminderManager,
    title = '',
    preset,
    reminderId = '',
    onReminderAdd = () => {},
    onReminderDelete = () => {},
  } = props

  const [reminderTitle, setReminderTitle] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const isButtonDisable = preset === ReminderManagerPreset.Add && (!time || !reminderTitle)

  const titleValueChange = (value: string) => {
    setReminderTitle(value)
  }

  const titleDescriptionChange = (value: string) => {
    setDescription(value)
  }

  const toggleModalVisibility = () => {
    closeReminderManager()
  }

  const onPickerValueChange = (value: string) => {
    setTime(value)
  }

  const onAddPress = async () => {
    setIsLoading(true)
    const id = await addReminder({ time, title: reminderTitle, description })
    setIsLoading(false)
    onReminderAdd({ id, title: reminderTitle, time, description })
    closeReminderManager()
  }

  const onDeletePress = async () => {
    setIsLoading(true)
    await deleteReminder(reminderId)
    setIsLoading(false)
    onReminderDelete(reminderId)
    closeReminderManager()
  }

  const buttonTitle =
    preset === ReminderManagerPreset.Delete ? translate('common.delete') : translate('common.add')
  const onButtonPress = preset === ReminderManagerPreset.Delete ? onDeletePress : onAddPress
  const buttonStyles = preset === ReminderManagerPreset.Delete ? styles.deleteButton : {}
  const loaderColor =
    preset === ReminderManagerPreset.Delete ? Colors.DeleteButton : Colors.ActiveTab

  useEffect(() => {
    getPermissions()
  }, [])

  return (
    <GBModal isModalVisible onCloseModal={toggleModalVisibility} styles={styles.modalContainer}>
      <KeyboardAwareScrollView
        bottomOffset={15}
        contentContainerStyle={styles.container}
        enabled
        showsVerticalScrollIndicator={false}>
        <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
        {preset === ReminderManagerPreset.Delete ? (
          <Text style={styles.header}>
            {translate('screens.reminders.deletion_confirmation')} {title}
          </Text>
        ) : (
          <>
            <GBTextInput
              label={translate('screens.reminders.title')}
              onTextChange={titleValueChange}
              placeHolder={translate('placeholder.reminder_title')}
              preset={TextInputPreset.Default}
              value={reminderTitle}
            />
            <GBTextInput
              label={translate('screens.reminders.time')}
              onTextChange={onPickerValueChange}
              placeHolder={translate('placeholder.choose_time')}
              preset={TextInputPreset.TimePicker}
              value={time}
            />
            <GBTextInput
              label={translate('screens.reminders.Description')}
              onTextChange={titleDescriptionChange}
              placeHolder={translate('placeholder.enter_description')}
              preset={TextInputPreset.Multiline}
              value={description}
            />
          </>
        )}
        <View style={styles.buttonContainer}>
          <GBButton
            containerCustomStyles={[styles.button, styles.leftButton]}
            onPress={closeReminderManager}
            title={translate('common.cancel')}
          />
          {isLoading ? (
            <ActivityIndicator color={loaderColor} style={styles.loader} />
          ) : (
            <GBButton
              containerCustomStyles={[styles.button, buttonStyles]}
              isDisable={isButtonDisable}
              loaderStyles={styles.loader}
              onPress={onButtonPress}
              title={buttonTitle}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
    </GBModal>
  )
}

export default ReminderManager
