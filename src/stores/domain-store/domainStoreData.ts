const DomainStoreData = {
  searchStore: {
    searchedExerciseData: [],
    videoRecommendation: [],
    ytContinuationToken: '',
    offset: 0,
  },
  userStore: {
    userData: {
      emailId: '',
      isLoggedIn: false,
      name: '',
      token: '',
    },
  },
  plannerStore: {
    days: [],
  },
  exerciseStore: {
    exerciseData: [],
    offset: 0,
  },
}

export { DomainStoreData }
