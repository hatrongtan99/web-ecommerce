import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import type {ProductsByCategoryResult, ProductBycategoryAndSlugResult} from 'src/types/index'

const productsCategorySlice = createSlice({
    name: 'products',
    initialState: {
        dataByCategory: {} as ProductsByCategoryResult,
        dataByCategoryAndSlug: {} as ProductBycategoryAndSlugResult
    },
    reducers: {
        saveProductByCategory: (state, action: PayloadAction<ProductsByCategoryResult>) => {
            return {
                ...state,
                dataByCategory: action.payload
            }
        },

        saveProductByCategoryAndSlug: (state, action: PayloadAction<ProductBycategoryAndSlugResult>) => {
            return {
                ...state,
                dataByCategoryAndSlug: action.payload
            }
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            // state.dataByCategory = {...state.dataByCategory, ...action.payload.products.dataByCategory};
            // state.dataByCategoryAndSlug = {...state.dataByCategoryAndSlug, ...action.payload.products.dataByCategoryAndSlug};
    }
}
});

export default productsCategorySlice.reducer;

export const {saveProductByCategory, saveProductByCategoryAndSlug} = productsCategorySlice.actions;