import React, { useEffect, useRef } from 'react'
import { Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { GBButton, GBFlatList, GBLoader, GBModal } from '@components'
import { ApiStatusPreset } from '@constants'
import { translate } from '@locales'
import { DaysItemTypes, exerciseDataType, useStore, videoRecommendationType } from '@stores'
import { INavigation } from '@types'

import DaysCard from '../days-card/DaysCard'

import { styles } from './daySelector.styles.'

interface IDaySelectorProps {
  /** closeDayManager : is a required prop that trigger to close day planner manager */
  closeDaySelector: () => void
  /** exerciseDetails: is a required prop that give exercise details */
  exerciseDetails: exerciseDataType
  /** videoRecommendations: is a required prop that give selected video recommendations */
  videoRecommendations: Array<videoRecommendationType>
  /** sets: is a required prop that give no. of sets */
  sets: number
  /** reps: is a required prop that give no. of reps */
  reps: number
}

const DaySelector = observer((props: IDaySelectorProps) => {
  const { closeDaySelector, exerciseDetails, videoRecommendations, sets, reps } = props
  const navigation = useNavigation<INavigation>()
  const { apiStatusStore, domainStore } = useStore()
  const { plannerStore, exerciseStore } = domainStore
  const { getDays, days } = plannerStore
  const { addExercise } = exerciseStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetDays) ?? {}

  const dayIdsRef = useRef<Array<string>>([])

  const fetchData = () => {
    days.length === 0 && getDays()
  }

  const onCardPress = (id: string) => () => {
    if (dayIdsRef.current.includes(id)) {
      dayIdsRef.current = dayIdsRef.current.filter(dayId => dayId !== id)
    } else {
      dayIdsRef.current = [...dayIdsRef.current, id]
    }
  }

  const onButtonPress = async () => {
    await addExercise({
      data: {
        dayIds: dayIdsRef.current,
        exerciseDetails: { ...exerciseDetails, sets, reps },
        videoRecommendations,
      },
    })
    closeDaySelector()
  }

  const renderItem = ({ item }: { item: DaysItemTypes }) => {
    const { _id: id, dayName } = item
    return <DaysCard key={id} onCardPress={onCardPress(id)} dayName={dayName} />
  }

  const keyExtractor = ({ _id }: DaysItemTypes) => _id

  const listEmptyComponent = () => {
    return isLoading ? (
      <GBLoader />
    ) : (
      <GBLoader title={translate('screens.details.no_days_found')} />
    )
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    // note: this effect will to monitor hasSuccess observable state
    const disposer = reaction(
      () => apiStatusStore.getApiStatus(ApiStatusPreset.AddExercise)?.hasSuccess,
      success => {
        if (success) {
          navigation.goBack()
        }
      },
    )

    return () => disposer() // note: Cleanup to dispose reaction as reaction wait forever for change in observable state
  }, [])

  return (
    <GBModal isModalVisible onCloseModal={closeDaySelector} styles={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>{translate('screens.details.select_day')}</Text>
        <GBFlatList
          data={days}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={[styles.contentContainerStyle]}
        />
        <View style={styles.buttonContainer}>
          <GBButton
            title={translate('common.cancel')}
            onPress={closeDaySelector}
            containerCustomStyles={styles.cancelButton}
          />
          <GBButton
            title={translate('common.add')}
            onPress={onButtonPress}
            apiStatusPreset={ApiStatusPreset.AddExercise}
            containerCustomStyles={styles.addButton}
            loaderStyles={styles.loader}
          />
        </View>
      </View>
    </GBModal>
  )
})

export default DaySelector
