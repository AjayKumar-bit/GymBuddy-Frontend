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
      plannerStartDate: '',
      token: '',
    },
  },
  plannerStore: {
    days: [],
  },
  exerciseStore: {
    exerciseData: [],
    offset: 0,
    todaysExercise: [],
  },
}

export { DomainStoreData }
