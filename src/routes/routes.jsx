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
import ModMinRoute from "./ModMinRoutes";
import AddScholar from "../dashboard/pages/AddScholar";
import ManageScholarships from "../dashboard/pages/ManageScholarships";

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
            },
            // MODMIN ROUTES
            {
                path: 'admin/add-scholarship',
                element: <ModMinRoute><AddScholar></AddScholar></ModMinRoute>
            },
            {
                path: 'admin/manage-scholarships',
                element: <ModMinRoute><ManageScholarships></ManageScholarships></ModMinRoute>
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