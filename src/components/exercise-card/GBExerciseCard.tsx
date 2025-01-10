import React, { useState } from 'react'
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import { TrashIcon as DeleteIcon } from 'react-native-heroicons/solid'

import { useNavigation } from '@react-navigation/native'

import { BodyPartIcon, EquipmentIcon } from '@assets'
import { GBFastImage } from '@components'
import { RouteName } from '@constants'
import { translate } from '@locales'
import { SearchExerciseDataTypes, useStore, videoRecommendationType } from '@stores'
import { Colors, Sizes } from '@theme'
import { INavigation } from '@types'

import ExerciseModal from './exercise-modal/ExerciseModal'
import { styles } from './gbExercise.styles'

interface ISearchedExerciseCardProps {
  /** data: is required prop that gives data of exercise */
  data: SearchExerciseDataTypes
  /** dayId :is an optional prop that gives day id of exercise */
  dayId?: string
  /** exerciseId: is an optional prop that gives exercise id */
  exerciseId?: string
  /** isPlannerEnable: is an optional prop that tells whether planner is enable or not */
  isPlannerEnable?: boolean
  /** containerStyles: is an optional prop that gives container styles */
  containerStyles?: StyleProp<ViewStyle>
  /** position: is an optional prop that gives order position of exercise */
  position?: string
  /** videos: is an optional prop that gives videos of exercise */
  videos?: Array<videoRecommendationType>
  /** showDeleteButton: is an optional prop that tells whether show or not delete button */
  showDeleteButton?: boolean
}

const SearchedExerciseCard = (props: ISearchedExerciseCardProps) => {
  const {
    containerStyles = {},
    data,
    dayId = '',
    exerciseId = '',
    isPlannerEnable = false,
    position = '',
    showDeleteButton = true,
    videos = [],
  } = props
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
    <TouchableOpacity style={[styles.container, containerStyles]} onPress={onPress}>
      <GBFastImage imageStyles={styles.image} source={{ uri: gifUrl }} />
      <View style={styles.subContainer}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
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
        {!isPlannerEnable && showDeleteButton && (
          <DeleteIcon
            color={Colors.DeleteButton}
            onPress={toggleModalVisibility}
            style={styles.deleteButton}
          />
        )}
        {!!position && (
          <View style={styles.positionContainer}>
            <Text style={styles.detail}>{position}</Text>
          </View>
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
