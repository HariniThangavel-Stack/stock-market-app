import * as Yup from 'yup';

import { formFieldVal } from "../constants/dashboard";

export const getFormattedTableHeaders = (stockDataKeys) => {
    return stockDataKeys.reduce((previousValue, currentValue, currentIndex, array) => {
        if (currentValue === "previousClose") previousValue[currentIndex] = "PREV-CLOSE"
        else if (currentValue === "percentageChange") previousValue[currentIndex] = "% CHANGE"
        else if (currentValue === "yearPercentageChange") previousValue[currentIndex] = "YEAR % CHANGE"
        else if (currentValue === "monthPercentageChange") previousValue[currentIndex] = "MONTH % CHANGE "
        else previousValue[currentIndex] = currentValue.toLocaleUpperCase()
        return previousValue
    }, []);
};



export const getFormFieldName = (name) => {
    let fieldName = null;
    Object.keys(formFieldVal).forEach(val => {
        if (val === name) fieldName = formFieldVal[val]
    });
    return fieldName;
};

export const stockDataValidation = Yup.object().shape({
    symbol: Yup.string().required('Symbol value required'),
    open: Yup.string().required('Open value required'),
    high: Yup.string().required('High value required'),
    low: Yup.string().required('Low value required'),
    previousClose: Yup.string().required('Previous close value required'),
    ltp: Yup.string().required('Ltp value required'),
    change: Yup.string().required('Change value required'),
    percentageChange: Yup.string().required('Percentage value required'),
    volume: Yup.string().required('Volume value required'),
    value: Yup.string().required('Value required'),
    yearHigh: Yup.string().required('Year high value required'),
    yearLow: Yup.string().required('Year low value required'),
    yearPercentageChange: Yup.string().required('Year percentage value required'),
    monthPercentageChange: Yup.string().required('Month percentage value required'),
});