import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

import LottieView from 'lottie-react-native'
import { observer } from 'mobx-react-lite'
import moment from 'moment'

import { WelcomeLottie } from '@assets'
import { GBAppHeader } from '@components'
import { ApiStatusPreset, ProfileManagerPreset } from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { Colors } from '@theme'

import ProfileManager from './profile-manager/ProfileManager'
import { styles } from './profile.styles'

const Profile = observer(() => {
  const { domainStore, apiStatusStore } = useStore()
  const { userStore } = domainStore
  const { userData, logoutUser } = userStore
  const { emailId, name, plannerStartDate } = userData
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.LogoutUser) ?? {}

  const [showProfileManager, setShowProfileManager] = useState(false)
  const [preset, setPreset] = useState(ProfileManagerPreset.NameUpdate)
  const formattedDate = plannerStartDate
    ? moment(plannerStartDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format('DD MMMM YYYY')
    : translate('screens.profile.not_added_yet')

  const closeProfileManager = () => {
    setShowProfileManager(false)
  }

  const onPress = (preset: ProfileManagerPreset) => () => {
    setShowProfileManager(true)
    setPreset(preset)
  }

  const onLogoutPress = () => {
    logoutUser()
  }

  return (
    <>
      <GBAppHeader title={translate('screens.profile.header')} showBackButton={false} />
      <View style={styles.detailsContainer}>
        <LottieView source={WelcomeLottie} autoPlay style={styles.lottie} />
        <Text style={styles.heading}>{translate('screens.profile.gymbuddy_profile')}</Text>
        <View style={styles.detailsSubContainer}>
          <Text style={styles.details}>{translate('screens.profile.name')}</Text>
          <Text>{' : '}</Text>
          <Text style={[styles.details, styles.title]}>{name}</Text>
          <TouchableOpacity onPress={onPress(ProfileManagerPreset.NameUpdate)}>
            <Text style={styles.edit}>{translate('common.edit')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsSubContainer}>
          <Text style={styles.details}>{translate('screens.profile.emailId')}</Text>
          <Text>{' : '}</Text>
          <Text style={styles.details}>{emailId}</Text>
          <TouchableOpacity onPress={onPress(ProfileManagerPreset.EmailUpdate)}>
            <Text style={styles.edit}>{translate('common.edit')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsSubContainer}>
          <Text style={styles.details}>{translate('screens.profile.planner_date')}</Text>
          <Text>{' : '}</Text>
          <Text style={[styles.details, styles.title]}>{formattedDate}</Text>
          <TouchableOpacity onPress={onPress(ProfileManagerPreset.PlannerDateUpdate)}>
            <Text style={styles.edit}>
              {plannerStartDate ? translate('common.edit') : translate('common.add')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onLogoutPress}>
          {isLoading ? (
            <ActivityIndicator color={Colors.ActiveTab} />
          ) : (
            <Text style={styles.bottomText}>{translate('screens.profile.logout')}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress(ProfileManagerPreset.changePassword)}>
          <Text style={styles.bottomText}>{translate('screens.profile.change_password')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress(ProfileManagerPreset.DeleteAccount)}>
          <Text style={[styles.bottomText, styles.delete]}>
            {translate('screens.profile.delete_acc')}
          </Text>
        </TouchableOpacity>
      </View>
      {showProfileManager && (
        <ProfileManager preset={preset} closeProfileManager={closeProfileManager} />
      )}
    </>
  )
})

export default Profile
