import { StyleSheet } from 'react-native'

import { SCREEN_WIDTH } from '@constants'
import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.OverLay,
    flex: 1,
    justifyContent: 'center',
    padding: Sizes.Size_16,
  },
  subContainer: {
    ...CommonStyles.shadow,
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_8,
    gap: Sizes.Size_6,
    padding: Sizes.Size_16,
  },
  header: {
    ...CommonStyles.text,
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.medium,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_20,
    textAlign: 'center',
  },
  lottie: {
    height: 100,
  },
  button: {
    width: SCREEN_WIDTH / 2 - Sizes.Size_38,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Sizes.Size_8,
    justifyContent: 'center',
    marginTop: Sizes.Size_16,
    marginVertical: Sizes.Size_4,
  },
  deleteButton: {
    backgroundColor: Colors.DeleteButton,
  },
  leftButton: {
    backgroundColor: Colors.CancelButton,
  },
  loader: {
    justifyContent: 'center',
    marginTop: Sizes.Size_0,
    paddingVertical: Sizes.Size_10,
    width: SCREEN_WIDTH / 2 - Sizes.Size_38,
  },
})

export { styles }
