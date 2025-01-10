import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_4,
    flexDirection: 'row',
    gap: Sizes.Size_6,
    padding: Sizes.Size_8,
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_16,
    textTransform: 'capitalize',
  },
})

export { styles }
