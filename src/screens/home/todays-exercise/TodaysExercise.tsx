import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'
import moment from 'moment'

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
  const { exerciseStore, userStore } = domainStore
  const { getTodaysExercises, todaysExercise } = exerciseStore
  const { userData } = userStore
  const hasNoExerciseData = todaysExercise.length === 0

  const plannerStartDate = moment(userData.plannerStartDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ')
  const today = moment()

  const dayDifference = today.diff(plannerStartDate, 'days')
  const formattedDate = plannerStartDate.format('DD MMM')

  const noDataTitle =
    dayDifference < 0
      ? translate('screens.home.planner_start', { date: formattedDate })
      : translate('screens.home.no_exercise_found')

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
    return isLoading || isInitialRender ? <GBLoader /> : <GBLoader title={noDataTitle} />
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
