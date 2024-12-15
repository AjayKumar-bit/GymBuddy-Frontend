import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { PlusIcon as AddIcon } from 'react-native-heroicons/solid'

import { GBAppHeader, GBButton, GBFlatList, GBLoader } from '@components'
import { ReminderManagerPreset } from '@constants'
import { translate } from '@locales'
import { Colors, CommonStyles, Sizes } from '@theme'
import { IReminderType } from '@types'
import { getReminders } from '@utils'

import ReminderCard from './reminder-card/ReminderCard'
import ReminderManager from './reminder-manager/ReminderManager'
import { styles } from './reminders.styles'

const Reminders = () => {
  const [showReminderManage, setShowReminderManage] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingState, setIsAddingState] = useState(false)
  const [reminders, setReminders] = useState<Array<IReminderType>>([])
  const [reminderDetails, setReminderDetails] = useState({
    id: '',
    title: '',
  })

  const loadReminders = async () => {
    setIsLoading(true)
    const reminder = await getReminders()
    setReminders(reminder)
    setIsLoading(false)
  }

  const closeReminderManager = () => {
    setShowReminderManage(false)
  }

  const onAddDayPress = () => {
    setIsAddingState(true)
    setShowReminderManage(true)
  }

  const keyExtractor = ({ id }: { id: string }) => id

  const listEmptyComponent = () => {
    return isLoading ? (
      <GBLoader />
    ) : (
      <GBLoader title={translate('screens.reminders.no_reminders')} />
    )
  }

  const listHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.title}>{translate('screens.reminders.my_reminders')}</Text>
        <View style={styles.buttonContainer}>
          <GBButton
            containerCustomStyles={styles.button}
            leftIcon={<AddIcon color={Colors.Label} size={Sizes.Size_18} />}
            onPress={onAddDayPress}
            title={translate('common.add')}
            titleStyles={styles.buttonTitle}
          />
        </View>
      </View>
    )
  }

  const onDeletePress = (id: string, title: string) => () => {
    setReminderDetails({ id, title })
    setIsAddingState(false)
    setShowReminderManage(true)
  }

  const renderItem = ({ item }: { item: IReminderType }) => {
    const { id = '', title, time, description = '' } = item
    return (
      <ReminderCard
        description={description}
        key={id}
        onDeletePress={onDeletePress(id, title)}
        time={time}
        title={title}
      />
    )
  }

  const onReminderDelete = (reminderId: string) => {
    setReminders(prev => prev.filter(({ id }) => id !== reminderId))
  }
  const onReminderAdd = (item: IReminderType) => {
    setReminders(prev => [...prev, item])
  }

  const contentContainerStyles = isLoading || reminders.length === 0 ? CommonStyles.flex_1 : {}

  useEffect(() => {
    loadReminders()
  }, [])

  return (
    <>
      <GBAppHeader title={translate('screens.reminders.header')} showBackButton={false} />
      <GBFlatList
        contentContainerStyle={[styles.contentContainerStyle, contentContainerStyles]}
        data={reminders}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
      />
      {showReminderManage && (
        <ReminderManager
          preset={isAddingState ? ReminderManagerPreset.Add : ReminderManagerPreset.Delete}
          closeReminderManager={closeReminderManager}
          title={reminderDetails.title}
          reminderId={reminderDetails.id}
          onReminderDelete={onReminderDelete}
          onReminderAdd={onReminderAdd}
        />
      )}
    </>
  )
}

export default Reminders
