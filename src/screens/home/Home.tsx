import React, { useState } from 'react'
import { Text, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBLoader, GBTextInput } from '@components'
import { RouteName, TextInputPreset } from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { INavigation } from '@types'

import { styles } from './home.styles'

const Home = observer(() => {
  const navigation = useNavigation<INavigation>()
  const { domainStore } = useStore()
  const { searchStore } = domainStore
  const { searchExercise } = searchStore

  const [searchedExerCise, SetSearchedExerCise] = useState('')

  const onSearchIconPress = () => {
    searchExercise({ exerciseName: searchedExerCise, isLoading: true })
    navigation.navigate(RouteName.Search, { prevSearchedExercise: searchedExerCise })
  }

  const onTextChange = (value: string) => {
    SetSearchedExerCise(value)
  }

  return (
    <>
      <GBAppHeader title={translate('title')} showBackButton={false} />
      <View style={styles.container}>
        <GBTextInput
          preset={TextInputPreset.Search}
          placeHolder={translate('common.search')}
          containerStyles={styles.textInputContainer}
          onSearchIconPress={onSearchIconPress}
          onTextChange={onTextChange}
        />
        <Text>Home</Text>
        <GBLoader />
      </View>
    </>
  )
})

export default Home
