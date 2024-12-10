import React, { useEffect, useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBFlatList, GBLoader, GBTextInput } from '@components'
import { ApiStatusPreset, ExerciseListScreenPreset, RouteName, TextInputPreset } from '@constants'
import { translate } from '@locales'
import { AppStackScreenProps } from '@navigators'
import { SearchExerciseDataTypes, exerciseDataType, useStore } from '@stores'
import { CommonStyles } from '@theme'

import { styles } from './search.styles'
import SearchedExerciseCard from './searches-exercise-card/SearchedExerciseCard'

type ISearchProp = AppStackScreenProps<RouteName.Search>

const Search = observer((props: ISearchProp) => {
  const { route } = props
  const { params } = route
  const { dayId = '', dayName = '', preset, prevSearchedExercise = '' } = params

  const { apiStatusStore, domainStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { isLoading: isSearching, isRefreshCall: isSearchRefreshCall } =
    getApiStatus(ApiStatusPreset.SearchExercise) ?? {}
  const { isLoading: isExerciseLoading, isRefreshCall: isExerciseRefreshCall } =
    getApiStatus(ApiStatusPreset.GetExercise) ?? {}
  const { searchStore, exerciseStore } = domainStore
  const { searchedExerciseData, searchExercise } = searchStore
  const { exerciseData, getExercise, resetExerciseData } = exerciseStore
  const isSearchScreen = preset === ExerciseListScreenPreset.Search
  const hasNoExerciseData =
    (isSearchScreen && searchedExerciseData.length === 0) ||
    (!isSearchScreen && exerciseData.length === 0)

  const [isInitialRender, setIsInitialRender] = useState(true)
  const [searchedExerCise, setSearchedExerCise] = useState(prevSearchedExercise)
  const currentSearchRef = useRef(prevSearchedExercise)

  const onSearchRefresh = () => {
    searchExercise({ exerciseName: currentSearchRef.current, isRefreshCall: true })
  }

  const onExerciseRefresh = () => {
    getExercise({ dayId, isRefreshCall: true })
  }

  const onSearchEndReached = () => {
    searchExercise({ exerciseName: currentSearchRef.current, isRefreshCall: false })
  }
  const onExerciseEndReached = () => {
    getExercise({ dayId, isLoading: true })
  }

  const onSearchIconPress = () => {
    searchExercise({ exerciseName: searchedExerCise, isRefreshCall: true })
    currentSearchRef.current = searchedExerCise
  }

  const onTextChange = (value: string) => {
    setSearchedExerCise(value)
  }

  const renderItem = ({ item }: { item: SearchExerciseDataTypes | exerciseDataType }) => {
    const data = isSearchScreen
      ? (item as SearchExerciseDataTypes)
      : (item as exerciseDataType).exerciseDetails
    const exerciseId = (item as exerciseDataType)._id ?? ''
    const videos = (item as exerciseDataType).videoRecommendations ?? []
    return (
      <SearchedExerciseCard
        data={data}
        dayId={dayId}
        exerciseId={exerciseId}
        isPlannerEnable={isSearchScreen}
        videos={videos}
      />
    )
  }

  const getScreenDetails = () => {
    const details = {
      apiStatusPreset: ApiStatusPreset.SearchExercise,
      headerTitle: translate('screens.search.recommended_exercise'),
      onEndReached: onSearchEndReached,
      onRefresh: onSearchRefresh,
      loadingTitle: translate('screens.search.searching'),
    }
    if (preset === ExerciseListScreenPreset.MyExercises) {
      Object.assign(details, {
        apiStatusPreset: ApiStatusPreset.GetExercise,
        headerTitle: translate('screens.search.my_exercises_title', { dayName }),
        onEndReached: onExerciseEndReached,
        onRefresh: onExerciseRefresh,
        loadingTitle: translate('common.loading'),
      })
    }

    return details
  }

  const { apiStatusPreset, headerTitle, loadingTitle, onEndReached, onRefresh } = getScreenDetails()

  const listHeaderComponent = () => {
    return <Text style={styles.title}>{headerTitle}</Text>
  }

  const listEmptyComponent = () => {
    return isSearching || isExerciseLoading || isInitialRender ? (
      <GBLoader title={loadingTitle} />
    ) : (
      <GBLoader title={translate('screens.search.no_exercise_found')} />
    )
  }

  const contentContainerStyles =
    isSearching || isExerciseLoading || hasNoExerciseData ? CommonStyles.flex_1 : {}

  const keyExtractor = (item: SearchExerciseDataTypes, index: number) => `${item.id}${index}`

  useEffect(() => {
    if (preset === ExerciseListScreenPreset.MyExercises) {
      getExercise({ dayId, isLoading: true, isFirstCall: true })
      setIsInitialRender(false)
    }
    return resetExerciseData
  }, [])

  return (
    <>
      <GBAppHeader title={translate('title')} />
      <View style={styles.container}>
        {isSearchScreen && (
          <GBTextInput
            onSearchIconPress={onSearchIconPress}
            onTextChange={onTextChange}
            placeHolder={translate('common.search')}
            preset={TextInputPreset.Search}
            containerStyles={styles.textInputContainer}
          />
        )}
        <GBFlatList
          apiStatusPreset={apiStatusPreset}
          contentContainerStyle={[styles.contentContainer, contentContainerStyles]}
          data={isSearchScreen ? searchedExerciseData : exerciseData}
          ListHeaderComponent={listHeaderComponent}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          refreshing={isSearchRefreshCall || isExerciseRefreshCall}
          ListEmptyComponent={listEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </>
  )
})

export default Search
