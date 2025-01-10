import React, { useEffect, useState } from 'react'
import { Linking, Text, TouchableOpacity, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBFlatList, GBLoader, GBVideoCard } from '@components'
import { ApiStatusPreset } from '@constants'
import { translate } from '@locales'
import { useStore, videoRecommendationItemType, videoRecommendationType } from '@stores'
import { CommonStyles } from '@theme'

import { styles } from './videos.styles'

interface showBackButtonType {
  isRepSetUpdating: boolean
  isVideoUpdating: boolean
}

interface IVideosProps {
  /** addingState : is a required prop that tells whether adding state is active or not */
  addingState: boolean
  /** bookmarkedVideos: is a required prop that gives book marked videos */
  bookmarkedVideos: React.MutableRefObject<Array<videoRecommendationType>>
  /** exerciseName: is a required prop that gives exercise name */
  exerciseName: string
  /** isPlannerEnable : is required prop that tells whether planned is enable or not */
  isPlannerEnable: boolean
  /** removeVideos: is required prop that gives removed videos */
  removeVideos: React.MutableRefObject<Array<string>>
  /** setUpdateTrigger: is a required prop that triggered when any update happens in rep,set and videos */
  setUpdateTrigger: React.Dispatch<React.SetStateAction<number>>
  /** showUpdateButton : is required prop that tell is update button visible or not */
  showUpdateButton: React.MutableRefObject<showBackButtonType>
  /** videos: is a required prop that give videos */
  videos: Array<videoRecommendationType>
}

const Videos = observer((props: IVideosProps) => {
  const {
    addingState,
    bookmarkedVideos,
    exerciseName,
    isPlannerEnable,
    removeVideos,
    setUpdateTrigger,
    showUpdateButton,
    videos,
  } = props

  const { domainStore, apiStatusStore } = useStore()
  const { searchStore } = domainStore
  const { getExerciseVideo, videoRecommendation } = searchStore
  const { getApiStatus } = apiStatusStore
  const { isLoading } = getApiStatus(ApiStatusPreset.GetExerciseVideo) ?? {}

  const [isUpdatingVideos, setIsUpdatingVideos] = useState(false)

  const toggleUpdatingVideoState = () => {
    setIsUpdatingVideos(prev => !prev)
    if (isUpdatingVideos) {
      showUpdateButton.current.isVideoUpdating = false
    } else {
      showUpdateButton.current.isVideoUpdating = true
    }
  }

  const showVideoRecommendation = isUpdatingVideos || isPlannerEnable

  const rightText =
    videos.length === 0 ? translate('screens.details.add_videos') : translate('common.edit')

  const leftText =
    videos.length === 0
      ? translate('screens.details.your_videos')
      : translate('screens.details.remove_videos')

  const fetchData = () => {
    getExerciseVideo(exerciseName, true)
  }

  const onCardPress = (video_id: string) => () => {
    Linking.openURL(`https://www.youtube.com/watch?v=${video_id}`)
  }

  const onEndReached = () => {
    fetchData()
  }

  const onBookmarkPress = (thumbnail: string, videoId: string, title: string) => () => {
    if (bookmarkedVideos.current.some(video => video.videoId === videoId)) {
      bookmarkedVideos.current = bookmarkedVideos.current.filter(video => video.videoId !== videoId)
    } else {
      bookmarkedVideos.current = [...bookmarkedVideos.current, { thumbnail, videoId, title }]
    }
    setUpdateTrigger((prev: number) => {
      return (prev % 2) + 1
    })
  }

  const onRemove = (videoId: string) => () => {
    if (removeVideos.current.some(id => id === videoId)) {
      removeVideos.current = removeVideos.current.filter(id => id !== videoId)
    } else {
      removeVideos.current.push(videoId)
    }
    setUpdateTrigger((prev: number) => {
      return (prev % 2) + 1
    })
  }

  const renderRecommendedVideoItem = ({ item }: { item: videoRecommendationItemType }) => {
    const { thumbnails, video_id, title } = item
    const thumbnail = thumbnails[0].url
    return (
      <GBVideoCard
        imageUrl={thumbnail}
        isAddingState={addingState || isUpdatingVideos}
        key={video_id}
        onBookmarkPress={onBookmarkPress(thumbnail, video_id, title)}
        onPress={onCardPress(video_id)}
        title={title}
      />
    )
  }

  const renderYourVideoItem = ({ item }: { item: videoRecommendationType }) => {
    const { thumbnail, videoId, title } = item
    return (
      <GBVideoCard
        imageUrl={thumbnail}
        isRemovingVideos={isUpdatingVideos}
        key={videoId}
        onPress={onCardPress(videoId)}
        onRemove={onRemove(videoId)}
        title={title}
      />
    )
  }

  const keyExtractor = (item: videoRecommendationItemType, index: number) => `${item.title}${index}`

  const yourVideosKeyExtractor = (item: videoRecommendationType, index: number) =>
    `${item.title}${index}`

  const listEmptyComponent = () => {
    return (
      <View style={CommonStyles.flex_1}>
        {isLoading ? (
          <GBLoader />
        ) : (
          <GBLoader
            fetchData={fetchData}
            retryEnabled
            title={translate('screens.details.no_recommendation')}
          />
        )}
      </View>
    )
  }

  const yourVideosEmptyComponent = () => {
    return (
      <View style={CommonStyles.flex_1}>
        <GBLoader title={translate('screens.details.no_videos_Added')} />
      </View>
    )
  }

  const recommendationContentContainerStyles =
    isLoading || videoRecommendation.length === 0 ? CommonStyles.flex_1 : {}
  const yourVideosContentContainerStyles = videos.length === 0 ? CommonStyles.flex_1 : {}

  useEffect(() => {
    showVideoRecommendation && fetchData()
  }, [showVideoRecommendation])

  return (
    <View style={styles.container}>
      {!isPlannerEnable && (
        <>
          {isUpdatingVideos ? (
            <View style={styles.headerContainer}>
              <Text style={styles.details}>{leftText}</Text>
              <TouchableOpacity onPress={toggleUpdatingVideoState}>
                <Text style={styles.details}>{translate('common.cancel')}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.headerContainer}>
              <Text style={styles.details}>{translate('screens.details.your_videos')}</Text>
              <TouchableOpacity onPress={toggleUpdatingVideoState}>
                <Text style={styles.details}>{rightText}</Text>
              </TouchableOpacity>
            </View>
          )}
          <GBFlatList
            contentContainerStyle={[styles.contentContainerStyle, yourVideosContentContainerStyles]}
            data={videos}
            horizontal
            keyExtractor={yourVideosKeyExtractor}
            ListEmptyComponent={yourVideosEmptyComponent}
            renderItem={renderYourVideoItem}
          />
        </>
      )}
      {showVideoRecommendation && (
        <>
          {addingState || isUpdatingVideos ? (
            <Text style={styles.details}>{translate('screens.details.select_videos')}</Text>
          ) : (
            <Text style={styles.details}>{translate('screens.details.video_recommendations')}</Text>
          )}
          <GBFlatList
            apiStatusPreset={ApiStatusPreset.GetExerciseVideo}
            data={videoRecommendation}
            horizontal
            keyExtractor={keyExtractor}
            ListEmptyComponent={listEmptyComponent}
            renderItem={renderRecommendedVideoItem}
            contentContainerStyle={[
              styles.contentContainerStyle,
              recommendationContentContainerStyles,
            ]}
            onEndReached={onEndReached}
          />
        </>
      )}
    </View>
  )
})

export default Videos
