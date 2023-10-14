import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { updateStockDataReq, addStockDataReq } from ".././../../actions/dashboardAction";
import { getFormFieldName, stockDataValidation } from "../../../utils/helpers/dashboard";
import { DB_ACTIONS, FORM_FIELD } from "../../../utils/constants/dashboard";


export const FormView = () => {

    const dispatch = useDispatch();
    const { editStock, action, stockData, editStockName } = useSelector((state) => state.dashboard);


    const [initialStockData, setIinitialStockData] = useState(null);

    useEffect(() => {
        if (action === DB_ACTIONS.EDIT && editStock) setIinitialStockData(editStock)
        else setIinitialStockData(null)
    }, [action, editStock]);

    const { values, handleSubmit, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues: { ...initialStockData },
        validationSchema: stockDataValidation,
        validateOnChange: true,
        enableReinitialize: true,
        validateOnBlur: true,
        onSubmit: (val) => {
            (action === DB_ACTIONS.EDIT) ? dispatch(updateStockDataReq({data:val, stockName:editStockName })) : dispatch(addStockDataReq(val));
        },
    });

    const getFormElements = (fieldName, fieldVal, uniqueKey) => {
        return <div className="md:flex md:items-center mb-6" key={uniqueKey}>
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    {fieldName}
                </label>
            </div>
            <div className="md:w-2/3">
                <input className={`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 
                ${errors[fieldVal] && touched[fieldVal] ? "border border-red-500" : ""} `}
                    type="text"
                    name={fieldVal}
                    onBlur={handleBlur}
                    placeholder={fieldName}
                    value={values[fieldVal]}
                    onChange={handleChange}
                />
            </div>
        </div>
    }

    return (
        <form className="w-full max-w-sm ml-8">

            {(action === DB_ACTIONS.EDIT && stockData && stockData.length > 0) &&
                Object.keys(stockData[0]).map((key, idx) => {
                    return getFormElements(getFormFieldName(key), key, idx)
                })
            }
            {action === DB_ACTIONS.ADD &&
                FORM_FIELD.map((key, idx) => {
                    return getFormElements(getFormFieldName(key), key, idx)
                })
            }
            <div className='flex justify-center'>
                <div className="md:flex md:items-center">
                    <div className="md:w-2/3">
                        <button className={`hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded 
                        ${(Object.keys(touched).length === 0 || Object.keys(errors).length) ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500"} `}
                            type="button" onClick={handleSubmit}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

