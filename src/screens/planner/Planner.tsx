import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PlusIcon as AddIcon } from 'react-native-heroicons/solid'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBButton, GBFlatList, GBLoader } from '@components'
import { ApiStatusPreset, DayPlannerPreset } from '@constants'
import { translate } from '@locales'
import { DaysItemTypes, useStore } from '@stores'
import { Colors, CommonStyles, Sizes } from '@theme'

import DayManager from './day-manager/DayManager'
import DaysCard from './days-card/DaysCard'
import { styles } from './planner.styles'

const Planner = observer(() => {
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

  const onCardPress = () => {}

  const renderItem = ({ item }: { item: DaysItemTypes }) => {
    const { _id: id, dayName } = item
    return <DaysCard key={id} id={id} onCardPress={onCardPress} title={dayName} />
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
          title={translate('common.add')}
          onPress={onAddDayPress}
          leftIcon={<AddIcon color={Colors.Label} size={Sizes.Size_18} />}
          containerCustomStyles={styles.addButton}
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
        ListHeaderComponent={listHeaderComponent}
        apiStatusPreset={ApiStatusPreset.GetExerciseVideo}
        data={days}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={[styles.contentContainerStyle, contentContainerStyles]}
        refreshing={isAddingDay}
        onRefresh={fetchData}
      />
      {isDayManagerOpen && (
        <DayManager preset={DayPlannerPreset.AddDay} closeDayManager={closeDayManager} />
      )}
    </View>
  )
})

export default Planner
