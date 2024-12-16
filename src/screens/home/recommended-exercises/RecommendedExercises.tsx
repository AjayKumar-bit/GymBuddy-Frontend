import React, { useEffect, useState } from 'react'
import { View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBExerciseCard, GBLoader } from '@components'
import { ApiStatusPreset, RNCarouselPreset, SCREEN_WIDTH } from '@constants'
import { translate } from '@locales'
import { SearchExerciseDataTypes, useStore } from '@stores'

import RNCarousel from '../carousel/RNCarousel'

import { styles } from './recommendedExercises.styles'

const RecommendedExercises = observer(() => {
  const { apiStatusStore, domainStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetRecommendedExercises) ?? {}
  const [isInitialRender, setIsInitialRender] = useState(true)
  const { exerciseStore } = domainStore
  const { getRecommendedExercises, recommendedExercises } = exerciseStore
  const hasNoExerciseData = recommendedExercises.length === 0

  const fetchData = () => {
    getRecommendedExercises()
    setIsInitialRender(false)
  }

  const renderItem = ({ item }: { item: SearchExerciseDataTypes }) => {
    return (
      <GBExerciseCard
        containerStyles={styles.exerciseCard}
        data={item}
        isPlannerEnable
        showDeleteButton={false}
      />
    )
  }

  const listEmptyComponent = () => {
    return isLoading || isInitialRender ? (
      <GBLoader />
    ) : (
      <GBLoader
        title={translate('screens.home.no_recommendation')}
        retryEnabled
        fetchData={fetchData}
      />
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
          data={recommendedExercises}
          modeConfig={{ parallaxScrollingScale: 1, parallaxScrollingOffset: 0 }}
          preset={RNCarouselPreset.Parallax}
          renderItem={renderItem}
          width={SCREEN_WIDTH}
        />
      )}
    </View>
  )
})

export default RecommendedExercises
