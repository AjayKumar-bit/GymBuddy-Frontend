import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { useNavigation } from '@react-navigation/native'

import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBButton } from '@components'
import { ApiStatusPreset, RouteName } from '@constants'
import { translate } from '@locales'
import { AppStackScreenProps } from '@navigators'
import { exerciseDetailsType, useStore, videoRecommendationType } from '@stores'
import { INavigation } from '@types'

import Counter from './counter/Counter'
import DaySelector from './day-selector/DaySelector'
import { styles } from './details.styles'
import GifViewer from './gif-viewer/GifViewer'
import Instructions from './instructions/Instructions'
import Videos from './videos/Videos'

type IDetailsProp = AppStackScreenProps<RouteName.Details>

const Details = observer((props: IDetailsProp) => {
  const { route } = props
  const { params } = route
  const { data, videos = [], isPlannerEnable = false, dayId = '', exerciseId = '' } = params
  const { bodyPart, equipment, gifUrl, instructions, name, target, sets = 1, reps = 1 } = data

  const navigation = useNavigation<INavigation>()

  const { domainStore, apiStatusStore } = useStore()
  const { exerciseStore } = domainStore
  const { updateExercise } = exerciseStore
  const { getApiStatus } = apiStatusStore

  const { hasSuccess } = getApiStatus(ApiStatusPreset.UpdateExercise) ?? {}

  const [addingState, setAddingState] = useState(false)
  const [repsCount, setRepsCount] = useState(reps)
  const [setsCount, setSetsCount] = useState(sets)
  const [openDaySelector, SetOpenDaySelector] = useState(false)
  const [isUpdatingRepSet, setIsUpdatingRepSet] = useState(false)
  const [isUpdateDisable, setIsUpdateDisable] = useState(true)
  const [updateTrigger, setUpdateTrigger] = useState(0)

  const showUpdateButton = useRef({
    isRepSetUpdating: false,
    isVideoUpdating: false,
  })

  const onEditRepSet = () => {
    setIsUpdatingRepSet(prev => !prev)
    if (isUpdatingRepSet) {
      showUpdateButton.current.isRepSetUpdating = false
    } else {
      showUpdateButton.current.isRepSetUpdating = true
    }
  }

  const bookmarkedVideos = useRef<Array<videoRecommendationType>>([])
  const removeVideos = useRef<Array<string>>([])

  const showCounters = (isPlannerEnable && addingState) || !isPlannerEnable

  const buttonTitle = addingState
    ? translate('screens.details.select_day')
    : translate('screens.details.add_to_planner')

  const countContainerTitle = isPlannerEnable
    ? translate('screens.details.add_rep_set')
    : translate('screens.details.your_rep_sets')

  const toggleAddingState = () => {
    setAddingState(prev => !prev)
  }

  const closeDaySelector = () => {
    SetOpenDaySelector(false)
  }

  const onSelectDayPress = () => {
    SetOpenDaySelector(true)
  }

  const onButtonPress = addingState ? onSelectDayPress : toggleAddingState

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

  const onUpdatePress = async () => {
    const data = {
      dayId,
      exerciseId,
      exerciseDetails: { reps: repsCount, sets: setsCount },
      removedVideos: removeVideos.current,
      newAddedVideos: bookmarkedVideos.current,
    }
    await updateExercise(data)
    hasSuccess && navigation.goBack()
  }

  const renderSideButton = () => {
    return isUpdatingRepSet ? (
      <TouchableOpacity onPress={onEditRepSet}>
        <Text style={styles.details}>{translate('common.cancel')}</Text>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity onPress={onEditRepSet}>
        <Text style={styles.details}>{translate('common.edit')}</Text>
      </TouchableOpacity>
    )
  }

  useEffect(() => {
    if (
      sets !== setsCount ||
      reps !== repsCount ||
      bookmarkedVideos.current.length > 0 ||
      removeVideos.current.length > 0
    ) {
      setIsUpdateDisable(false)
    } else {
      setIsUpdateDisable(true)
    }
  }, [setsCount, repsCount, updateTrigger])

  useEffect(() => {
    // note: this effect will to monitor hasSuccess observable state
    const disposer = reaction(
      () => apiStatusStore.getApiStatus(ApiStatusPreset.UpdateExercise)?.hasSuccess,
      success => {
        if (success) {
          navigation.goBack()
        }
      },
    )

    return () => disposer() // note: Cleanup to dispose reaction as reaction wait forever for change in observable state
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
            <Text style={styles.details}>{bodyPart}</Text>
          </View>
          <View style={styles.detailsSubContainer}>
            <Text style={styles.details}>{translate('screens.details.targeted_muscles')}</Text>
            <Text>:</Text>
            <Text style={styles.details}>{target}</Text>
          </View>
          <View style={styles.detailsSubContainer}>
            <Text style={styles.details}>{translate('screens.details.required_equipment')}</Text>
            <Text>:</Text>
            <Text style={styles.details}>{equipment}</Text>
          </View>
        </View>
        {!!data && <Instructions data={instructions} />}
        {showCounters && (
          <>
            <View style={styles.detailsSubContainer}>
              <Text style={styles.details}>{countContainerTitle}</Text>
              {!isPlannerEnable && renderSideButton()}
            </View>
            <View style={styles.counterContainer}>
              <Counter
                count={repsCount}
                isPlannerEnable={isPlannerEnable || isUpdatingRepSet}
                label={translate('screens.details.reps')}
                onDecrease={onDecreaseRep}
                onIncrease={onIncreaseRep}
              />
              <View style={styles.separator} />
              <Counter
                count={setsCount}
                isPlannerEnable={isPlannerEnable || isUpdatingRepSet}
                label={translate('screens.details.sets')}
                onDecrease={onDecreaseSet}
                onIncrease={onIncreaseSet}
              />
            </View>
          </>
        )}
        <Videos
          addingState={addingState}
          bookmarkedVideos={bookmarkedVideos}
          exerciseName={name}
          isPlannerEnable={isPlannerEnable}
          removeVideos={removeVideos}
          setUpdateTrigger={setUpdateTrigger}
          showUpdateButton={showUpdateButton}
          videos={videos}
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
        {isPlannerEnable && (
          <GBButton
            containerCustomStyles={styles.button}
            onPress={onButtonPress}
            title={buttonTitle}
          />
        )}
        {(showUpdateButton.current.isRepSetUpdating ||
          showUpdateButton.current.isVideoUpdating) && (
          <GBButton
            apiStatusPreset={ApiStatusPreset.UpdateExercise}
            containerCustomStyles={styles.button}
            isDisable={isUpdateDisable}
            loaderStyles={styles.loader}
            onPress={onUpdatePress}
            title={translate('common.update')}
          />
        )}
      </View>
      {openDaySelector && (
        <DaySelector
          closeDaySelector={closeDaySelector}
          exerciseDetails={data as exerciseDetailsType}
          reps={repsCount}
          sets={setsCount}
          videoRecommendations={bookmarkedVideos.current}
        />
      )}
    </>
  )
})

export default Details
