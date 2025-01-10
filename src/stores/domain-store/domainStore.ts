import { types } from 'mobx-state-tree'

import { ExerciseStore } from './exercise-store/exerciseStore'
import { PlannerStore } from './planner-store/plannerStore'
import { SearchStore } from './search-store/searchStore'
import { UserStore } from './user-store/userStore'

const DomainStore = types.model('DomainStore', {
  exerciseStore: ExerciseStore,
  plannerStore: PlannerStore,
  searchStore: SearchStore,
  userStore: UserStore,
})

export default DomainStore
