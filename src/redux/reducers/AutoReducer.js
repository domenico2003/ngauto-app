const defaultState = {
  nuove: null,
  usate: null,
  noleggio: null,
};

const AutoReducer = (state = defaultState, action) => {
  switch (action.type) {
    //   case SET_PROFILE:
    //     return {
    //       ...state,
    //       me: action.payload,
    //     };

    default:
      return state;
  }
};
export default AutoReducer;
