import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: Sizes.Size_60,
  },
  small: {
    height: 50,
  },
  medium: {
    height: 100,
  },
  large: {
    height: 150,
  },
  title: {
    ...CommonStyles.text,
    alignSelf: 'center',
    color: Colors.InactiveTab,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_16,
  },
  tryAgain: {
    color: Colors.ActiveTab,
    textDecorationLine: 'underline',
  },
})

export { styles }
