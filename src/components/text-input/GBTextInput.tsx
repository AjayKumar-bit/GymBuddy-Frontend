import React, { useCallback, useState } from 'react'
import {
  StyleProp,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import {
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon as SearchIcon,
} from 'react-native-heroicons/outline'

import { HIT_SLOP_FIVE, TextInputPreset } from '@constants'
import { Colors } from '@theme'

import { styles } from './gbTextInput.styles'

interface IGBTextInputProps extends TextInputProps {
  /** containerStyles: is an optional prop that gives additional styles of container */
  containerStyles?: StyleProp<ViewStyle>
  /** errorMessage : is an optional prop that gives error message */
  errorMessage?: string
  /** label: is a required prop that gives input label */
  label?: string
  /** onSearchIconPress : is an optional prop that trigger an action on click of search icon */
  onSearchIconPress?: () => void
  /** onTextChange : is a required prop that triggers on text change */
  onTextChange?: (value: string) => void
  /** placeHolder : is a required prop that gives placeHolder */
  placeHolder: string
  /** preset: is a required prop that gives preset of text input */
  preset: TextInputPreset
}

const GBTextInput = (props: IGBTextInputProps) => {
  const {
    containerStyles = {},
    errorMessage = '',
    label = '',
    onSearchIconPress = () => {},
    onTextChange = () => {},
    placeHolder,
    preset,
  } = props

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const showSearchBar = preset === TextInputPreset.Search
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)

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
            inputMode="email"
            onChangeText={onValueChange}
            placeholder={placeHolder}
            placeholderTextColor={Colors.Placeholder}
            style={styles.inputValue}
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
    <View style={[styles.container, containerStyles]}>
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
