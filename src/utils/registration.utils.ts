import React from 'react'

import { REGEX } from '@constants'
import { translate } from '@locales'
import { IRegistrationDataType } from '@types'

import { matchRegex } from './common.utils'

export const getErrorMessages = (
  setErrorMessages: (update: (prev: IRegistrationDataType) => IRegistrationDataType) => void,
  isFieldsValidRef: React.MutableRefObject<boolean>,
  data: IRegistrationDataType,
) => {
  let isFieldsValid = true
  // Validate email
  if (!matchRegex(data.emailId, REGEX.email)) {
    isFieldsValid = false
    setErrorMessages((prev: IRegistrationDataType) => ({
      ...prev,
      emailId: translate('error_messages.email'),
    }))
  }

  // Validate name
  if (!matchRegex(data.name, REGEX.name)) {
    isFieldsValid = false
    setErrorMessages((prev: IRegistrationDataType) => ({
      ...prev,
      name: translate('error_messages.name'),
    }))
  }

  // Validate password
  if (!matchRegex(data.password, REGEX.password)) {
    isFieldsValid = false
    setErrorMessages((prev: IRegistrationDataType) => ({
      ...prev,
      password: translate('error_messages.password'),
    }))
  }

  // Validate confirm password
  if (data.confirmPassword !== data.password) {
    isFieldsValid = false
    setErrorMessages((prev: IRegistrationDataType) => ({
      ...prev,
      confirmPassword: translate('error_messages.confirm_password'),
    }))
  }
  isFieldsValidRef.current = isFieldsValid
}
