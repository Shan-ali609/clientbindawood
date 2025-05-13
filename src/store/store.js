import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import productReducer from './productslice'
export const store = configureStore({
  reducer: {
    user : userReducer,
    product : productReducer
  },
})