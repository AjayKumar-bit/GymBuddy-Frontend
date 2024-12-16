import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    gap: Sizes.Size_2,
    padding: Sizes.Size_16,
  },
  header: {
    color: Colors.Primary,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_20,
    textAlign: 'center',
  },
  lottie: {
    height: 90,
  },
  subHeader: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_16,
    lineHeight: Sizes.Size_18,
    marginVertical: Sizes.Size_10,
    textAlign: 'center',
  },
  button: {
    alignSelf: 'center',
    marginTop: Sizes.Size_2,
    paddingHorizontal: Sizes.Size_32,
  },
  alreadyRegistered: {
    color: Colors.Primary,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    textDecorationLine: 'underline',
  },
  login: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
  },
  bottomContainer: {
    flexDirection: 'row',
    gap: Sizes.Size_8,
    justifyContent: 'center',
    marginTop: Sizes.Size_8,
    marginVertical: Sizes.Size_4,
  },
})

export { styles }
