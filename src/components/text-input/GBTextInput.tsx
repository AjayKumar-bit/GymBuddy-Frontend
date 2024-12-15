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

import { DateTimePickerMode, HIT_SLOP_FIVE, TextInputPreset } from '@constants'
import { Colors, CommonStyles } from '@theme'

import GBDateTimePicker from '../date-time-picker/GBDateTimePicker'

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
  /** placeHolder : is a optional prop that gives placeHolder */
  placeHolder?: string
  /** preset: is a required prop that gives preset of text input */
  preset: TextInputPreset
  /** value: is a required prop that gives value of text input */
  value?: string
}

const GBTextInput = (props: IGBTextInputProps) => {
  const {
    containerStyles = {},
    errorMessage = '',
    label = '',
    onSearchIconPress = () => {},
    onTextChange = () => {},
    placeHolder = '',
    preset,
    value = '',
  } = props

  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const showSearchBar = preset === TextInputPreset.Search
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false)
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [pickerMode, setPickerMode] = useState<DateTimePickerMode>()
  const showDatePicker = isPickerOpen && pickerMode === DateTimePickerMode.Date
  const showTimePicker = isPickerOpen && pickerMode === DateTimePickerMode.Time

  const onValueChange = (newValue: string) => {
    showSearchBar && setIsSearchBarVisible(newValue.length !== 0)
    onTextChange && onTextChange(newValue)
  }

  const onPickerValueChange = (newDateTime: Date) => {
    setIsPickerOpen(false)
    const updatedValue =
      pickerMode === DateTimePickerMode.Date
        ? newDateTime.toLocaleDateString('en-GB')
        : newDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    onTextChange && onTextChange(updatedValue)
  }

  const onPickerPress = (mode: DateTimePickerMode) => () => {
    setPickerMode(mode)
    setIsPickerOpen(true)
  }

  const onPickerClose = () => {
    setIsPickerOpen(false)
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
            style={[styles.inputValue, CommonStyles.flex_1]}
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
              style={[styles.inputValue, CommonStyles.flex_1]}
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
            style={[styles.inputValue, styles.inputValueSecondary, CommonStyles.flex_1]}
          />
        )
        break

      case TextInputPreset.DatePicker:
        inputComponent = (
          <>
            <TouchableOpacity
              onPress={onPickerPress(DateTimePickerMode.Date)}
              style={CommonStyles.flex_1}>
              <TextInput
                {...props}
                editable={false}
                onChangeText={onValueChange}
                placeholder={placeHolder}
                placeholderTextColor={Colors.Placeholder}
                style={styles.inputValue}
                value={value}
              />
            </TouchableOpacity>
            {showDatePicker && (
              <GBDateTimePicker
                mode={DateTimePickerMode.Date}
                onChange={onPickerValueChange}
                onPickerClose={onPickerClose}
                showPicker={isPickerOpen}
              />
            )}
          </>
        )
        break

      case TextInputPreset.TimePicker:
        inputComponent = (
          <>
            <TouchableOpacity
              onPress={onPickerPress(DateTimePickerMode.Time)}
              style={CommonStyles.flex_1}>
              <TextInput
                {...props}
                editable={false}
                onChangeText={onValueChange}
                placeholder={placeHolder}
                placeholderTextColor={Colors.Placeholder}
                style={styles.inputValue}
                value={value}
              />
            </TouchableOpacity>
            {showTimePicker && (
              <GBDateTimePicker
                mode={DateTimePickerMode.Time}
                onChange={onPickerValueChange}
                onPickerClose={onPickerClose}
                showPicker={isPickerOpen}
              />
            )}
          </>
        )
        break

      case TextInputPreset.Multiline:
        inputComponent = (
          <TextInput
            {...props}
            onChangeText={onValueChange}
            multiline
            numberOfLines={3}
            placeholder={placeHolder}
            placeholderTextColor={Colors.Placeholder}
            style={[styles.inputValue, styles.multiline, CommonStyles.flex_1]}
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
            style={[styles.inputValue, CommonStyles.flex_1]}
          />
        )
    }

    return inputComponent
  }, [preset, isPasswordVisible, isPickerOpen, pickerMode, value])

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
      <View style={styles.errorContainer}>
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      </View>
    </View>
  )
}

export default GBTextInput
