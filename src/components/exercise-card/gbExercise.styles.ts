import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  image: {
    height: SCREEN_HEIGHT * 0.15,
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_4,
    overflow: 'hidden',
    width: (SCREEN_WIDTH - 32) / 2,
  },
  title: {
    color: Colors.Label,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_12,
    lineHeight: Sizes.Size_14,
    margin: Sizes.Size_4,
  },
})

export { styles }
