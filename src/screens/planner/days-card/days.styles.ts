import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Sizes.Size_8,
    padding: Sizes.Size_16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Sizes.Size_12,
    padding: Sizes.Size_16,
    position: 'absolute',
    right: 0,
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_4,
    flex: 1,
    overflow: 'hidden',
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_16,
    textTransform: 'capitalize',
  },
})

export { styles }
