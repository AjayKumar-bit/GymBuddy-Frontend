import React, { useState } from 'react'
import { ScrollView, Text } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBTextInput } from '@components'
import {
  BODYPART_DATA,
  ExerciseListScreenPreset,
  RouteName,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  TextInputPreset,
} from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { BodyPartItem, INavigation } from '@types'

import BodyCard from './body-card/BodyCard'
import RNCarousel from './carousel/RNCarousel'
import { styles } from './home.styles'
import RecommendedExercises from './recommended-exercises/RecommendedExercises'
import TodaysExercise from './todays-exercise/TodaysExercise'

const Home = observer(() => {
  const navigation = useNavigation<INavigation>()
  const { domainStore } = useStore()
  const { searchStore } = domainStore
  const { searchExercise } = searchStore
  const [searchedExerCise, SetSearchedExerCise] = useState('')
  const onSearchIconPress = () => {
    searchExercise({ exerciseName: searchedExerCise, isLoading: true })
    navigation.navigate(RouteName.Search, {
      prevSearchedExercise: searchedExerCise,
      preset: ExerciseListScreenPreset.Search,
    })
  }
  const onTextChange = (value: string) => {
    SetSearchedExerCise(value)
  }

  const renderBodyPart = ({ item }: { item: BodyPartItem }) => {
    const { title, image } = item
    return <BodyCard image={image} title={title} />
  }

  return (
    <>
      <GBAppHeader title={translate('title')} showBackButton={false} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <GBTextInput
          preset={TextInputPreset.Search}
          placeHolder={translate('common.search')}
          containerStyles={styles.textInputContainer}
          onSearchIconPress={onSearchIconPress}
          onTextChange={onTextChange}
        />
        <Text style={styles.header}>{translate('screens.home.search_exercises_for')}</Text>
        <RNCarousel
          data={BODYPART_DATA}
          height={SCREEN_HEIGHT * 0.22}
          renderItem={renderBodyPart}
          style={styles.bodypartCarousel}
          width={SCREEN_WIDTH * 0.7}
        />
        <Text style={styles.header}>{translate('screens.home.today_exercises')}</Text>
        <TodaysExercise />
        <Text style={styles.header}>{translate('screens.home.gymbuddy_recommendations')}</Text>
        <RecommendedExercises />
      </ScrollView>
    </>
  )
})
export default Home
