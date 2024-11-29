import { types } from 'mobx-state-tree'

import { SearchStore } from './search-store/searchStore'
import { UserStore } from './user-store/userStore'

const DomainStore = types.model('DomainStore', {
  searchStore: SearchStore,
  userStore: UserStore,
})

export default DomainStore
