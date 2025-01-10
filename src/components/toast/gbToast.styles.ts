import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  toastContainer: {
    ...CommonStyles.shadow,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: Sizes.Size_8,
    bottom: -60,
    flexDirection: 'row',
    gap: Sizes.Size_4,
    margin: Sizes.Size_16,
    overflow: 'hidden',
    padding: Sizes.Size_4,
    position: 'absolute',
  },
  message: {
    alignSelf: 'center',
    color: Colors.PrimaryText,
    flex: 1,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
  },
  lottie: {
    height: 50,
    width: 50,
  },
})

export { styles }
