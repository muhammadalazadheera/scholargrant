import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import BaseLayout from "../BaseLayout";
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
import AllScholarships from "../pages/AllScholarships";
import ScholarshipDetails from "../pages/ScholarshipDetails";
import ApplyScholarship from "../pages/ApplyScholarship";
import MyApplications from "../dashboard/pages/MyApplications";
import MyReviews from "../dashboard/pages/MyReviews";
import ManageReviews from "../dashboard/pages/ManageReviews";
import ManageApplications from "../dashboard/pages/ManageApplications";

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
                path: "/all-scholarships",
                element: <PrivateRoutes><AllScholarships></AllScholarships></PrivateRoutes>
            },
            ,
            {
                path: "/scholarship-details/:id",
                element: <PrivateRoutes><ScholarshipDetails></ScholarshipDetails></PrivateRoutes>
            },
            {
                path: 'apply-scholarship',
                element: <PrivateRoutes><ApplyScholarship></ApplyScholarship></PrivateRoutes>
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
            {
                path: "my-applications",
                element: <MyApplications />
            },
            {
                path: "my-reviews",
                element: <MyReviews />
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
            },
            {
                path: 'admin/manage-reviews',
                element: <ModMinRoute><ManageReviews></ManageReviews></ModMinRoute>
            },
            {
                path: 'admin/manage-applications',
                element: <ModMinRoute><ManageApplications></ManageApplications></ModMinRoute>
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