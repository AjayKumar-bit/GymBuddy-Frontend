import { types } from 'mobx-state-tree'

import { PlannerStore } from './planner-store/plannerStore'
import { SearchStore } from './search-store/searchStore'
import { UserStore } from './user-store/userStore'

const DomainStore = types.model('DomainStore', {
  plannerStore: PlannerStore,
  searchStore: SearchStore,
  userStore: UserStore,
})

export default DomainStore
