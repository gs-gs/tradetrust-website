import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import application from "./application";
import certificate from "./certificate";
import token from "./token";

export default history =>
  combineReducers({
    router: connectRouter(history),
    application,
    certificate,
    token
  });
