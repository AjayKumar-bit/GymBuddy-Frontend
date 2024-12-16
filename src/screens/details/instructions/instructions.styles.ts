import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_12,
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
  },
  instruction: {
    color: Colors.Placeholder,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_12,
    lineHeight: Sizes.Size_14,
  },
  expanderText: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_12,
    lineHeight: Sizes.Size_14,
  },
  expanderContainer: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
    paddingVertical: Sizes.Size_4,
  },
  instructionsContainer: {
    paddingLeft: Sizes.Size_16,
    paddingVertical: Sizes.Size_4,
  },
  instructionNumber: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.semiBold,
  },
})

export { styles }
