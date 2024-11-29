import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n from 'i18next'

import { log } from '@config'
import { CURRENT_TRANSLATION_KEY, SUPPORTED_LANGUAGE } from '@constants'

export const changeTranslation = async (lang: string) => {
  i18n.changeLanguage(lang)
  await AsyncStorage.setItem(CURRENT_TRANSLATION_KEY, lang)
}

export const fetchCurrentTranslation = async () => {
  try {
    const storedLanguage = await AsyncStorage.getItem(CURRENT_TRANSLATION_KEY)
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage)
    } else {
      i18n.changeLanguage(SUPPORTED_LANGUAGE.English)
    }
  } catch (error) {
    log.error('Error fetching language from AsyncStorage:', error)
  }
}

export const matchRegex = (input: string, regex: RegExp) => {
  return regex.test(input)
}
