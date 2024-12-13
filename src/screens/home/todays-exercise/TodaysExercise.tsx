import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBExerciseCard, GBLoader } from '@components'
import { ApiStatusPreset, RNCarouselPreset } from '@constants'
import { translate } from '@locales'
import { exerciseDataType, useStore } from '@stores'

import RNCarousel from '../carousel/RNCarousel'

import { styles } from './todaysExercise.styles'

const TodaysExercise = observer(() => {
  const { apiStatusStore, domainStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetTodaysExercises) ?? {}
  const [isInitialRender, setIsInitialRender] = useState(true)
  const { exerciseStore } = domainStore
  const { getTodaysExercises, todaysExercise } = exerciseStore
  const hasNoExerciseData = todaysExercise.length === 0

  const fetchData = () => {
    getTodaysExercises()
    setIsInitialRender(false)
  }

  const renderItem = ({ item, index }: { item: exerciseDataType; index: number }) => {
    const { exerciseDetails, _id: exerciseId, videoRecommendations: videos, dayId } = item
    return (
      <GBExerciseCard
        containerStyles={styles.exerciseCard}
        data={exerciseDetails}
        dayId={dayId}
        exerciseId={exerciseId}
        isPlannerEnable={false}
        position={`${index + 1}`}
        showDeleteButton={false}
        videos={videos}
      />
    )
  }

  const listEmptyComponent = () => {
    return isLoading || isInitialRender ? (
      <GBLoader />
    ) : (
      <GBLoader title={translate('screens.home.no_exercise_found')} />
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View>
      {isLoading || hasNoExerciseData ? (
        listEmptyComponent()
      ) : (
        <RNCarousel
          autoPlay={false}
          data={todaysExercise}
          preset={RNCarouselPreset.QuickSWipe}
          renderItem={renderItem}
        />
      )}
    </View>
  )
})

export default TodaysExercise
