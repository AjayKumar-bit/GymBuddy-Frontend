import { types } from 'mobx-state-tree'

import { SearchStore } from './search-store/searchStore'

const DomainStore = types.model('DomainStore', {
  searchStore: SearchStore,
})

export default DomainStore
