import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'

import { observer } from 'mobx-react-lite'

import { GBAppHeader, GBFlatList, GBLoader, GBTextInput } from '@components'
import { ApiStatusPreset, RouteName, TextInputPreset } from '@constants'
import { translate } from '@locales'
import { AppStackScreenProps } from '@navigators'
import { SearchExerciseDataTypes, useStore } from '@stores'

import { styles } from './search.styles'
import SearchedExerciseCard from './searches-exercise-card/SearchedExerciseCard'

type ISearchProp = AppStackScreenProps<RouteName.Search>

const Search = observer((props: ISearchProp) => {
  const { route } = props
  const { params } = route
  const { prevSearchedExercise } = params

  const { apiStatusStore, domainStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { isLoading, isRefreshCall } = getApiStatus(ApiStatusPreset.SearchExercise) ?? {}
  const { searchStore } = domainStore
  const { searchedExerciseData, searchExercise } = searchStore

  const [searchedExerCise, setSearchedExerCise] = useState(prevSearchedExercise)
  const currentSearchRef = useRef(prevSearchedExercise)

  const onRefresh = () => {
    searchExercise({ exerciseName: currentSearchRef.current, isRefreshCall: true })
  }

  const onEndReached = () => {
    searchExercise({ exerciseName: currentSearchRef.current, isRefreshCall: false })
  }

  const onSearchIconPress = () => {
    searchExercise({ exerciseName: searchedExerCise, isRefreshCall: true })
    currentSearchRef.current = searchedExerCise
  }

  const onTextChange = (value: string) => {
    setSearchedExerCise(value)
  }

  const renderItem = ({ item }: { item: SearchExerciseDataTypes }) => {
    return <SearchedExerciseCard data={item} />
  }

  const listHeaderComponent = () => {
    return <Text style={styles.title}>{translate('screens.search.recommended_exercise')}</Text>
  }

  const keyExtractor = (item: SearchExerciseDataTypes, index: number) => `${item.id}${index}`

  return (
    <>
      <GBAppHeader title={translate('title')} />
      <View style={styles.container}>
        <GBTextInput
          onSearchIconPress={onSearchIconPress}
          onTextChange={onTextChange}
          placeHolder={translate('common.search')}
          preset={TextInputPreset.Search}
          containerStyles={styles.textInputContainer}
        />
        {isLoading ? (
          <GBLoader title={translate('screens.search.searching')} />
        ) : (
          <GBFlatList
            apiStatusPreset={ApiStatusPreset.SearchExercise}
            contentContainerStyle={styles.contentContainer}
            data={searchedExerciseData}
            ListHeaderComponent={listHeaderComponent}
            onEndReached={onEndReached}
            onRefresh={onRefresh}
            refreshing={isRefreshCall}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </>
  )
})

export default Search
