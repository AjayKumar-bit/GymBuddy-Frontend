/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ForwardedRef, forwardRef } from 'react'
import { FlatList, FlatListProps, RefreshControl } from 'react-native'

import { observer } from 'mobx-react-lite'

import { ApiStatusPreset, LoaderSize } from '@constants'
import { translate } from '@locales'
import { useStore } from '@stores'
import { Colors } from '@theme'

import GBLoader from '../loader/GBLoader'

interface GBFlatListProps extends FlatListProps<any> {
  /** apiStatusPreset: is an optional prop that gives apiStatusPreset */
  apiStatusPreset?: ApiStatusPreset
  /** onEndReached: is an optional prop that trigger an action reaching page end */
  onEndReached?: () => void
  /** onRefresh: is an optional prop that trigger an action on refresh */
  onRefresh?: () => void
}

const CustomFlatList = (props: GBFlatListProps, ref: ForwardedRef<FlatList<any>>) => {
  const { apiStatusPreset = '', onEndReached, onRefresh, ...restProps } = props
  const { apiStatusStore } = useStore()
  const { getApiStatus } = apiStatusStore
  const { hasMoreData, isRefreshCall, showBottomLoader } = getApiStatus(apiStatusPreset) || {}

  const onEndReachedPage = () => {
    if (hasMoreData && onEndReached) {
      onEndReached()
    }
  }

  const onRefreshCall = () => {
    onRefresh && onRefresh()
  }

  const refreshControl = onRefresh ? (
    <RefreshControl
      colors={[Colors.ActiveTab]}
      onRefresh={onRefreshCall}
      refreshing={!!isRefreshCall}
      tintColor={Colors.InactiveTab}
    />
  ) : undefined

  const listFooterComponent = showBottomLoader ? (
    <GBLoader size={LoaderSize.Small} title={translate('common.loading')} />
  ) : null

  return (
    <FlatList
      {...restProps}
      ListFooterComponent={listFooterComponent}
      onEndReached={onEndReachedPage}
      onEndReachedThreshold={0.1}
      ref={ref}
      refreshControl={refreshControl}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    />
  )
}

const GBFlatList = observer(forwardRef<FlatList<any>, GBFlatListProps>(CustomFlatList))

export default GBFlatList
