import { configureStore, combineReducers } from "@reduxjs/toolkit";
import empReducer from "./slices/empSlice";

const rootReducer = combineReducers({
  emp: empReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
