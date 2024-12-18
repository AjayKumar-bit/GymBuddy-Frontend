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
import { getLoginErrorMessage } from '@utils'

import { styles } from './login.styles'

const Login = observer(() => {
  const { domainStore } = useStore()
  const { userStore } = domainStore
  const { loginUser } = userStore

  const navigation = useNavigation<INavigation>()

  const [data, setData] = useState({
    emailId: '',
    password: '',
  })

  const [isLoginDisabled, setIsLoginDisabled] = useState(true)
  const isValidEmailRef = useRef(true)

  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const onLoginPress = () => {
    setEmailErrorMessage('')

    getLoginErrorMessage(setEmailErrorMessage, isValidEmailRef, data.emailId)
    if (isValidEmailRef.current) {
      const loginData = { ...data, emailId: data.emailId.toLowerCase() }
      loginUser(loginData)
    }
  }

  const onRegisterPress = () => {
    navigation.navigate(RouteName.Registration)
  }

  const onTextChange = (key: TextInputKey) => (value: string) => {
    setData(prev => ({
      ...prev,
      [key]: value,
    }))
  }

  useEffect(() => {
    const isAllFieldCompleted = Object.values(data).every(item => item.length > 0)
    setIsLoginDisabled(!isAllFieldCompleted)
  }, [data])

  return (
    <KeyboardAwareScrollView
      bottomOffset={15}
      enabled
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor={Colors.HeaderBackGround} barStyle="dark-content" />
      <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
      <Text style={styles.header}>{translate('screens.login.header')}</Text>
      <Text style={styles.subHeader}>{translate('screens.login.login')}</Text>
      <GBTextInput
        label={translate('screens.login.email')}
        onTextChange={onTextChange(TextInputKey.EmailId)}
        placeHolder={translate('placeholder.email')}
        preset={TextInputPreset.Email}
        errorMessage={emailErrorMessage}
      />
      <GBTextInput
        label={translate('screens.login.password')}
        onTextChange={onTextChange(TextInputKey.Password)}
        placeHolder={translate('placeholder.password')}
        preset={TextInputPreset.Password}
      />
      <View style={styles.bottomContainer}>
        <TouchableOpacity hitSlop={HIT_SLOP_FIVE} onPress={onRegisterPress}>
          <Text style={styles.alreadyRegistered}>{translate('screens.login.not_registered')}</Text>
        </TouchableOpacity>
      </View>
      <GBButton
        title={translate('screens.login.login')}
        onPress={onLoginPress}
        containerCustomStyles={styles.button}
        isDisable={isLoginDisabled}
        apiStatusPreset={ApiStatusPreset.LoginUser}
      />
    </KeyboardAwareScrollView>
  )
})

export default Login
