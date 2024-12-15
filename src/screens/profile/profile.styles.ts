import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  lottie: {
    height: 150,
  },
  title: {
    textTransform: 'capitalize',
  },
  details: {
    ...CommonStyles.text,
    color: Colors.Label,
    flex: 1,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
  },
  detailsSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  detailsContainer: {
    backgroundColor: Colors.CancelButton,
    borderColor: Colors.ActiveTab,
    borderRadius: Sizes.Size_8,
    borderWidth: Sizes.Size_1,
    gap: Sizes.Size_6,
    justifyContent: 'center',
    margin: Sizes.Size_16,
    padding: Sizes.Size_16,
  },
  edit: {
    color: Colors.ActiveTab,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    textDecorationLine: 'underline',
  },
  bottomText: {
    color: Colors.ActiveTab,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_20,
    marginTop: Sizes.Size_6,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  delete: {
    color: Colors.DeleteButton,
  },
  heading: {
    ...CommonStyles.text,
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_20,
    marginTop: Sizes.Size_6,
    textAlign: 'center',
  },
})

export { styles }
