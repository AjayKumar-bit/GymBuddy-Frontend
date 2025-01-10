import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.shadow,
    alignItems: 'center',
    borderRadius: Sizes.Size_8,
    flexDirection: 'row',
    gap: Sizes.Size_8,
    justifyContent: 'center',
    padding: Sizes.Size_12,
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_16,
    lineHeight: Sizes.Size_18,
    textAlign: 'center',
  },
  disableContainer: {
    backgroundColor: Colors.Secondary,
  },
  activeContainer: {
    backgroundColor: Colors.Primary,
  },
  loader: {
    marginTop: Sizes.Size_12,
  },
})

export { styles }
