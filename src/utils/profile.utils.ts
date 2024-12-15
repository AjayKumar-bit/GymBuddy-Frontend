import React from 'react'

import { REGEX } from '@constants'
import { translate } from '@locales'
import { IPasswordTypes, IProfileDataTypes } from '@types'

import { matchRegex } from './common.utils'

export const getPasswordErrors = (
  setErrorMessages: (update: (prev: IProfileDataTypes) => IProfileDataTypes) => void,
  isFieldsValidRef: React.MutableRefObject<boolean>,
  data: IPasswordTypes,
) => {
  let isFieldsValid = true
  const { confirmPassword, newPassword, oldPassword } = data
  if (oldPassword === newPassword) {
    isFieldsValid = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      oldPassword: translate('error_messages.password_same'),
      newPassword: translate('error_messages.password_same'),
    }))

    isFieldsValidRef.current = isFieldsValid
  }

  if (confirmPassword !== newPassword) {
    isFieldsValid = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      confirmPassword: translate('error_messages.password_mismatch'),
      newPassword: translate('error_messages.password_mismatch'),
    }))
    isFieldsValidRef.current = isFieldsValid

    return
  }

  if (!matchRegex(newPassword, REGEX.password)) {
    isFieldsValid = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      newPassword: translate('error_messages.password'),
    }))
    isFieldsValidRef.current = isFieldsValid

    return
  }

  isFieldsValidRef.current = isFieldsValid
}

export const getNameError = (
  setErrorMessages: (update: (prev: IProfileDataTypes) => IProfileDataTypes) => void,
  isFieldsValidRef: React.MutableRefObject<boolean>,
  name: string,
  prevName: string,
) => {
  if (prevName.toLowerCase() === name.toLowerCase()) {
    isFieldsValidRef.current = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      name: translate('error_messages.same_name'),
    }))
    return
  }

  if (!matchRegex(name, REGEX.name)) {
    isFieldsValidRef.current = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      name: translate('error_messages.name'),
    }))
    return
  }
  isFieldsValidRef.current = true
}

export const getEmailError = (
  setErrorMessages: (update: (prev: IProfileDataTypes) => IProfileDataTypes) => void,
  isFieldsValidRef: React.MutableRefObject<boolean>,
  emailId: string,
  prevEmailId: string,
) => {
  if (prevEmailId.toLowerCase() === emailId.toLowerCase()) {
    isFieldsValidRef.current = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      emailId: translate('error_messages.same_email'),
    }))
    return
  }

  if (!matchRegex(emailId, REGEX.email)) {
    isFieldsValidRef.current = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      emailId: translate('error_messages.email'),
    }))
    return
  }
  isFieldsValidRef.current = true
}

export const getPlannerDateError = (
  setErrorMessages: (update: (prev: IProfileDataTypes) => IProfileDataTypes) => void,
  isFieldsValidRef: React.MutableRefObject<boolean>,
  newDate: string,
  prevDate: string,
) => {
  if (newDate === prevDate) {
    isFieldsValidRef.current = false
    setErrorMessages((prev: IProfileDataTypes) => ({
      ...prev,
      plannerDate: translate('error_messages.same_date'),
    }))
    return
  }
  isFieldsValidRef.current = true
}
