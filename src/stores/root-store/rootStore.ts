import { createContext, useContext } from 'react'

import { Instance, types } from 'mobx-state-tree'

import { ApiStatusStore } from '../api-status-store/apiStatusStore'
import DomainStore from '../domain-store/domainStore'
import { DomainStoreData } from '../domain-store/domainStoreData'

const RootStore = types.model('RootStore', {
  apiStatusStore: ApiStatusStore,
  domainStore: DomainStore,
})

const createStore = () => {
  const apiStatusStore = ApiStatusStore.create({ apiStatus: {} })
  const domainStore = DomainStore.create(DomainStoreData)
  const store = RootStore.create({ apiStatusStore, domainStore })
  return store
}

const mstStore = createStore()

const MSTStoreContext = createContext(mstStore)

const useStore = () => {
  const mstStoreContext = useContext(MSTStoreContext)
  return mstStoreContext
}

export type RootStoreType = Instance<typeof RootStore>

export { MSTStoreContext, RootStore, mstStore, useStore }
