import React, { useEffect, useState } from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBExerciseCard, GBFlatList, GBLoader } from '@components'
import { ApiStatusPreset, RouteName } from '@constants'
import { AppStackScreenProps } from '@navigators'
import { useStore, videoRecommendationItemType } from '@stores'

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
    //  bodyPart, equipment, // TODO: will uncomment this later when wil use it
    gifUrl,
    //  id,
    instructions,
    name,
    //  secondaryMuscles, target
  } = data

  const { domainStore, apiStatusStore } = useStore()
  const { searchStore } = domainStore
  const { getExerciseVideo, videoRecommendation } = searchStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetExerciseVideo) ?? {}

  const [repsCount, setRepsCount] = useState(1)
  const [setsCount, setSetsCount] = useState(1)

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
      <GBExerciseCard imageUrl={thumbnails[0].url} title={title} onPress={onCardPress(video_id)} />
    )
  }

  const keyExtractor = (item: videoRecommendationItemType) => item.title

  const listEmptyComponent = () =>
    isLoading ? <GBLoader /> : <GBLoader title="No Recommendation Found" />

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <GBAppHeader title="Exercise Details" />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <GifViewer gifUrl={gifUrl} name={name} />
        <View style={styles.counterContainer}>
          <Counter
            count={repsCount}
            onDecrease={onDecreaseRep}
            onIncrease={onIncreaseRep}
            label="Reps"
          />
          <View style={styles.separator} />
          <Counter
            count={setsCount}
            onDecrease={onDecreaseSet}
            onIncrease={onIncreaseSet}
            label="Sets"
          />
        </View>
        <Instructions data={instructions} />
        <Text style={styles.recommendation}>Videos Recommendation</Text>
        <GBFlatList
          apiStatusPreset={ApiStatusPreset.GetExerciseVideo}
          data={videoRecommendation}
          horizontal
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmptyComponent}
          contentContainerStyle={styles.contentContainerStyle}
          onEndReached={onEndReached}
        />
      </ScrollView>
    </>
  )
})

export default Details
