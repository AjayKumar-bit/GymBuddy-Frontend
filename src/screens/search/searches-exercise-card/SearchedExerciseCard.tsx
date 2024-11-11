import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { BodyPartIcon, EquipmentIcon } from '@assets'
import { GBFastImage } from '@components'
import { RouteName } from '@constants'
import { translate } from '@locales'
import { SearchExerciseDataTypes } from '@stores'
import { Sizes } from '@theme'
import { INavigation } from '@types'

import { styles } from './searchedExercise.styles'

interface ISearchedExerciseCardProps {
  data: SearchExerciseDataTypes
}

const SearchedExerciseCard = (props: ISearchedExerciseCardProps) => {
  const { data } = props
  const { gifUrl, name, bodyPart, equipment } = data
  const navigation = useNavigation<INavigation>()

  const onPress = () => {
    navigation.navigate(RouteName.Details, { data })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <GBFastImage imageStyles={styles.image} source={{ uri: gifUrl }} />
      <View style={styles.subContainer}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.detailsContainer}>
          <BodyPartIcon height={Sizes.Size_22} />
          <Text style={styles.detail}>{translate('screens.search.body_part')} </Text>
          <Text style={styles.detail}>{bodyPart} </Text>
        </View>
        <View style={styles.detailsContainer}>
          <EquipmentIcon height={Sizes.Size_20} />
          <Text style={styles.detail}>{translate('screens.search.equipment')} </Text>
          <Text style={styles.detail}>{equipment} </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchedExerciseCard
