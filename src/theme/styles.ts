import { StyleSheet } from 'react-native'

import { Colors } from './colors'
import { Sizes } from './spacing'

const CommonStyles = StyleSheet.create({
  shadow: {
    elevation: Sizes.Size_4,
    shadowColor: Colors.Dark,
  },
})

export { CommonStyles }
