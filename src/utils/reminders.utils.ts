import { Platform } from 'react-native'
import { PERMISSIONS, requestMultiple, requestNotifications } from 'react-native-permissions'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { log } from '@config'
import { IS_ANDROID, REMINDERS_KEY } from '@constants'
import notifee, {
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidVisibility,
  RepeatFrequency,
  TriggerType,
} from '@notifee/react-native'
import { Colors } from '@theme'
import { IReminderType } from '@types'

export const getTimestamp = (timeString: string) => {
  const [time, modifier] = timeString.split(' ')
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':').map(Number)

  if (modifier === 'PM' && hours !== 12) {
    hours += 12
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0
  }

  const now = new Date()
  const today = new Date()
  today.setHours(hours, minutes, 0, 0)

  // Check if the time has already passed today
  if (today.getTime() <= now.getTime()) {
    // If time has passed, set the time for the next day
    today.setDate(today.getDate() + 1)
  }

  return today.getTime()
}

// eslint-disable-next-line consistent-return
export const getReminders = async () => {
  try {
    const data = await AsyncStorage.getItem(REMINDERS_KEY)
    const reminders = data ? await JSON.parse(data) : []
    return reminders
  } catch (error) {
    log.error('Error will loading reminders :', error)
  }
}

export const addReminder = async (params: IReminderType) => {
  const { time, title, description } = params
  const randomId = String(Math.random())
  const reminderId = `notification-${randomId}`
  const timestamp = getTimestamp(time)

  try {
    if (!IS_ANDROID) {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp,
        repeatFrequency: RepeatFrequency.WEEKLY,
      }

      await notifee.createTriggerNotification(
        {
          id: reminderId,
          title,
          body: description,
          ios: {
            sound: 'notification.wav',
            foregroundPresentationOptions: {
              alert: true,
              badge: true,
              sound: true,
              list: true,
            },
          },
          data: {
            route: 'Reminders',
          },
        },
        trigger,
      )
    } else {
      const trigger = {
        type: TriggerType.TIMESTAMP,
        timestamp,
        repeatFrequency: RepeatFrequency.WEEKLY,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        alarmManager: {
          allowWhileIdle: true,
        },
      }

      await notifee.createTriggerNotification(
        {
          id: reminderId,
          title,
          body: description,
          android: {
            channelId: 'reminder',
            smallIcon: 'ic_notification',
            color: Colors.ActiveTab,
            sound: 'notification.wav',
            pressAction: {
              id: 'default',
              launchActivity: 'default',
              launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
            },
          },
          data: {
            route: 'Reminder',
          },
        },
        trigger,
      )
    }

    const newReminder = {
      id: reminderId,
      title,
      time,
      description,
    }

    const reminders = await getReminders()
    reminders.push(newReminder)

    await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(reminders))
  } catch (error) {
    log.error('Error while adding reminders :', error)
  }
  return reminderId
}

export const deleteReminder = async (reminderId: string) => {
  try {
    await notifee.cancelNotification(reminderId)
    const reminders = await getReminders()
    const updatedReminders = reminders.filter(({ id }: { id: string }) => id !== reminderId)
    await AsyncStorage.setItem(REMINDERS_KEY, JSON.stringify(updatedReminders))
  } catch (error) {
    log.error('Failed to delete reminder:', error)
  }
}

export const getPermissions = () => {
  try {
    if (IS_ANDROID) {
      if ((Platform.Version as number) >= 33) {
        requestMultiple([PERMISSIONS.ANDROID.POST_NOTIFICATIONS])
      }
      notifee.createChannel({
        id: 'reminder',
        name: 'Reminders',
        sound: 'notification',
        visibility: AndroidVisibility.PUBLIC,
        importance: AndroidImportance.HIGH,
        vibration: true,
        description: 'Reminder Notifications',
      })
    } else {
      requestNotifications(['alert', 'sound', 'badge'])
    }
  } catch (error) {
    log.error('permission not given :', error)
  }
}
