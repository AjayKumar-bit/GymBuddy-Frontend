import React, { useCallback, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import LottieView from 'lottie-react-native'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

import { WelcomeLottie } from '@assets'
import { GBButton, GBModal, GBTextInput } from '@components'
import {
  ApiStatusPreset,
  FieldType,
  PROFILE_DEFAULT_DATA,
  ProfileManagerPreset,
  TextInputPreset,
} from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { Colors } from '@theme'
import { INavigation, IProfileDataTypes } from '@types'
import { getEmailError, getNameError, getPasswordErrors, getPlannerDateError } from '@utils'

import { styles } from './profileManager.styles'

interface IProfileManagerProps {
  /** preset : is a required prop that gives preset of day profile manager  */
  preset: ProfileManagerPreset
  /** closeProfileManager : is a required prop that trigger to close profile manager */
  closeProfileManager: () => void
}
const ProfileManager = observer((props: IProfileManagerProps) => {
  const { closeProfileManager, preset } = props
  const { domainStore, apiStatusStore } = useStore()
  const { exerciseStore, userStore } = domainStore
  const { getTodaysExercises } = exerciseStore
  const { deleteUser, changePassword, addPlannerDate, updateUser, userData } = userStore
  const { hasSuccess } = apiStatusStore.getApiStatus(ApiStatusPreset.DeleteUser) ?? {}

  const navigation = useNavigation<INavigation>()

  const [data, setData] = useState(PROFILE_DEFAULT_DATA)
  const [errorMessage, setErrorMessage] = useState<IProfileDataTypes>(PROFILE_DEFAULT_DATA)

  const isValidRef = useRef(true)
  const { confirmPassword, emailId, name, newPassword, oldPassword, plannerDate } = data

  const onTextChange = (key: FieldType) => (value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }))
  }
  const updateDetails = async () => {
    if (preset === ProfileManagerPreset.NameUpdate) {
      setErrorMessage(PROFILE_DEFAULT_DATA)
      getNameError(setErrorMessage, isValidRef, name, userData.name)
      if (isValidRef.current) {
        await updateUser({ name })
        closeProfileManager()
      }
    } else {
      setErrorMessage(PROFILE_DEFAULT_DATA)
      getEmailError(setErrorMessage, isValidRef, emailId, userData.emailId)
      if (isValidRef.current) {
        await updateUser({ emailId })
        closeProfileManager()
      }
    }
  }
  const deleteAccount = async () => {
    await deleteUser()
    closeProfileManager()
    hasSuccess && navigation.goBack()
  }

  const updatePlannerDate = async () => {
    const date = moment(plannerDate, 'DD/MM/YYYY').toLocaleString()
    setErrorMessage(PROFILE_DEFAULT_DATA)
    getPlannerDateError(setErrorMessage, isValidRef, date, userData.plannerStartDate)
    if (isValidRef.current) {
      await addPlannerDate({ plannerStartDate: date })
      getTodaysExercises()
      closeProfileManager()
    }
  }

  const updatePassword = async () => {
    setErrorMessage(PROFILE_DEFAULT_DATA)
    getPasswordErrors(setErrorMessage, isValidRef, {
      confirmPassword,
      newPassword,
      oldPassword,
    })
    if (isValidRef.current) {
      await changePassword({ oldPassword, newPassword })
      closeProfileManager()
    }
  }

  const getButtonData = useCallback(() => {
    const details = {
      onButtonPress: updateDetails,
      buttonTitle: translate('common.update'),
      apiStatusPreset: ApiStatusPreset.UpdateUser,
      loaderColor: Colors.ActiveTab,
      buttonStyles: {},
      isDisable: !name && !emailId,
    }
    switch (preset) {
      case ProfileManagerPreset.changePassword:
        Object.assign(details, {
          apiStatusPreset: ApiStatusPreset.ChangePassword,
          onButtonPress: updatePassword,
          isDisable: !confirmPassword || !newPassword || !oldPassword,
        })
        break
      case ProfileManagerPreset.DeleteAccount:
        Object.assign(details, {
          apiStatusPreset: ApiStatusPreset.DeleteUser,
          buttonStyles: styles.deleteButton,
          buttonTitle: translate('common.delete'),
          loaderColor: Colors.DeleteButton,
          onButtonPress: deleteAccount,
          isDisable: false,
        })
        break
      case ProfileManagerPreset.PlannerDateUpdate:
        Object.assign(details, {
          apiStatusPreset: ApiStatusPreset.AddPlannerDate,
          buttonTitle: translate('common.update'),
          onButtonPress: updatePlannerDate,
          isDisable: !plannerDate,
        })
        break
    }
    return details
  }, [preset, data])

  const { apiStatusPreset, buttonStyles, buttonTitle, loaderColor, onButtonPress, isDisable } =
    getButtonData()

  return (
    <GBModal isModalVisible onCloseModal={closeProfileManager} styles={styles.container}>
      <View style={styles.subContainer}>
        <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
        {preset === ProfileManagerPreset.NameUpdate && (
          <GBTextInput
            label={translate('screens.profile.updated_name')}
            onTextChange={onTextChange(FieldType.Name)}
            placeHolder={translate('placeholder.updated_name')}
            preset={TextInputPreset.Default}
            value={data[FieldType.Name]}
            errorMessage={errorMessage.name}
          />
        )}
        {preset === ProfileManagerPreset.EmailUpdate && (
          <GBTextInput
            label={translate('screens.profile.updated_emailId')}
            onTextChange={onTextChange(FieldType.EmailId)}
            placeHolder={translate('placeholder.updated_emailId')}
            preset={TextInputPreset.Email}
            value={data[FieldType.EmailId]}
            errorMessage={errorMessage.emailId}
          />
        )}
        {preset === ProfileManagerPreset.changePassword && (
          <>
            <GBTextInput
              label={translate('screens.profile.old_password')}
              onTextChange={onTextChange(FieldType.OldPassWord)}
              placeHolder={translate('placeholder.old_password')}
              preset={TextInputPreset.Default}
              value={data[FieldType.OldPassWord]}
              errorMessage={errorMessage.oldPassword}
            />
            <GBTextInput
              label={translate('screens.profile.new_password')}
              onTextChange={onTextChange(FieldType.NewPassword)}
              placeHolder={translate('placeholder.new_password')}
              preset={TextInputPreset.Default}
              value={data[FieldType.NewPassword]}
              errorMessage={errorMessage.newPassword}
            />
            <GBTextInput
              label={translate('screens.profile.confirm_password')}
              onTextChange={onTextChange(FieldType.ConfirmPassword)}
              placeHolder={translate('placeholder.confirm_password')}
              preset={TextInputPreset.Default}
              value={data[FieldType.ConfirmPassword]}
              errorMessage={errorMessage.confirmPassword}
            />
          </>
        )}
        {preset === ProfileManagerPreset.PlannerDateUpdate && (
          <GBTextInput
            label={translate('screens.profile.updated_date')}
            onTextChange={onTextChange(FieldType.PlannerDate)}
            placeHolder={translate('placeholder.select_date')}
            preset={TextInputPreset.DatePicker}
            value={data[FieldType.PlannerDate]}
            errorMessage={errorMessage.plannerDate}
          />
        )}
        {preset === ProfileManagerPreset.DeleteAccount && (
          <Text style={styles.header}>{translate('screens.profile.deletion_confirmation')}</Text>
        )}
        <View style={styles.buttonContainer}>
          <GBButton
            containerCustomStyles={[styles.button, styles.leftButton]}
            onPress={closeProfileManager}
            title={translate('common.cancel')}
          />
          <GBButton
            apiStatusPreset={apiStatusPreset}
            containerCustomStyles={[styles.button, buttonStyles]}
            isDisable={isDisable}
            loaderColor={loaderColor}
            loaderStyles={styles.loader}
            onPress={onButtonPress}
            title={buttonTitle}
          />
        </View>
      </View>
    </GBModal>
  )
})
export default ProfileManager
