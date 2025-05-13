import { createSlice } from '@reduxjs/toolkit';

const initialValue = {
    
   allCategory: [],
   loadingcategory: false,
   allSubCategory: [],  // Changed to camelCase for consistency
   product: []
};

export const productSlice = createSlice({
    name: 'product',
    initialState: initialValue,
    reducers: {
        setallCategory: (state, action) => {
            state.allCategory = [...action.payload]
        },
        setloadingcategory: (state, action) =>{
            state.loadingcategory = action.payload
        }
        ,
        setallSubCategory: (state, action) => {
            state.allSubCategory = [...action.payload]
        }
    }
});

// Export actions
export const { setallCategory , setallSubCategory , setloadingcategory } = productSlice.actions;

// Export reducer
export default productSlice.reducer;
