// TODO: this file will get updated later
import React from 'react'
import { Button, Text, View } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const Profile = () => {
  return (
    <View>
      <Text>Profile</Text>
      <Button
        title="Logout"
        onPress={() => {
          AsyncStorage.clear()
        }}
      />
    </View>
  )
}

export default Profile
