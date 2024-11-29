import React from 'react'

import { REGEX } from '@constants'
import { translate } from '@locales'

import { matchRegex } from './common.utils'

export const getLoginErrorMessage = (
  setErrorMessages: (data: string) => void,
  isValidEmailRef: React.MutableRefObject<boolean>,
  email: string,
) => {
  if (!matchRegex(email, REGEX.email)) {
    isValidEmailRef.current = false
    setErrorMessages(translate('error_messages.email'))
  }
}
