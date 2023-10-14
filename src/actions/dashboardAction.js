import { createAction } from '@reduxjs/toolkit'

export const dbSetView = createAction('dashboard/dbSetView')

export const dbSetAction = createAction('dashboard/dbSetAction')

export const dbSetEditStock = createAction('dashboard/dbSetEditStock')

export const dbSetDeleteOrUpdateStock = createAction('dashboard/dbSetDeleteOrUpdateStock')

export const dbSetEditStockName = createAction('dashboard/dbSetEditStockName')

export const getStockDataReq = createAction('dashboard/getStockDataReq')
export const getStockDataRes = createAction('dashboard/getStockDataRes')
export const getStockDataResFail = createAction('dashboard/getStockDataResFail')


export const deleteStockDataReq = createAction('dashboard/deleteStockDataReq')
export const deleteStockDataRes = createAction('dashboard/deleteStockDataRes')
export const deleteStockDataResFail = createAction('dashboard/deleteStockDataResFail')

export const addStockDataReq = createAction('dashboard/addStockDataReq')
export const addStockDataRes = createAction('dashboard/addStockDataRes')
export const addStockDataResFail = createAction('dashboard/addStockDataResFail')

export const updateStockDataReq = createAction('dashboard/updateStockDataReq')
export const updateStockDataRes = createAction('dashboard/updateStockDataRes')
export const updateStockDataResFail = createAction('dashboard/updateStockDataResFail')