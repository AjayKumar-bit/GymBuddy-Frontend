import React from 'react'
import { ImageRequireSource, Text, TouchableOpacity } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { GBFastImage } from '@components'
import { ExerciseListScreenPreset, RouteName } from '@constants'
import { useStore } from '@stores'
import { INavigation } from '@types'

import { styles } from './bodyCard.styles'

interface IBodyCard {
  /** image: is a required prop that gives body image */
  image: ImageRequireSource
  /** title: is a required prop that gives body title */
  title: string
}

const BodyCard = (props: IBodyCard) => {
  const { image, title } = props

  const navigation = useNavigation<INavigation>()
  const { domainStore } = useStore()
  const { searchStore } = domainStore
  const { searchExercise } = searchStore
  const onPress = () => {
    searchExercise({ exerciseName: title, isLoading: true })
    navigation.navigate(RouteName.Search, {
      prevSearchedExercise: title,
      preset: ExerciseListScreenPreset.Search,
    })
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <GBFastImage source={image} imageStyles={styles.image} />
      <Text style={styles.details}>{title}</Text>
    </TouchableOpacity>
  )
}

export default BodyCard
