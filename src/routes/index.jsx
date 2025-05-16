import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Searchpage from '../pages/Searchpage'
import Register from '../pages/Register'
import ForgotPassword from '../pages/ForgotPassword'
import OtpVerification from '../pages/OtpVerification'
import PasswordReset from '../pages/PasswordReset'
import Login from '../pages/Login'
import UserMenuMobile from '../pages/UserMenuMobile'
import Dashboard from '../layouts/Dashboard'
import Profile from '../pages/Profile'
import Myorders from '../pages/Myorders'
import Address from '../pages/Address'
import Category from '../pages/Category'
import SubCategory from '../pages/SubCategory'
import UploadProduct from '../pages/UploadProduct'
import ProductAdmin from '../pages/ProductAdmin'
import Adminpermission from '../layouts/Adminpermission'
import Productlistpage from '../pages/Productlistpage'
import ProductDisplayPage from '../pages/ProductDisplayPage'
const router  =  createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "/",
                element:<Home />
            },
            {
                path: "/search",
                element:<Searchpage />
            },
            {
                path: "/login",
                element:<Login />
            },
            {
                path: "/register",
                element:<Register />
            },
            {
                path: "/forgot-password",
                element:<ForgotPassword />
            },
            {
                path: "/Otp_Verification",
                element:<OtpVerification />
            },
            {
                path: "/password-reset",
                element:<PasswordReset />
            },
            {
                path: "/user",
                element:<UserMenuMobile />
            },
            {
                path: "dashboard",
                element:<Dashboard />,
                children : [
                    {
                        path: "profile",
                        element:<Profile />
                    },
                    {
                        path: "myorders",
                        element:<Myorders />
                    },
                    {
                        path: "address",
                        element:<Address />
                    },
                    {
                        path: "category",
                        element:<Adminpermission><Category /></Adminpermission>
                    },
                    {
                        path: "subcategory",
                        element:<Adminpermission><SubCategory /></Adminpermission>
                    },
                    {
                        path: "uploadproduct",
                        element:<Adminpermission><UploadProduct/></Adminpermission>
                    },
                    {
                        path: "product",
                        element:<Adminpermission><ProductAdmin/></Adminpermission>
                    }
                ]
            },
            {
                path : ":Category",
                children : [
                    {
                        path : ":subcategory",
                        element : <Productlistpage/>
                    }
                ]
            } , 
            {
                path : "product/:product",
                element : <ProductDisplayPage/>
            },
           
        ]
    }
])

export default router