// import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reduces";
import mySaga from "../sagas";
import { createStore, applyMiddleware } from "redux";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);
export default store;
