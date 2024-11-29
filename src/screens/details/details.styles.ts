import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  counterContainer: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_8,
  },
  separator: {
    borderLeftWidth: Sizes.Size_1,
    borderStyle: 'dashed',
    height: '100%',
  },
  contentContainerStyle: {
    gap: Sizes.Size_8,
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_8,
  },
  recommendation: {
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    paddingHorizontal: Sizes.Size_16,
  },
  container: {
    gap: Sizes.Size_4,
    paddingBottom: Sizes.Size_8,
    paddingTop: Sizes.Size_4,
  },
})

export { styles }
