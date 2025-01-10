import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  subContainer: {
    flex: 1,
    gap: Sizes.Size_8,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_4,
    flex: 1,
    flexDirection: 'row',
    gap: Sizes.Size_4,
    overflow: 'hidden',
    padding: Sizes.Size_8,
  },
  title: {
    ...CommonStyles.text,
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_16,
    lineHeight: Sizes.Size_18,
    textTransform: 'capitalize',
  },
  time: {
    textTransform: 'none',
  },
  description: {
    ...CommonStyles.text,
    color: Colors.Secondary,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
  },
  subContainerSecondary: {
    justifyContent: 'center',
    paddingVertical: Sizes.Size_12,
  },
})

export { styles }
