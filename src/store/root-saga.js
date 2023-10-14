import { all, fork } from 'redux-saga/effects';

import {
  takeDashboardRequest
} from '../sagas/dashboard';

function* rootSaga() {
  yield all([
    fork(takeDashboardRequest)
  ]);
}

export { rootSaga };
