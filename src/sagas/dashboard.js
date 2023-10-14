import { takeEvery, put } from 'redux-saga/effects';

import { apiCall } from '../utils/helpers/api-call'

import { config } from '../config'

import {
    getStockDataReq, getStockDataResFail, getStockDataRes,
    deleteStockDataReq, deleteStockDataResFail, deleteStockDataRes,
    addStockDataReq, addStockDataRes, addStockDataResFail,
    updateStockDataReq, updateStockDataRes, updateStockDataResFail,
} from '../actions/dashboardAction';


function* sendGetStockDataRequest(requestDetails) {
    const response = yield apiCall({ apiPath: `${config.apiBaseURL}/getStocks`, action: 'GET' });
    if (response.status === 200) {
        yield put(getStockDataRes(response.data));
    } else {
        yield put(getStockDataResFail(response));
    }
}

function* sendDeleteStockDataRequest(requestDetails) {
    const params = { symbol: requestDetails.payload }
    const response = yield apiCall({ params, apiPath: `${config.apiBaseURL}/deleteStock`, action: 'DELETE' });
    if (response.status === 200) {
        yield put(deleteStockDataRes(response.data));
    } else {
        yield put(deleteStockDataResFail(response));
    }
}

function* sendAddStockDataRequest(requestDetails) {
    const data = JSON.stringify(requestDetails.payload);
    const response = yield apiCall({ data, apiPath: `${config.apiBaseURL}/insertStock`, action: 'POST' });
    if (response.status === 200) {
        yield put(addStockDataRes(response.data));
    } else {
        yield put(addStockDataResFail(response));
    }
}

function* sendUpdateStockDataRequest(requestDetails) {
    const params = { symbol: requestDetails.payload.stockName }
    const data = JSON.stringify(requestDetails.payload.data);
    const response = yield apiCall({ params, data, apiPath: `${config.apiBaseURL}/findAndUpdateStock`, action: 'PUT' });
    if (response.status === 200) {
        yield put(updateStockDataRes(response.data));
    } else {
        yield put(updateStockDataResFail(response));
    }
}



export function* takeDashboardRequest() {
    yield takeEvery(getStockDataReq, sendGetStockDataRequest);
    yield takeEvery(deleteStockDataReq, sendDeleteStockDataRequest);
    yield takeEvery(addStockDataReq, sendAddStockDataRequest);
    yield takeEvery(updateStockDataReq, sendUpdateStockDataRequest);
}