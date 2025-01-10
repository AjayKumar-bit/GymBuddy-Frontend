import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PlusIcon as AddIcon } from 'react-native-heroicons/solid'

import { useNavigation } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBButton, GBFlatList, GBLoader } from '@components'
import { ApiStatusPreset, DayPlannerPreset, ExerciseListScreenPreset, RouteName } from '@constants'
import { translate } from '@locales'
import { DaysItemTypes, useStore } from '@stores'
import { Colors, CommonStyles, Sizes } from '@theme'
import { INavigation } from '@types'

import DayManager from './day-manager/DayManager'
import DaysCard from './days-card/DaysCard'
import { styles } from './planner.styles'

const Planner = observer(() => {
  const navigation = useNavigation<INavigation>()
  const { domainStore, apiStatusStore } = useStore()
  const { plannerStore, userStore } = domainStore
  const { userData } = userStore
  const { plannerStartDate } = userData
  const { getDays, days } = plannerStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetDays) ?? {}
  const { isLoading: isAddingDay } = getApiStatus(ApiStatusPreset.AddDay) ?? {}
  const [isDayManagerOpen, setIsDayManagerOpen] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [isAddDayPreset, setIsAddDayPreset] = useState(true)

  const hasNoDays = days.length === 0

  const closeDayManager = () => {
    setIsDayManagerOpen(false)
  }

  const fetchData = async () => {
    await getDays()
    setIsFirstRender(false)
  }

  const onAddDayPress = () => {
    setIsAddDayPreset(true)
    setIsDayManagerOpen(true)
  }

  const onStartPlannerPress = () => {
    setIsAddDayPreset(false)
    setIsDayManagerOpen(true)
  }

  const onCardPress = (dayId: string, dayName: string) => () => {
    navigation.navigate(RouteName.Search, {
      dayId,
      dayName,
      preset: ExerciseListScreenPreset.MyExercises,
    })
  }

  const renderItem = ({ item }: { item: DaysItemTypes }) => {
    const { _id: id, dayName } = item
    return <DaysCard key={id} id={id} onCardPress={onCardPress(id, dayName)} title={dayName} />
  }

  const keyExtractor = ({ _id }: DaysItemTypes) => _id

  const listEmptyComponent = () => {
    return isLoading || isFirstRender ? (
      <GBLoader />
    ) : (
      <GBLoader
        fetchData={fetchData}
        retryEnabled
        title={translate('screens.planner.no_days_found')}
      />
    )
  }

  const listHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.title}>{translate('screens.planner.my_days')}</Text>
        <View style={styles.buttonContainer}>
          {!plannerStartDate && (
            <GBButton
              containerCustomStyles={styles.button}
              onPress={onStartPlannerPress}
              title={translate('screens.planner.start')}
              titleStyles={styles.buttonTitle}
            />
          )}
          <GBButton
            containerCustomStyles={styles.button}
            leftIcon={<AddIcon color={Colors.PrimaryText} size={Sizes.Size_18} />}
            onPress={onAddDayPress}
            title={translate('common.add')}
            titleStyles={styles.buttonTitle}
          />
        </View>
      </View>
    )
  }

  const contentContainerStyles = isLoading || hasNoDays ? CommonStyles.flex_1 : {}
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={CommonStyles.flex_1}>
      <GBAppHeader title={translate('screens.planner.header')} showBackButton={false} />
      <GBFlatList
        apiStatusPreset={ApiStatusPreset.GetDays}
        contentContainerStyle={[styles.contentContainerStyle, contentContainerStyles]}
        data={days}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        onRefresh={fetchData}
        refreshing={isAddingDay}
        renderItem={renderItem}
      />
      {isDayManagerOpen && (
        <DayManager
          preset={isAddDayPreset ? DayPlannerPreset.AddDay : DayPlannerPreset.StartPlanner}
          closeDayManager={closeDayManager}
        />
      )}
    </View>
  )
})

export default Planner
