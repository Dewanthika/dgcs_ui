import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import { createTransform } from "redux-persist";
import userReducer from "./silces/userSlice";

const GetTransform = createTransform(
  (inboundState, _) => {
    return JSON.stringify(inboundState);
  },
  (outboundState, _) => {
    return JSON.parse(outboundState);
  }
);

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
  transforms: [GetTransform],
};

export const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
});
