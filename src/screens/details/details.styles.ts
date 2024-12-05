import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  counterContainer: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.ExerciseCardBackground,
    borderRadius: Sizes.Size_4,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: Sizes.Size_16,
    marginHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_4,
  },
  separator: {
    borderLeftWidth: Sizes.Size_1,
    borderStyle: 'dashed',
    height: '100%',
  },
  contentContainerStyle: {
    gap: Sizes.Size_8,
    paddingBottom: Sizes.Size_60,
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_8,
  },
  details: {
    color: Colors.Label,
    flex: 1,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    paddingHorizontal: Sizes.Size_16,
  },
  container: {
    paddingBottom: Sizes.Size_8,
    paddingTop: Sizes.Size_4,
  },
  button: {
    borderBottomLeftRadius: Sizes.Size_0,
    borderBottomRightRadius: Sizes.Size_0,
    flex: 1,
  },
  buttonContainer: {
    bottom: 0,
    flexDirection: 'row',
    gap: Sizes.Size_8,
    paddingHorizontal: Sizes.Size_8,
    position: 'absolute',
  },
  detailsSubContainer: {
    flexDirection: 'row',
  },
  detailsContainer: {
    marginTop: Sizes.Size_16,
  },
})

export { styles }
