import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TrashIcon as DeleteIcon } from 'react-native-heroicons/solid'

import { useNavigation } from '@react-navigation/native'

import { BodyPartIcon, EquipmentIcon } from '@assets'
import { GBFastImage } from '@components'
import { RouteName } from '@constants'
import { translate } from '@locales'
import { SearchExerciseDataTypes, useStore, videoRecommendationType } from '@stores'
import { Colors, Sizes } from '@theme'
import { INavigation } from '@types'

import ExerciseModal from '../exercise-modal/ExerciseModal'

import { styles } from './searchedExercise.styles'

interface ISearchedExerciseCardProps {
  /** data: is required prop that gives data of exercise */
  data: SearchExerciseDataTypes
  /** dayId :is an optional prop that gives day id of exercise */
  dayId?: string
  /** exerciseId is an optional prop that gives exercise id */
  exerciseId?: string
  /** isPlannerEnable is an optional prop that tells whether planner is enable or not */
  isPlannerEnable?: boolean
  /** videos is an optional prop that gives videos of exercise */
  videos?: Array<videoRecommendationType>
}

const SearchedExerciseCard = (props: ISearchedExerciseCardProps) => {
  const { data, videos = [], isPlannerEnable = false, dayId = '', exerciseId = '' } = props
  const { gifUrl, name, bodyPart, equipment } = data
  const navigation = useNavigation<INavigation>()

  const { domainStore } = useStore()
  const { exerciseStore } = domainStore
  const { deleteExercise } = exerciseStore

  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false)

  const onPress = () => {
    navigation.navigate(RouteName.Details, { data, videos, isPlannerEnable, dayId, exerciseId })
  }

  const toggleModalVisibility = () => {
    setIsExerciseModalOpen(prev => !prev)
  }

  const onDeletePress = async () => {
    await deleteExercise({ dayId, exerciseId })
    setIsExerciseModalOpen(false)
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
        {!isPlannerEnable && (
          <DeleteIcon
            color={Colors.DeleteButton}
            onPress={toggleModalVisibility}
            style={styles.deleteButton}
          />
        )}
      </View>
      {isExerciseModalOpen && (
        <ExerciseModal
          closeModal={toggleModalVisibility}
          exerciseName={name}
          onDeletePress={onDeletePress}
        />
      )}
    </TouchableOpacity>
  )
}

export default SearchedExerciseCard
