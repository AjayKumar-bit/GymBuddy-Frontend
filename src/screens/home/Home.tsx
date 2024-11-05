import React from 'react'
import { Text, View } from 'react-native'

import GBAppHeader from '../../components/app-header/GBAppHeader'

const Home = () => {
  return (
    <View>
      <GBAppHeader title="GymBuddy" showBackButton={false} />
      <Text>Home</Text>
    </View>
  )
}

export default Home
