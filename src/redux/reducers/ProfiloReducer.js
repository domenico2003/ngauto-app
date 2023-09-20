import { SET_PROFILE, SET_PROFILEDETAILS } from "../actions";

const defaultState = {
  me: null,
  dettaglioAccount: null,
};

const ProfiloReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        me: action.payload,
      };
    case SET_PROFILEDETAILS:
      return {
        ...state,
        dettaglioAccount: action.payload,
      };
    default:
      return state;
  }
};
export default ProfiloReducer;
