import { StyleSheet } from 'react-native'

import { Colors, CommonStyles, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  button: {
    ...CommonStyles.shadow,
    elevation: 6,
  },
  count: {
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_16,
    fontVariant: ['lining-nums'],
    lineHeight: Sizes.Size_18,
    textAlignVertical: 'center',
  },
  subContainer: {
    alignItems:'center',
    flexDirection: 'row',
    gap: Sizes.Size_16,
    padding: Sizes.Size_4,
  },
  label: {
    color: Colors.Label,
    fontFamily: Typography.primary.semiBold,
    fontSize: Sizes.Size_14,
    lineHeight: Sizes.Size_16,
    textAlign: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: Colors.ExerciseCardBackground,
    marginHorizontal:Sizes.Size_16,
    padding: Sizes.Size_4,
  },
  contentContainer: {
    alignItems:"center",
    backgroundColor: Colors.TextInputBackground,
    borderRadius: Sizes.Size_4,
    justifyContent:'center',
    paddingBottom:Sizes.Size_4,
    paddingHorizontal:Sizes.Size_6,
  },
})

export { styles }
