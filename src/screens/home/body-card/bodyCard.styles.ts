import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  details: {
    backgroundColor: Colors.TextInputBackground,
    borderTopLeftRadius: Sizes.Size_8,
    borderTopRightRadius: Sizes.Size_8,
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_20,
    textAlign: 'center',
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CancelButton,
    borderRadius: Sizes.Size_8,
    padding: Sizes.Size_8,
  },
  image: {
    borderTopLeftRadius: Sizes.Size_8,
    borderTopRightRadius: Sizes.Size_8,
    height: SCREEN_HEIGHT * 0.15,
    padding: Sizes.Size_10,
  },
})

export { styles }
