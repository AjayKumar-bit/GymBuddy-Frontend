import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_10,
    flexDirection: 'row',
    gap: Sizes.Size_8,
    padding: Sizes.Size_8,
  },
  image: {
    borderRadius: Sizes.Size_8,
    flex: 1,
    height: 100,
    resizeMode: 'center',
    width: 100,
  },
  subContainer: {
    backgroundColor: Colors.ExerciseCardBackground,
    flex: 2,
    justifyContent: 'center',
    padding: Sizes.Size_8,
  },
  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Sizes.Size_8,
  },
  detail: {
    alignSelf: 'center',
    color: Colors.Label,
    flex: 1,
    fontFamily: Typography.primary.regular,
    fontSize: Sizes.Size_14,
    textTransform: 'capitalize',
  },
  name: {
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    paddingBottom: Sizes.Size_8,
    textTransform: 'capitalize',
  },
})

export { styles }
