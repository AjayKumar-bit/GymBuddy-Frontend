import { StyleSheet } from 'react-native'

import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  image: {
    height: SCREEN_HEIGHT * 0.15,
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_4,
    overflow: 'hidden',
    padding: Sizes.Size_2,
    width: (SCREEN_WIDTH - 40) / 2,
  },
  title: {
    color: Colors.PrimaryText,
    flex: 1,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_12,
    lineHeight: Sizes.Size_14,
    padding: Sizes.Size_4,
  },
  subContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    padding: Sizes.Size_4,
  },
  border: {
    borderColor: Colors.Primary,
    borderWidth: Sizes.Size_3,
  },
  containerSecondary: {
    borderColor: Colors.Error,
    borderWidth: Sizes.Size_3,
  },
})

export { styles }
