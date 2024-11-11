import { types } from 'mobx-state-tree'

import { log } from '@config'

interface IDataParamsTypes {
  error?: object
  hasMoreData?: boolean
  id: string
  isLoading?: boolean
  isRefreshCall?: boolean
  showBottomLoader?: boolean
}

const ApiStatusItem = types.model('ApiStatusItem', {
  error: types.frozen(),
  hasMoreData: types.boolean,
  id: types.string,
  isLoading: types.boolean,
  isRefreshCall: types.boolean,
  showBottomLoader: types.boolean,
})

const ApiStatusStore = types
  .model('ApiStatusModal', {
    apiStatus: types.map(ApiStatusItem),
  })
  .actions(self => {
    const setApiStatus = (data: IDataParamsTypes) => {
      const prevData = self.apiStatus.get(data.id)
      const {
        error = prevData?.error ?? {},
        hasMoreData = prevData?.hasMoreData ?? false,
        id,
        isLoading = prevData?.isLoading ?? false,
        isRefreshCall = prevData?.isRefreshCall ?? false,
        showBottomLoader = prevData?.showBottomLoader ?? false,
      } = data
      log.error({ data })
      self.apiStatus.set(id, { error, hasMoreData, id, isLoading, isRefreshCall, showBottomLoader })
    }
    const getApiStatus = (id: string) => {
      return self.apiStatus.get(id)
    }

    return {
      setApiStatus,
      getApiStatus,
    }
  })

export { ApiStatusStore }
