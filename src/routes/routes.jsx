import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BaseLayout from "../BaseLayout";
import ProfilePage from "../pages/ProfilePage";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../dashboard/DashboardLayout";
import DashboardHome from "../dashboard/pages/Home";
import Profile from "../dashboard/pages/Profile";
import AdminRoute from "./AdminRoutes";
import Users from "../dashboard/pages/Users";
import Forbidden from '../pages/Forbidden'
import NotFound from '../pages/NotFound'

const router = createBrowserRouter([
    {
        path: "/",
        Component: BaseLayout,
        
        children: [
            {
                index: true,
                Component: HomePage
            },
            ,
            {
                path: "/login",
                Component: LoginPage
            },
            {
                path: "/register",
                Component: RegisterPage
            },
            {
                path: "/profile",
                element: <PrivateRoutes><ProfilePage></ProfilePage></PrivateRoutes>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,

        children: [
            {
                index: true,
                Component:DashboardHome
            },
            {
                path: "profile",
                Component: Profile
            },
            // ADMIN ROUTES
            {
                path: 'admin/users',
                element:<AdminRoute><Users></Users></AdminRoute>
            }
        ]
    },
    { 
        path: '/forbidden', 
        element: <Forbidden /> 
    },
    { 
        path: '*', 
        element: <NotFound /> 
    }
]);

export default router;