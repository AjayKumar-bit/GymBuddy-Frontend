import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  counterContainer: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CancelButton,
    borderColor: Colors.ActiveTab,
    borderRadius: Sizes.Size_4,
    borderWidth: Sizes.Size_2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: Sizes.Size_16,
    marginTop: Sizes.Size_8,
    paddingVertical: Sizes.Size_4,
  },
  separator: {
    borderColor: Colors.ActiveTab,
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
    flex: 1,
    marginVertical: Sizes.Size_8,
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
