import React, { useEffect, useState } from 'react';
import "tailwindcss/tailwind.css";
import { useSelector, useDispatch } from 'react-redux';
import { getFormattedTableHeaders } from "../../../utils/helpers/dashboard";
import { DB_VIEWS, DB_ACTIONS } from "../../../utils/constants/dashboard";
import { deleteStockDataReq, dbSetEditStock, dbSetView, dbSetAction, dbSetEditStockName } from "../../../actions/dashboardAction";


export const TableView = () => {

    const dispatch = useDispatch();

    const { stockData } = useSelector((state) => state.dashboard);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        if (stockData.length) {
            setHeaders(getFormattedTableHeaders(Object.keys(stockData[0])));
        }
    }, [stockData]);

    return (
        <table className="table-auto border-separate border border-blue-900 bg-gray-100 sm:-mx-6 lg:-mx-8 ">
            <thead>
                <tr>
                    {
                        headers.map((elem, idx) => <th className="border border-blue-600 text-center px-3 py-3 bg-blue-400 text" key={idx}>{elem}</th>)
                    }
                    <th className="border border-blue-600 text-center px-3 py-3 bg-blue-400 text">ACTIONS</th>
                </tr>
            </thead>
            <tbody>
                {
                    stockData.map((item, itemIdx) => {
                        return <tr className={`${itemIdx % 2 !== 0 ? "bg-blue-100" : ""}`} key={itemIdx}>
                            {
                                Object.values(item).map((val, idx) => {
                                    return <td className={`border border-blue-600 text-center px-3 py-3 }`} key={idx}>{val || "-"}</td>
                                })
                            }
                            {
                                <td className="inline-flex">
                                    <button className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded"
                                        onClick={() => dispatch(deleteStockDataReq(item.symbol))}>Delete
                                    </button>
                                    <button className="bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-3 px-3 border border-blue-500 hover:border-transparent rounded"
                                        onClick={() => {
                                            dispatch(dbSetEditStock(item));
                                            dispatch(dbSetView(DB_VIEWS.FORM_VIEW));
                                            dispatch(dbSetAction(DB_ACTIONS.EDIT));
                                            dispatch(dbSetEditStockName(item.symbol));
                                        }}>
                                        Edit
                                    </button>
                                </td>
                            }
                        </tr>
                    })
                }
            </tbody>
        </table>
    );
}

