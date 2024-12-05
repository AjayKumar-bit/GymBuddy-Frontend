import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_4,
    flexDirection: 'row',
    gap: Sizes.Size_8,
    padding: Sizes.Size_16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Sizes.Size_12,
    padding: Sizes.Size_16,
  },
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.Label,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_16,
  },
})

export { styles }
