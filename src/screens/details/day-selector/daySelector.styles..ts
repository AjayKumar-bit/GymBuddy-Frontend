import { StyleSheet } from 'react-native'

import { SCREEN_WIDTH } from '@constants'
import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: Sizes.Size_8,
    paddingHorizontal: Sizes.Size_4,
    paddingVertical: Sizes.Size_8,
  },
  container: {
    backgroundColor: Colors.OverLay,
    flex: 1,
    justifyContent: 'center',
    padding: Sizes.Size_16,
  },
  title: {
    color: Colors.PrimaryText,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_28,
    textAlign: 'center',
  },
  subContainer: {
    backgroundColor: Colors.CardBackground,
    borderRadius: Sizes.Size_8,
    gap: Sizes.Size_8,
    justifyContent: 'center',
    maxHeight: '100%',
    minWidth: SCREEN_WIDTH - Sizes.Size_32,
    padding: Sizes.Size_16,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Sizes.Size_8,
  },
  cancelButton: {
    backgroundColor: Colors.CancelButton,
    width: (SCREEN_WIDTH - 72) / 2,
  },
  addButton: {
    width: (SCREEN_WIDTH - 72) / 2,
  },
  loader: {
    justifyContent: 'center',
    marginTop: Sizes.Size_0,
    paddingVertical: Sizes.Size_10,
    width: (SCREEN_WIDTH - 72) / 2,
  },
})

export { styles }
