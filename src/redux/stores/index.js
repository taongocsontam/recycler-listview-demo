// import { applyMiddleware, compose, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../reduces";
import mySaga from "../sagas";
import { createStore, applyMiddleware, compose } from "redux";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const middleware = [sagaMiddleware];
// const store = configureStore({
//   rootReducer, 
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(middleware),
// });
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
// sagaMiddleware.run(rootSaga);`
sagaMiddleware.run(mySaga);
export default store;
