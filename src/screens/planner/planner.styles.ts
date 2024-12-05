import { StyleSheet } from 'react-native'

import { Colors, Sizes, Typography } from '@theme'

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: Sizes.Size_8,
    marginBottom: 32,
    paddingHorizontal: Sizes.Size_16,
    paddingVertical: Sizes.Size_8,
  },
  listHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.Label,
    fontFamily: Typography.primary.bold,
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_28,
  },
  addButton: {
    borderRadius: Sizes.Size_6,
    gap: Sizes.Size_2,
    padding: Sizes.Size_8,
  },
  addButtonTitle: {
    fontSize: Sizes.Size_18,
    lineHeight: Sizes.Size_18,
  },
})

export { styles }
