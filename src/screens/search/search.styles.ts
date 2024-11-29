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
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
  },
})

export { styles }
