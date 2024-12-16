import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    paddingHorizontal: Sizes.Size_16,
    paddingTop: Sizes.Size_16,
  },
  contentContainer: {
    gap: Sizes.Size_12,
    paddingBottom: Sizes.Size_16,
    paddingHorizontal: Sizes.Size_16,
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    marginTop: Sizes.Size_8,
    textTransform: 'capitalize',
  },
})

export { styles }
