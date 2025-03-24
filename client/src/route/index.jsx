import { createBrowserRouter } from "react-router-dom"; 
import App from "../App";
import Home from "../pages/Home";
import "../index.css";
import "../App.css";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Otpverification from "../pages/Otpverification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrder from "../pages/MyOrder";
import Address from "../pages/Address";

import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import CategoryPage from "../pages/CategoryPage";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";


const router = createBrowserRouter ([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "search",
                element: <SearchPage/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "verification_otp",
                element: <Otpverification/>
            },
            {
                path: "reset-password",
                element: <ResetPassword/>
            },
            {
                path: "user",
                element: <UserMenuMobile/>
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
                children:[
                    {
                        path : "profile",
                        element :<Profile/>
                    },
                    {
                        path : "myorder",
                        element :<MyOrder/>
                    },
                    {
                        path : "address",
                        element :<Address/>
                    },
                    {
                        path : "category",
                        element :<AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path : "subcategory",
                        element :<AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path : "upload-product",
                        element :<AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path : "product",
                        element :<AdminPermision><ProductAdmin/></AdminPermision>
                    },
                ]
            },
        ]
    }
])
export default router;