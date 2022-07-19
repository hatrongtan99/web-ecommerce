import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import productReducer from './slice/productsSlice';
import checkoutReducer from './slice/checkoutSlice';

const rootReducer = combineReducers({
    products: productReducer,
    checkout: checkoutReducer
})

const makeStore = () => configureStore({
    reducer: rootReducer,
    devTools: true
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore);

