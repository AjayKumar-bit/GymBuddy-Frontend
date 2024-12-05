import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import LottieView from 'lottie-react-native'
import { observer } from 'mobx-react-lite'

import { WelcomeLottie } from '@assets'
import { GBButton, GBTextInput } from '@components'
import { ApiStatusPreset, DayPlannerPreset, TextInputPreset } from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { Colors } from '@theme'

import { styles } from './dayForm.styles'

interface IDayFormProps {
  /** currentDay:is an optional prop that gives current name of day */
  currentDay?: string
  /** dayId : is a required prop that given id of day */
  dayId: string
  /** preset : is a required prop that give preset of day form  */
  preset: DayPlannerPreset
  /** closeModal : is a required prop that trigger to close modal when required  */
  closeModal: () => void
}

const DayForm = observer((props: IDayFormProps) => {
  const { currentDay, dayId, closeModal, preset } = props

  const { apiStatusStore, domainStore } = useStore()
  const { plannerStore } = domainStore
  const { addDay, updateDay, deleteDay } = plannerStore
  const { getApiStatus } = apiStatusStore
  const { isLoading: isAddingDay } = getApiStatus(ApiStatusPreset.AddDay) ?? {}
  const { isLoading: isUpdatingDay } = getApiStatus(ApiStatusPreset.UpdateDay) ?? {}
  const { isLoading: isDeletingDay } = getApiStatus(ApiStatusPreset.DeleteDay) ?? {}

  const [data, setData] = useState('')

  const onAddPress = async () => {
    await addDay(data)
    !isAddingDay && closeModal()
  }

  const onUpdatePress = async () => {
    await updateDay(data, dayId)
    !isUpdatingDay && closeModal()
  }

  const onDeletePress = async () => {
    await deleteDay(dayId)
    !isDeletingDay && closeModal()
  }

  const getButtonData = () => {
    const buttonData = {
      apiStatusPreset: ApiStatusPreset.AddDay,
      buttonStyles: {},
      buttonTitle: translate('common.add'),
      label: translate('screens.planner.day_name'),
      loaderColor: Colors.ActiveTab,
      onButtonPress: onAddPress,
    }

    switch (preset) {
      case DayPlannerPreset.UpdateDay:
        Object.assign(buttonData, {
          apiStatusPreset: ApiStatusPreset.UpdateDay,
          buttonTitle: translate('common.update'),
          label: translate('screens.planner.new_day_name'),
          onButtonPress: onUpdatePress,
        })
        break

      case DayPlannerPreset.DeleteDay:
        Object.assign(buttonData, {
          apiStatusPreset: ApiStatusPreset.DeleteDay,
          buttonStyles: styles.deleteButton,
          buttonTitle: translate('common.delete'),
          label: '',
          loaderColor: Colors.DelateButton,
          onButtonPress: onDeletePress,
        })
        break
    }

    return buttonData
  }

  const { loaderColor, buttonStyles, apiStatusPreset, label, buttonTitle, onButtonPress } =
    getButtonData()

  const onTextChange = (value: string) => {
    setData(value)
  }

  return (
    <KeyboardAwareScrollView
      bottomOffset={15}
      contentContainerStyle={styles.container}
      enabled
      showsVerticalScrollIndicator={false}>
      <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
      {preset === DayPlannerPreset.DeleteDay && (
        <Text style={styles.header}>
          {translate('screens.planner.delete_confirmation')} {currentDay}
        </Text>
      )}
      {preset !== DayPlannerPreset.DeleteDay && (
        <GBTextInput
          label={label}
          onTextChange={onTextChange}
          placeHolder={translate('placeholder.enter_day_name')}
          preset={TextInputPreset.Default}
        />
      )}
      <View style={styles.buttonContainer}>
        <GBButton
          containerCustomStyles={[styles.button, styles.leftButton]}
          onPress={closeModal}
          title={translate('common.cancel')}
        />
        <GBButton
          apiStatusPreset={apiStatusPreset}
          containerCustomStyles={[styles.button, buttonStyles]}
          isDisable={preset === DayPlannerPreset.DeleteDay ? false : !data}
          loaderColor={loaderColor}
          loaderStyles={styles.loader}
          onPress={onButtonPress}
          title={buttonTitle}
        />
      </View>
    </KeyboardAwareScrollView>
  )
})

export default DayForm
