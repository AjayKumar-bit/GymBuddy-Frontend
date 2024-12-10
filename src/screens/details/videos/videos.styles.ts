import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: Sizes.Size_8,
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_8,
  },
  details: {
    color: Colors.Label,
    flex: 1,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    paddingHorizontal: Sizes.Size_16,
  },
  container: {
    paddingBottom: Sizes.Size_60,
    paddingTop: Sizes.Size_8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export { styles }
