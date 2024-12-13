import { StyleSheet } from 'react-native'

import { SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_10,
    flexDirection: 'row',
    gap: Sizes.Size_8,
    padding: Sizes.Size_8,
    width: SCREEN_WIDTH - Sizes.Size_32,
  },
  image: {
    borderRadius: Sizes.Size_8,
    flex: 1,
    height: 100,
    resizeMode: 'center',
    width: 100,
  },
  subContainer: {
    flex: 2,
    paddingTop: Sizes.Size_2,
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
    lineHeight: Sizes.Size_16,
    textTransform: 'capitalize',
  },
  name: {
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    marginRight: Sizes.Size_24,
    paddingBottom: Sizes.Size_8,
    textTransform: 'capitalize',
  },
  deleteButton: {
    position: 'absolute',
    right: Sizes.Size_0,
    top: Sizes.Size_0,
  },
  positionContainer: {
    backgroundColor: Colors.CancelButton,
    borderRadius: Sizes.Size_10,
    height: Sizes.Size_20,
    position: 'absolute',
    right: Sizes.Size_0,
    textAlign: 'center',
    top: Sizes.Size_0,
    width: Sizes.Size_20,
  },
})

export { styles }
