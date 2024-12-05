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
}

export { DomainStoreData }
