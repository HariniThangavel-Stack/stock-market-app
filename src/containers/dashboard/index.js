import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FormView } from './components/formView';
import { TableView } from './components/tableView';
import { getStockDataReq, dbSetView, dbSetAction, dbSetDeleteOrUpdateStock } from '../../actions/dashboardAction'
import { DB_VIEWS, DB_ACTIONS } from "../../utils/constants/dashboard";
import { DB_DELETE_UPDATE_STOCK_INITIAL_VALUE } from "../../utils/constants/dashboard";

export const DashboardComponent = () => {
    const { dbCurrentView, stockData, deleteOrUpdateStock } = useSelector((state) => state.dashboard);

    const dispatch = useDispatch();

    useEffect(() => {
        if (dbCurrentView === DB_VIEWS.TABLE_VIEW) {
            dispatch(getStockDataReq());
        }
    }, [dispatch, dbCurrentView]);

    useEffect(() => {
        if (deleteOrUpdateStock.stockName && deleteOrUpdateStock.msg) {
            toast(deleteOrUpdateStock.msg);
        }
        dispatch(dbSetDeleteOrUpdateStock(DB_DELETE_UPDATE_STOCK_INITIAL_VALUE));
        dispatch(dbSetView(DB_VIEWS.TABLE_VIEW));
        // eslint-disable-next-line
    }, [dispatch, deleteOrUpdateStock.updateSuccess]);


    return (
        <div className="bg-blue-100 h-full min-h-screen bg-local">
            <p className="text-center font-bold p-3 text-2xl">STOCK MARKET DATA</p>
            <div className="flex ">
                <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded items-center"
                    onClick={() => {
                        dispatch(dbSetView(dbCurrentView === DB_VIEWS.TABLE_VIEW ? DB_VIEWS.FORM_VIEW : DB_VIEWS.TABLE_VIEW));
                        dispatch(dbSetAction(DB_ACTIONS.ADD));
                    }}>
                    {dbCurrentView === DB_VIEWS.TABLE_VIEW ? "Add New Stock" : "Show Stocks"}
                </button>
            </div>

            <div className="py-5  m-8">
                {dbCurrentView === DB_VIEWS.TABLE_VIEW ? (stockData && stockData.length) ? <TableView /> :
                    <div className="flex justify-center m-8">No data to show</div> : <FormView />}
            </div>
            <ToastContainer />
        </div>
    );
}

