import React, { useEffect, useState } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBButton, GBExerciseCard, GBFlatList, GBLoader } from '@components'
import { log } from '@config'
import { ApiStatusPreset, RouteName } from '@constants'
import { translate } from '@locales'
import { AppStackScreenProps } from '@navigators'
import { useStore, videoRecommendationItemType } from '@stores'
import { CommonStyles } from '@theme'

import Counter from './counter/Counter'
import { styles } from './details.styles'
import GifViewer from './gif-viewer/GifViewer'
import Instructions from './instructions/Instructions'

type IDetailsProp = AppStackScreenProps<RouteName.Details>

const Details = observer((props: IDetailsProp) => {
  const { route } = props
  const { params } = route
  const { data } = params
  const {
    bodyPart,
    equipment,
    gifUrl,
    //  id,
    instructions,
    name,
    target,
  } = data

  const { domainStore, apiStatusStore } = useStore()
  const { searchStore } = domainStore
  const { getExerciseVideo, videoRecommendation } = searchStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetExerciseVideo) ?? { isLoading: true }
  const hasNoRecommendation = videoRecommendation.length === 0
  const targetedBody = bodyPart.toUpperCase()
  const requiredEquipment = equipment.toUpperCase()
  const targetMuscle = target.toUpperCase()

  const [addingState, setAddingState] = useState(false)
  const [repsCount, setRepsCount] = useState(1)
  const [setsCount, setSetsCount] = useState(1)
  const buttonTitle = addingState
    ? translate('screens.details.select_day')
    : translate('screens.details.add_to_planner')

  const toggleAddingState = () => {
    setAddingState(prev => !prev)
  }

  const selectDay = () => {
    log.info('day select')
  }

  const onButtonPress = addingState ? selectDay : toggleAddingState

  const fetchData = () => {
    getExerciseVideo(name)
  }

  const onIncreaseRep = () => {
    setRepsCount(repsCount + 1)
  }

  const onDecreaseRep = () => {
    repsCount > 1 && setRepsCount(repsCount - 1)
  }

  const onIncreaseSet = () => {
    setSetsCount(setsCount + 1)
  }

  const onDecreaseSet = () => {
    setsCount > 1 && setSetsCount(repsCount - 1)
  }

  const onCardPress = (video_id: string) => () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${video_id}`)
  }

  const onEndReached = () => {
    fetchData()
  }

  const renderItem = ({ item }: { item: videoRecommendationItemType }) => {
    const { thumbnails, video_id, title } = item
    return (
      <GBExerciseCard
        imageUrl={thumbnails[0].url}
        isAddingState={addingState}
        onPress={onCardPress(video_id)}
        title={title}
      />
    )
  }

  const keyExtractor = (item: videoRecommendationItemType) => item.title

  const listEmptyComponent = () => {
    return (
      <View style={CommonStyles.flex_1}>
        {isLoading ? (
          <GBLoader />
        ) : (
          <GBLoader title={translate('screens.details.no_recommendation')} />
        )}
      </View>
    )
  }

  const contentContainerStyles = isLoading || hasNoRecommendation ? CommonStyles.flex_1 : {}
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <GBAppHeader title={translate('screens.details.header')} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GifViewer gifUrl={gifUrl} name={name} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailsSubContainer}>
            <Text style={styles.details}>{translate('screens.details.targeted_body_part')}</Text>
            <Text>:</Text>
            <Text style={styles.details}>{targetedBody}</Text>
          </View>
          <View style={styles.detailsSubContainer}>
            <Text style={styles.details}>{translate('screens.details.targeted_muscles')}</Text>
            <Text>:</Text>
            <Text style={styles.details}>{targetMuscle}</Text>
          </View>
          <View style={styles.detailsSubContainer}>
            <Text style={styles.details}>{translate('screens.details.required_equipment')}</Text>
            <Text>:</Text>
            <Text style={styles.details}>{requiredEquipment}</Text>
          </View>
        </View>
        <Instructions data={instructions} />
        {addingState && (
          <View style={styles.counterContainer}>
            <Counter
              count={repsCount}
              onDecrease={onDecreaseRep}
              onIncrease={onIncreaseRep}
              label={translate('screens.details.reps')}
            />
            <View style={styles.separator} />
            <Counter
              count={setsCount}
              onDecrease={onDecreaseSet}
              onIncrease={onIncreaseSet}
              label={translate('screens.details.sets')}
            />
          </View>
        )}
        <Text style={styles.details}>{translate('screens.details.video_recommendations')}</Text>
        <GBFlatList
          apiStatusPreset={ApiStatusPreset.GetExerciseVideo}
          data={videoRecommendation}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={[styles.contentContainerStyle, contentContainerStyles]}
          onEndReached={onEndReached}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <GBButton
          title={buttonTitle}
          onPress={onButtonPress}
          containerCustomStyles={styles.button}
        />
        {addingState && (
          <GBButton
            title={translate('screens.details.cancel')}
            onPress={toggleAddingState}
            containerCustomStyles={styles.button}
          />
        )}
      </View>
    </>
  )
})

export default Details
