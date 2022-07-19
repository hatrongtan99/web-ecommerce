import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ProductsInCartResult } from "~/types/index";

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        productsIncart: [] as ProductsInCartResult[],
    },
    reducers: {
        saveProductsInCart: (state, action: PayloadAction<ProductsInCartResult[]>) => {
            state.productsIncart = action.payload
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.productsIncart = action.payload.checkout.productsIncart
        }
    }
})

export default checkoutSlice.reducer;

export const {saveProductsInCart} = checkoutSlice.actions;