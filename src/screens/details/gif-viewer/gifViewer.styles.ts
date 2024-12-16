import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.CardBackground,
    height: SCREEN_HEIGHT / 2.5,
    padding: Sizes.Size_16,
  },
  fullImage: {
    backgroundColor: Colors.CardBackground,
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
    alignSelf: 'center',
    backgroundColor: Colors.CardBackground,
    bottom: Sizes.Size_8,
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    paddingHorizontal: Sizes.Size_16,
    position: 'absolute',
    textTransform: 'capitalize',
  },
  iconSecondary: {
    top: Sizes.Size_32,
  },
  gifContainer: {
    backgroundColor: Colors.CardBackground,
    padding: Sizes.Size_16,
  },
})

export { styles }
