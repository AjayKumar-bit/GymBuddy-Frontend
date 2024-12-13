import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Sizes.Size_12,
  },
  textInputContainer: {
    paddingHorizontal: Sizes.Size_16,
    paddingTop: Sizes.Size_16,
  },
  header: {
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    paddingHorizontal: Sizes.Size_16,
    textTransform: 'capitalize',
  },
  bodypartCarousel: {
    justifyContent: 'center',
  },
})

export { styles }
