// import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';


import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';

// const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(rootSaga),
// });

// export default store;


const sagaMiddleWare = createSagaMiddleware();
const middleWare = [sagaMiddleWare];


const store = createStore(rootReducer, applyMiddleware(...middleWare));

sagaMiddleWare.run(rootSaga);

export { store };
