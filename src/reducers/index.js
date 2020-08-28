import { combineReducers } from "redux";
import errorReducers from "./errorReducers";
import messageReducers from "./messageReducers";
import authReducers from "./authReducers";

export default combineReducers({
  errors: errorReducers,
  messages: messageReducers,
  auth: authReducers,
});
