import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
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
    flex: 2,
    justifyContent: 'center',
  },
  detailsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: Sizes.Size_8,
  },
  detail: {
    alignSelf: 'center',
    color: Colors.PrimaryText,
    flex: 1,
    fontFamily: Typography.primary.regular,
    fontSize: Sizes.Size_14,
    textTransform: 'capitalize',
  },
  name: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    marginRight: Sizes.Size_24,
    paddingBottom: Sizes.Size_8,
    textTransform: 'capitalize',
  },
  deleteButton: {
    position: 'absolute',
    right: Sizes.Size_0,
    top: Sizes.Size_0,
  },
})

export { styles }
