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
  const { plannerStore } = domainStore
  const { getDays, days } = plannerStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetDays) ?? {}
  const { isLoading: isAddingDay } = getApiStatus(ApiStatusPreset.AddDay) ?? {}
  const [isDayManagerOpen, setIsDayManagerOpen] = useState(false)
  const [isFirstRender, setIsFirstRender] = useState(true)

  const hasNoDays = days.length === 0

  const closeDayManager = () => {
    setIsDayManagerOpen(false)
  }

  const fetchData = async () => {
    await getDays()
    setIsFirstRender(false)
  }

  const onAddDayPress = () => {
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
      <GBLoader title={translate('screens.planner.no_days_found')} />
    )
  }

  const listHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.title}>{translate('screens.planner.my_days')}</Text>
        <GBButton
          containerCustomStyles={styles.addButton}
          leftIcon={<AddIcon color={Colors.Label} size={Sizes.Size_18} />}
          onPress={onAddDayPress}
          title={translate('common.add')}
          titleStyles={styles.addButtonTitle}
        />
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
        apiStatusPreset={ApiStatusPreset.GetExerciseVideo}
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
        <DayManager preset={DayPlannerPreset.AddDay} closeDayManager={closeDayManager} />
      )}
    </View>
  )
})

export default Planner
