import React, { useCallback, useState } from 'react'
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native'
import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon as SearchIcon,
} from 'react-native-heroicons/outline'

import { log } from '@config'
import { HIT_SLOP_FIVE, TextInputPreset } from '@constants'
import { Colors } from '@theme'

import { styles } from './gbTextInput.styles'

interface IVITextInputProps extends TextInputProps {
  /** errorMessage : is an optional prop that gives error message */
  errorMessage?: string
  /** label: is a required prop that gives input label */
  label?: string
  /** placeHolder : is a required prop that gives placeHolder */
  placeHolder: string
  /** onTextChange : is a required prop that triggers on text change */
  onTextChange?: (value: string) => void
  /** preset: is a required prop that gives preset of text input */
  preset: TextInputPreset
}

const GBTextInput = (props: IVITextInputProps) => {
  const { preset, label = '', onTextChange = () => {}, errorMessage = '', placeHolder } = props

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const showSearchBar = preset === TextInputPreset.Search
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)

  const onSearchIconPress = () => {
    log.info('Searching...')
  }

  const onValueChange = (newValue: string) => {
    showSearchBar && setIsSearchBarVisible(newValue.length !== 0)
    onTextChange && onTextChange(newValue)
  }

  const onPasswordIconPress = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState)
  }, [isPasswordVisible])

  const renderInputComponent = useCallback(() => {
    let inputComponent: React.ReactNode

    switch (preset) {
      case TextInputPreset.Email:
        inputComponent = (
          <TextInput
            {...props}
            onChangeText={onValueChange}
            placeholder={placeHolder}
            placeholderTextColor={Colors.Placeholder}
            style={styles.inputValue}
            inputMode="email"
          />
        )
        break

      case TextInputPreset.Password:
        inputComponent = (
          <>
            <TextInput
              {...props}
              onChangeText={onValueChange}
              placeholder={placeHolder}
              placeholderTextColor={Colors.Placeholder}
              secureTextEntry={!isPasswordVisible}
              style={styles.inputValue}
            />
            <TouchableOpacity onPress={onPasswordIconPress}>
              {isPasswordVisible ? (
                <EyeSlashIcon color={Colors.SearchIcon} />
              ) : (
                <EyeIcon color={Colors.SearchIcon} />
              )}
            </TouchableOpacity>
          </>
        )
        break

      case TextInputPreset.Search:
        inputComponent = (
          <TextInput
            {...props}
            onChangeText={onValueChange}
            placeholder={placeHolder}
            placeholderTextColor={Colors.Placeholder}
            style={[styles.inputValue, styles.inputValueSecondary]}
          />
        )
        break

      case TextInputPreset.Default:
        inputComponent = (
          <TextInput
            {...props}
            onChangeText={onValueChange}
            placeholder={placeHolder}
            placeholderTextColor={Colors.Placeholder}
            style={styles.inputValue}
          />
        )
    }

    return inputComponent
  }, [preset, isPasswordVisible])

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.subContainer}>
        {renderInputComponent()}
        {isSearchBarVisible && (
          <TouchableOpacity hitSlop={HIT_SLOP_FIVE} onPress={onSearchIconPress}>
            <SearchIcon color={Colors.SearchIcon} />
          </TouchableOpacity>
        )}
      </View>
      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  )
}

export default GBTextInput
