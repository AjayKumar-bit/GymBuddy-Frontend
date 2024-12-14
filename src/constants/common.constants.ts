import { Dimensions, Platform } from 'react-native'

export const CURRENT_TRANSLATION_KEY = 'current_translation'
export const SUPPORTED_LANGUAGE = {
  English: 'en',
  Hindi: 'hi',
}
export const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')
export const TAB_BAR_HEIGHT = 60
export const HIT_SLOP_FIVE = { top: 5, bottom: 5, left: 5, right: 5 }

// Enums
export enum TextInputPreset {
  DatePicker = 'datePicker',
  Default = 'default',
  Email = 'e-mail',
  Multiline = 'multiline',
  Password = 'password',
  Search = 'search',
  TimePicker = 'timePicker',
}

export enum LoaderSize {
  Large = 'large',
  Medium = 'medium',
  Small = 'small',
}

export enum ResizeMode {
  center = 'center',
  contain = 'contain',
  Cover = 'cover',
  Stretch = 'stretch',
}

export enum ToastPreset {
  Success = 'success',
  Error = 'error',
  Info = 'info',
}

export enum DateTimePickerMode {
  Date = 'date',
  Time = 'time',
}

export const AUTH_DATA_KEY = 'authDataKey'
export const REMINDERS_KEY = 'remindersKey'

export const IS_ANDROID = Platform.OS === 'android'

export const REGEX = {
  email: /^[a-zA-Z0-9]+([._-][0-9a-zA-Z]+)*@[a-zA-Z0-9]+([.-][0-9a-zA-Z]+)*\.[a-zA-Z]{2,}$/,
  name: /^[A-Za-z\s]*$/,
  password: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]*$/,
}
