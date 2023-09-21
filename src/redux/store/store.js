import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ProfiloReducer from "../reducers/ProfiloReducer";
import AutoReducer from "../reducers/AutoReducer";

const rootReducer = combineReducers({
  profilo: ProfiloReducer,
  auto: AutoReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
