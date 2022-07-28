import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ProductsInCartResult } from "~/types/index";
import { AppThunk } from "../store";

const deleteProductInCartThunk = createAsyncThunk(
    'checkout/deleteProductInCart',
    async () => {

    }
)

const changeQuantityProductThunk = createAsyncThunk(
    'checkout/changeQuantityProduct',
    async () => {

    }
)

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        productsIncart: {status: 'idle', data: [] as ProductsInCartResult[]},
    },
    reducers: {
        saveProductsInCart: (state, action: PayloadAction<ProductsInCartResult[]>) => {
            state.productsIncart = {
                ...state.productsIncart,
                data: action.payload
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            state.productsIncart = action.payload.checkout.productsIncart
        },

        // delete product in cart
        [deleteProductInCartThunk.pending as any]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'loadding'
            }
        },
        [deleteProductInCartThunk.fulfilled as any]: (state, action) => {
            state.productsIncart = {
                status: 'idle',
                data: action.payload
            }
        }
    }
})

export default checkoutSlice.reducer;

export const {saveProductsInCart} = checkoutSlice.actions;