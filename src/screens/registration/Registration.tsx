import React, { useEffect, useRef, useState } from 'react'
import { StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller'

import { useNavigation } from '@react-navigation/native'

import LottieView from 'lottie-react-native'
import { observer } from 'mobx-react-lite'

import { WelcomeLottie } from '@assets'
import { GBButton, GBTextInput } from '@components'
import {
  ApiStatusPreset,
  HIT_SLOP_FIVE,
  RouteName,
  TextInputKey,
  TextInputPreset,
} from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { Colors } from '@theme'
import { INavigation } from '@types'
import { getErrorMessages } from '@utils'

import { styles } from './registration.styles'

const Registration = observer(() => {
  const { domainStore } = useStore()
  const { userStore } = domainStore
  const { registerUser } = userStore

  const navigation = useNavigation<INavigation>()

  const [data, setData] = useState({
    name: '',
    emailId: '',
    password: '',
    confirmPassword: '',
  })
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    emailId: '',
    password: '',
    confirmPassword: '',
  })

  const [isRegistrationDisabled, setIsRegistrationDisabled] = useState(true)
  const isFieldsValidRef = useRef(true)

  const onRegisterPress = async () => {
    setErrorMessages({
      name: '',
      emailId: '',
      password: '',
      confirmPassword: '',
    })

    getErrorMessages(setErrorMessages, isFieldsValidRef, data)
    if (isFieldsValidRef.current) {
      const registrationData = { ...data, emailId: data.emailId.toLowerCase() }
      await registerUser(registrationData)
    }
  }

  const onLoginPress = () => {
    navigation.navigate(RouteName.Login)
  }

  const onTextChange = (key: TextInputKey) => (value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    const isAllFieldCompleted = Object.values(data).every(item => item.length > 0)
    setIsRegistrationDisabled(!isAllFieldCompleted)
  }, [data])

  return (
    <KeyboardAwareScrollView
      bottomOffset={15}
      enabled
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={Colors.HeaderBackGround} barStyle="dark-content" />
      <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
      <Text style={styles.header}>{translate('screens.registration.header')}</Text>
      <Text style={styles.subHeader}>{translate('screens.registration.create_account')}</Text>
      <GBTextInput
        label={translate('screens.registration.name')}
        onTextChange={onTextChange(TextInputKey.Name)}
        placeHolder={translate('placeholder.name')}
        preset={TextInputPreset.Default}
        errorMessage={errorMessages.name}
      />
      <GBTextInput
        label={translate('screens.registration.email')}
        onTextChange={onTextChange(TextInputKey.EmailId)}
        placeHolder={translate('placeholder.email')}
        preset={TextInputPreset.Email}
        errorMessage={errorMessages.emailId}
      />
      <GBTextInput
        label={translate('screens.registration.password')}
        onTextChange={onTextChange(TextInputKey.Password)}
        placeHolder={translate('placeholder.password')}
        preset={TextInputPreset.Password}
        errorMessage={errorMessages.password}
      />
      <GBTextInput
        label={translate('screens.registration.confirm_password')}
        onTextChange={onTextChange(TextInputKey.confirmPassword)}
        placeHolder={translate('placeholder.confirm_password')}
        preset={TextInputPreset.Password}
        errorMessage={errorMessages.confirmPassword}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity hitSlop={HIT_SLOP_FIVE} onPress={onLoginPress}>
          <Text style={styles.alreadyRegistered}>
            {translate('screens.registration.already_registered')}
          </Text>
        </TouchableOpacity>
      </View>
      <GBButton
        title={translate('screens.registration.register')}
        onPress={onRegisterPress}
        containerCustomStyles={styles.button}
        isDisable={isRegistrationDisabled}
        apiStatusPreset={ApiStatusPreset.RegisterUser}
      />
    </KeyboardAwareScrollView>
  )
})

export default Registration
