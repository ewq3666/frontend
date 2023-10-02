import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import MyProfile from "../pages/MyProfile/MyProfile";
import Setting from "../pages/SettingMenu/SettingMenu";
import EditProfile from "../pages/EditProfile/EditProfile";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Layout from "../layout/Layout";
import Protected from "./Protected";

export const routes = [
    {
        path: "/",
        element: <Layout />,
        childRoutes: [
            {
                index: true,
                // element: <Home />,
                element:<Protected Component={Home} />,
            },
            
            {
                path: "forgotpassword",
                element: <ForgotPassword />

            },
            {
                path: "myprofile",
                element: <Protected Component={MyProfile} />

            },
            {
                path: "editprofile",
                // element: <Protected Component={EditProfile} />
                element: <EditProfile />

            },
            {
                path: "change-password",
                // element: <Protected Component={ChangePassword} />
                element: <ChangePassword />
            },

        ]
    },
    {
        path: "*",
        element: <PageNotFound />
    },
    {
        path: "setting",
        // element: <Protected Component={Setting} />
        element: <Setting />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />

    },
]