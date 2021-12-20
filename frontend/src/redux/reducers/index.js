import { combineReducers } from "redux";

import authReducer from "./authReducer";
import characterReducer from "./characterReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  authReducer,
  characterReducer,
  userReducer,
});

export default rootReducer;
