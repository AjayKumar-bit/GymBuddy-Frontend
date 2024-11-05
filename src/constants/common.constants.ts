import { Dimensions } from 'react-native'

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
  Default = 'default',
  Email = 'e-mail',
  Password = 'password',
  Search = 'search',
}
