import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.ExerciseCardBackground,
    height: SCREEN_HEIGHT / 2.5,
    padding: Sizes.Size_16,
    paddingHorizontal: Sizes.Size_16,
  },
  fullImage: {
    backgroundColor: Colors.ExerciseCardBackground,
    height: SCREEN_HEIGHT,
  },
  icon: {
    position: 'absolute',
    right: Sizes.Size_8,
    top: Sizes.Size_8,
  },
  container: {
    ...CommonStyles.shadow,
    alignSelf: 'center',
    borderRadius: Sizes.Size_4,
    overflow: 'hidden',
    width: SCREEN_WIDTH - 32,
  },
  name: {
    backgroundColor: Colors.ExerciseCardBackground,
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_22,
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_16,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
})

export { styles }
