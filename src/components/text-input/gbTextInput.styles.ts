import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    gap: Sizes.Size_4,
  },
  label: {
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_18,
  },
  subContainer: {
    alignItems: 'center',
    backgroundColor: Colors.TextInputBackground,
    borderBottomLeftRadius: Sizes.Size_8,
    borderBottomRightRadius: Sizes.Size_8,
    borderColor: Colors.TextInputBorder,
    borderTopLeftRadius: Sizes.Size_8,
    borderTopRightRadius: Sizes.Size_8,
    borderWidth: Sizes.Size_1,
    flexDirection: 'row',
    paddingHorizontal: Sizes.Size_8,
    paddingVertical: Sizes.Size_2,
    ...CommonStyles.shadow,
  },
  error: {
    color: Colors.Error,
    fontFamily: Typography.primary.regular,
    fontSize: Sizes.Size_10,
    lineHeight: Sizes.Size_12,
  },
  inputValue: {
    ...CommonStyles.text,
    color: Colors.InputValue,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_16,
    lineHeight: Sizes.Size_18,
  },
  inputValueSecondary: {
    textAlign: 'center',
  },
  errorContainer: {
    height: Sizes.Size_12,
  },
  multiline: {
    textAlignVertical: 'top',
  },
})

export { styles }
