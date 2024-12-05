import { StyleSheet } from 'react-native'

import { TAB_BAR_HEIGHT } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    gap: Sizes.Size_4,
  },
  activeLabel: {
    color: Colors.ActiveTab,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
  },
  inactiveLabel: {
    color: Colors.InactiveTab,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_12,
    lineHeight: Sizes.Size_16,
  },
  tabBar: {
    ...CommonStyles.shadow,
    borderRadius: 30,
    height: TAB_BAR_HEIGHT,
    marginBottom: Sizes.Size_8,
    marginHorizontal: Sizes.Size_8,
  },
})

export { styles }
