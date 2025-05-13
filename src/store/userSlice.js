// import { createSlice } from '@reduxjs/toolkit'

// const initialValue = {
//     _id : "",
//     name : "",
//     email : "",
//     avatar : "",
//     number : "",
//     verify_email : "",
//     status : "",
//     address_details : [],
//     shopping_cart : [],
//     orderHistory : [],
//     role : "",
//     last_login_date : ""

// }


// export const userSlice  = createSlice({
//     name: 'user',
//     initialState : initialValue,
//     reducers : {
//      setUserDetails: ((state, action)=>{
//         state._id =  action.payload?._id
//         state.name = action.payload?.name
//         state.email = action.payload?.email 
//         state.avatar = action.payload?.avatar
//         state.number = action.payload?.number
//         state.verify_email = action.payload?.verify_email
//         state.status = action.payload?.status
//         state.address_details = action.payload?.address_details
//         state.shopping_cart = action.payload?.shopping_cart
//         state.orderHistory = action.payload?.orderHistory
//         state.role = action.payload?.role
//         state.last_login_date = action.payload?.last_login_date
//      })
//     },
//     logout : ((state)=>{
//         state._id =  ""
//         state.name = ""
//         state.email = ""
//         state.avatar = ""
//         state.number = ""
//         state.verify_email = ""
//         state.status = ""
//         state.address_details = []
//         state.shopping_cart = []
//         state.orderHistory = []
//         state.role = ""
//         state.last_login_date = ""
//     })

// })


// export const {setUserDetails , logout} = userSlice.actions

// export default userSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
const initialValue = {
    _id: "",
    name: "",
    email: "",
    avatar: "",
    number: "",
    verify_email: "",
    status: "",
    address_details: [],
    shopping_cart: [],
    orderHistory: [],
    role: "",
    last_login_date: ""
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            // Using spread to set the user details
            return { ...state, ...action.payload };
        },
        updateUserDetails: (state, action) => {
            state.name = action.payload?.name
            state.email = action.payload?.email
            state.number = action.payload?.number
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload
        },
        logout: (state) => {
            return { ...initialValue }; // resets state to initialValue
        }
    }
})

export const { setUserDetails, logout ,updateAvatar , updateUserDetails

} = userSlice.actions

export default userSlice.reducer;
