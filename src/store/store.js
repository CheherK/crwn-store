import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { compose, legacy_createStore as createStore, applyMiddleware } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { logger } from "redux-logger";
import { rootReducer } from "./root-reducer";
// import createSagaMiddleware from 'redux-saga';
// import { rootSaga } from './root-saga';

// const persistConfig = {
//    key: 'root',
//    storage,
//    blacklist: ['user']
// };

// const sagaMiddleware = createSagaMiddleware();

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
   process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);
// const composedEnhancers = compose(applyMiddleware(...middlewares));
// redux toolkit has 3 default middlewares: 1-thunk 2-non-serializable 3-immutable middleware
export const store = configureStore(
   {
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
         serializableCheck: false
      }).concat(middlewares)
   }
);
// sagaMiddleware.run(rootSaga);
// export const persistor = persistStore(store);