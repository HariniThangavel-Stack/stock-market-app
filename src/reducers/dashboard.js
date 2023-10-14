import { createReducer, current } from '@reduxjs/toolkit'
import {
    dbSetView, getStockDataReq, getStockDataRes, getStockDataResFail,
    deleteStockDataReq, deleteStockDataRes, deleteStockDataResFail,
    addStockDataReq, addStockDataRes, addStockDataResFail,
    updateStockDataReq, updateStockDataRes, updateStockDataResFail,
    dbSetEditStock, dbSetAction, dbSetDeleteOrUpdateStock, dbSetEditStockName
} from '../actions/dashboardAction'

import { DB_VIEWS, DB_ACTIONS, DB_DELETE_UPDATE_STOCK_INITIAL_VALUE } from "../utils/constants/dashboard";

import {
    DELETE_STOCK_SUCCESS, DELETE_STOCK_FAILURE, ADD_STOCK_SUCCESS,
    ADD_STOCK_FAILURE, UPDATED_STOCK_FAILURE, UPDATED_STOCK_SUCCESS
} from "../utils/helpers/messages";

const initialState = {
    dbCurrentView: DB_VIEWS.TABLE_VIEW,
    action: DB_ACTIONS.ADD,
    stockData: [],
    isFetching: false,
    isError: false,
    editStockName: null,
    editStock: null,
    deleteOrUpdateStock: DB_DELETE_UPDATE_STOCK_INITIAL_VALUE
};

const dashboardReducer = createReducer(initialState, (builder) => {
    builder
        // set current dashboard view
        .addCase(dbSetView, (state, action) => {
            return { ...state, dbCurrentView: action.payload }
        })

        // set edit stock
        .addCase(dbSetEditStock, (state, action) => {
            return { ...state, editStock: action.payload }
        })

        // set action type (add/edit)
        .addCase(dbSetAction, (state, action) => {
            return { ...state, action: action.payload }
        })

        // set delete or update stock obj
        .addCase(dbSetDeleteOrUpdateStock, (state, action) => {
            return { ...state, deleteOrUpdateStock: action.payload }
        })

        // set edit stock name
        .addCase(dbSetEditStockName, (state, action) => {
            return { ...state, editStockName: action.payload }
        })


        // get stocks
        .addCase(getStockDataReq, (state, action) => {
            return { ...state, isFetching: true, stockData: [], isError: false }
        })
        .addCase(getStockDataRes, (state, action) => {
            return { ...state, isFetching: false, stockData: action.payload, isError: false }
        })
        .addCase(getStockDataResFail, (state, action) => {
            return { ...state, isFetching: false, stockData: [], isError: true }
        })


        // delete stocks
        .addCase(deleteStockDataReq, (state, action) => {
            return { ...state, isFetching: true, isError: false, deleteOrUpdateStock: { ...state.deleteOrUpdateStock, stockName: action.payload } }
        })
        .addCase(deleteStockDataRes, (state, action) => {
            const tempStock = [...current(state.stockData)]
            tempStock.forEach((item, idx) => {
                if (item.symbol === state.deleteOrUpdateStock.stockName) tempStock.splice(idx, 1);
            });
            return {
                ...state, isFetching: false, isError: false, stockData: tempStock,
                deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: true, msg: DELETE_STOCK_SUCCESS }
            }
        })
        .addCase(deleteStockDataResFail, (state, action) => {
            return { ...state, isFetching: false, isError: true, deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: false, msg: DELETE_STOCK_FAILURE } }
        })



        // add new stock
        .addCase(addStockDataReq, (state, action) => {
            return { ...state, isFetching: true, isError: false, deleteOrUpdateStock: { ...state.deleteOrUpdateStock, stockName: action.payload } }
        })
        .addCase(addStockDataRes, (state, action) => {
            return {
                ...state, isFetching: false, isError: false,
                deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: true, msg: ADD_STOCK_SUCCESS }
            }
        })
        .addCase(addStockDataResFail, (state, action) => {
            return {
                ...state, isFetching: false, isError: true,
                deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: true, msg: ADD_STOCK_FAILURE }
            }
        })


        // Update stock
        .addCase(updateStockDataReq, (state, action) => {
            return { ...state, isFetching: true, isError: false, deleteOrUpdateStock: { ...state.deleteOrUpdateStock, stockName: action.payload } }
        })
        .addCase(updateStockDataRes, (state, action) => {
            return {
                ...state, isFetching: false, isError: false,
                deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: true, msg: UPDATED_STOCK_SUCCESS }
            }
        })
        .addCase(updateStockDataResFail, (state, action) => {
            return {
                ...state, isFetching: false, isError: true,
                deleteOrUpdateStock: { ...state.deleteOrUpdateStock, updateSuccess: true, msg: UPDATED_STOCK_FAILURE }
            }
        })


})

export default dashboardReducer;