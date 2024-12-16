import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.HeaderBackGround,
    ...CommonStyles.shadow,
  },
  subContainer: {
    ...CommonStyles.shadow,
    alignItems: 'center',
    elevation: Sizes.Size_6,
    flexDirection: 'row',
    paddingHorizontal: Sizes.Size_8,
    paddingVertical: Sizes.Size_6,
  },
  title: {
    color: Colors.PrimaryText,
    flex: 1,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_20,
    lineHeight: Sizes.Size_22,
    paddingTop: Sizes.Size_8,
    // marginRight: Sizes.Size_32, // Note: will uncomment in  future.
    textAlign: 'center',
  },
})

export default styles
