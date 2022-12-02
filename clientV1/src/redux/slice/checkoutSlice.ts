import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { HYDRATE } from "next-redux-wrapper";
import orderApi from "~/api/order";
import { ProductsInCartResult } from "~/types/index";

export const deleteProductInCartThunk = createAsyncThunk(
    'checkout/deleteProductInCart',
    async ({userId, productId}: {userId: string, productId: string}, {fulfillWithValue, rejectWithValue}) => {
        try {
            const deleteProductIncartRes = await orderApi.deleteProductInCart(userId, productId)
            if (deleteProductIncartRes.success) {
                const getProductsInCart = await orderApi.getProductsInCart(userId);
                return fulfillWithValue(getProductsInCart.data)
            }
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.message)
        }
    }
)

export const changeQuantityProductThunk = createAsyncThunk(
    'checkout/changeQuantityProduct',
    async ({userId, productId, quantity}: {userId: string, productId: string, quantity: number}, {fulfillWithValue, rejectWithValue}) => {
        const params = {
            quantity
        }
        try {
            const updateQuantityProduct = await orderApi.updateQuantityProduct(userId, productId, params);
            if (updateQuantityProduct.success) {
                const getProductsInCart = await orderApi.getProductsInCart(userId);
                return fulfillWithValue(getProductsInCart.data)
            }
        } catch (error ) {
            const err = error as AxiosError
            return rejectWithValue(err.message)
        }
    }   
)

export const addProductToCartThunk = createAsyncThunk(
    'checkout/addProductToCart',
    async ({userId, productId, quantity}: {userId: string, productId: number, quantity: number}, {fulfillWithValue, rejectWithValue}) => {
        const params = {
            userId,
            productId,
            quantity
        }
        try {
            const response = await orderApi.addToCart(params)
            if (response.success) {
                const getProductsInCart = await orderApi.getProductsInCart(userId);
                return fulfillWithValue(getProductsInCart.data)
            }
        } catch (error) {
            const err = error as AxiosError
            return rejectWithValue(err.message)
        }
    }
)

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        productsIncart: {status: 'idle', data: [] as ProductsInCartResult[], error: null},
        userSessionId: ''
    },
    reducers: {
        saveProductsInCart: (state, action: PayloadAction<ProductsInCartResult[]>) => {
            return {
                ...state,
                productsIncart: {
                    ...state.productsIncart,
                    data: action.payload
                }
            }
        },

        saveUserSessionId: (state, action: PayloadAction<string>) => {
            return {
                ...state,   
                userSessionId: action.payload
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                productsIncart: {...state.productsIncart, ...action.payload.checkout.productsIncart}
            }
            
        },

        // delete product in cart
        [deleteProductInCartThunk.pending.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'loading'
            }
        },
        [deleteProductInCartThunk.fulfilled.type]: (state, action) => {
            state.productsIncart = {
                status: 'idle',
                data: action.payload,
                error: null
            }
        },
        [deleteProductInCartThunk.rejected.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'rejected',
                error: action.payload
            }
        },
        // update quantity product
        [changeQuantityProductThunk.pending.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'loading'
            }
        },
        [changeQuantityProductThunk.fulfilled.type]: (state, action) => {
            state.productsIncart = {
                status: 'idle',
                data: action.payload,
                error: null
            }
        },
        [changeQuantityProductThunk.rejected.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'rejected',
                error: action.payload
            }
        },
        // add product to cart
        [addProductToCartThunk.pending.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'loading'
            }
        },
        [addProductToCartThunk.fulfilled.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'idle',
                error: null,
                data: action.payload
            }
        },
        [addProductToCartThunk.rejected.type]: (state, action) => {
            state.productsIncart = {
                ...state.productsIncart,
                status: 'rejected',
                error: action.payload,
            }
        },
    }
})

export default checkoutSlice.reducer;

export const {saveProductsInCart, saveUserSessionId} = checkoutSlice.actions;