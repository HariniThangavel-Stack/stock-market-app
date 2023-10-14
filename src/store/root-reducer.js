import { combineReducers } from 'redux';
import dashboardReducer from "../reducers/dashboard";

export const rootReducer = combineReducers(
    {
        dashboard: dashboardReducer
    }
);