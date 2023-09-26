import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import ChangePassword from "../pages/ChangePassword";
import MyProfile from "../pages/MyProfile/MyProfile";
import Setting from "../pages/SettingMenu/SettingMenu";
import EditProfile from "../pages/EditProfile/EditProfile";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

export const routes = [
    {
        path: "/",
        element: <Home />,
        childRoutes: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signup",
                element: <Signup />

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
                path: "setting",
                element: <Protected Component={Setting} />
            },
            {
                path: "editprofile",
                element: <Protected Component={EditProfile} />

            },
            {
                path: "changepassword",
                element: <Protected Component={ChangePassword} />
            },

        ]
    },
    {
        path: "*",
        element: <PageNotFound />
    }
]