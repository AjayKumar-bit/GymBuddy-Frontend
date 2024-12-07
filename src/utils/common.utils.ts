import { LayoutAnimation, UIManager } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import i18n from 'i18next'

import { log } from '@config'
import { CURRENT_TRANSLATION_KEY, IS_ANDROID, SUPPORTED_LANGUAGE } from '@constants'

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

export const enableLayoutAnimation = () => {
  if (IS_ANDROID && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export const layoutAnimation = (duration: number = 500) => {
  LayoutAnimation.configureNext({
    duration,
    create: {
      type: LayoutAnimation.Types.easeInEaseOut,
      duration,
      property: 'opacity',
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
      duration,
      property: 'opacity',
    },
    delete: {
      type: LayoutAnimation.Types.easeInEaseOut,
      duration,
      property: 'opacity',
    },
  })
}
