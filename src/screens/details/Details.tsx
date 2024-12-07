import React, { useEffect, useRef, useState } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBButton, GBExerciseCard, GBFlatList, GBLoader } from '@components'
import { ApiStatusPreset, RouteName } from '@constants'
import { translate } from '@locales'
import { AppStackScreenProps } from '@navigators'
import {
  exerciseDataType,
  useStore,
  videoRecommendationItemType,
  videoRecommendationType,
} from '@stores'
import { CommonStyles } from '@theme'
import { enableLayoutAnimation, layoutAnimation } from '@utils'

import Counter from './counter/Counter'
import DaySelector from './day-selector/DaySelector'
import { styles } from './details.styles'
import GifViewer from './gif-viewer/GifViewer'
import Instructions from './instructions/Instructions'

type IDetailsProp = AppStackScreenProps<RouteName.Details>

const Details = observer((props: IDetailsProp) => {
  const { route } = props
  const { params } = route
  const { data } = params
  const { bodyPart, equipment, gifUrl, instructions, name, target } = data

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
  const [openDaySelector, SetOpenDaySelector] = useState(false)

  const bookmarkedVideos = useRef<Array<videoRecommendationType>>([])

  const buttonTitle = addingState
    ? translate('screens.details.select_day')
    : translate('screens.details.add_to_planner')

  enableLayoutAnimation()

  const toggleAddingState = () => {
    layoutAnimation()
    setAddingState(prev => !prev)
  }

  const closeDaySelector = () => {
    SetOpenDaySelector(false)
  }

  const onSelectDayPress = () => {
    SetOpenDaySelector(true)
  }

  const onBookmarkPress = (thumbnail: string, videoId: string, title: string) => () => {
    if (bookmarkedVideos.current.some(video => video.videoId === videoId)) {
      bookmarkedVideos.current = bookmarkedVideos.current.filter(video => video.videoId !== videoId)
    } else {
      bookmarkedVideos.current = [...bookmarkedVideos.current, { thumbnail, videoId, title }]
    }
  }

  const onButtonPress = addingState ? onSelectDayPress : toggleAddingState

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
    setsCount > 1 && setSetsCount(setsCount - 1)
  }

  const onCardPress = (video_id: string) => () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${video_id}`)
  }

  const onEndReached = () => {
    fetchData()
  }

  const renderItem = ({ item }: { item: videoRecommendationItemType }) => {
    const { thumbnails, video_id, title } = item
    const thumbnail = thumbnails[0].url
    return (
      <GBExerciseCard
        imageUrl={thumbnail}
        isAddingState={addingState}
        onBookmarkPress={onBookmarkPress(thumbnail, video_id, title)}
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
        {!!data && <Instructions data={instructions} />}
        {addingState && (
          <>
            <Text style={styles.details}>{translate('screens.details.add_rep_set')}</Text>
            <View style={styles.counterContainer}>
              <Counter
                count={repsCount}
                label={translate('screens.details.reps')}
                onDecrease={onDecreaseRep}
                onIncrease={onIncreaseRep}
              />
              <View style={styles.separator} />
              <Counter
                count={setsCount}
                label={translate('screens.details.sets')}
                onDecrease={onDecreaseSet}
                onIncrease={onIncreaseSet}
              />
            </View>
          </>
        )}
        {addingState ? (
          <Text style={styles.details}>{translate('screens.details.select_videos')}</Text>
        ) : (
          <Text style={styles.details}>{translate('screens.details.video_recommendations')}</Text>
        )}
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
        {addingState && (
          <GBButton
            containerCustomStyles={styles.button}
            onPress={toggleAddingState}
            title={translate('screens.details.cancel')}
          />
        )}
        <GBButton
          containerCustomStyles={styles.button}
          onPress={onButtonPress}
          title={buttonTitle}
        />
      </View>
      {openDaySelector && (
        <DaySelector
          closeDaySelector={closeDaySelector}
          exerciseDetails={data as exerciseDataType}
          videoRecommendations={bookmarkedVideos.current}
          sets={setsCount}
          reps={repsCount}
        />
      )}
    </>
  )
})

export default Details
