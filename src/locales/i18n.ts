/* eslint-disable @typescript-eslint/no-explicit-any */
import { initReactI18next } from 'react-i18next'

import i18n from 'i18next'

import { SUPPORTED_LANGUAGE } from '../constants/common.constants'

import en from './en.json'
import hi from './hi.json'

const resources = {
  en: {
    translation: en,
  },
  hi: {
    translation: hi,
  },
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  fallbackLng: SUPPORTED_LANGUAGE.English,
  supportedLngs: [SUPPORTED_LANGUAGE.English, SUPPORTED_LANGUAGE.Hindi],
  react: {
    useSuspense: false,
  },
  //  Setting escapeValue: false tells i18next not to escape interpolation values
  interpolation: {
    escapeValue: false,
  },
})

type EnLangType = typeof en

type RecursiveKeyOf<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<TObj[TKey], `${TKey}`>
}[keyof TObj & (string | number)]

type RecursiveKeyOfInner<TObj extends object> = {
  [TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
    TObj[TKey],
    `['${TKey}']` | `.${TKey}`
  >
}[keyof TObj & (string | number)]

//  any[] - is used here to check the condition that whether the TValue is an array of any type or not
type RecursiveKeyOfHandleValue<TValue, Text extends string> = TValue extends any[]
  ? Text
  : TValue extends object
  ? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
  : Text

export type TranslateKey = RecursiveKeyOf<EnLangType>
//  options argument type -> any i.e it can hold a value of any type that might be needed for translation or interpolation etc
//  return type -> any i.e the returned translated text can be of any type
export const translate = (key: TranslateKey | string, options?: any): any => i18n.t(key, options)
