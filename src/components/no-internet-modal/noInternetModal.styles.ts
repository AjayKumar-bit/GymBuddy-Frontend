import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.OverLay,
    flex: 1,
    justifyContent: 'flex-end',
  },
  subContainer: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderTopLeftRadius: Sizes.Size_24,
    borderTopRightRadius: Sizes.Size_24,
    gap: Sizes.Size_4,
    padding: Sizes.Size_16,
  },
  header: {
    color: Colors.Label,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_20,
    textAlign: 'center',
  },
  lottie: {
    height: 150,
  },
})

export { styles }
