import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  count: {
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_16,
    fontVariant: ['lining-nums'],
    lineHeight: Sizes.Size_18,
    textAlign: 'center',
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Sizes.Size_16,
    padding: Sizes.Size_4,
  },
  label: {
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: Sizes.Size_16,
    padding: Sizes.Size_4,
  },
  contentContainer: {
    alignItems: 'center',
    backgroundColor: Colors.TextInputBackground,
    borderRadius: Sizes.Size_4,
    paddingBottom: Sizes.Size_2,
    paddingHorizontal: Sizes.Size_6,
  },
  containerSecondary: {
    flexDirection: 'column',
  },
  contentContainerSecondary: {
    backgroundColor: Colors.CancelButton,
    gap: Sizes.Size_4,
  },
})

export { styles }
