import { SET_ALIMENTAZIONI, SET_CAMBI, SET_MARCHE } from "../actions";

const defaultState = {
  alimentazioni: null,
  cambi: null,
  marche: null,
};

const AutoReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_ALIMENTAZIONI:
      return {
        ...state,
        alimentazioni: action.payload,
      };
    case SET_CAMBI:
      return {
        ...state,
        cambi: action.payload,
      };
    case SET_MARCHE:
      return {
        ...state,
        marche: action.payload,
      };
    default:
      return state;
  }
};
export default AutoReducer;
