import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/SignUp";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import MyProfile from "../pages/MyProfile/MyProfile";
import Setting from "../pages/SettingMenu/SettingMenu";
import Wallet from "../pages/Wallet/Wallet";
import MyContest from "../pages/MyContest/MyContest";
import ContactUs from "../pages/ContactUs/ContactUs";
import EditProfile from "../pages/EditProfile/EditProfile";
import PageNotFound from "../Components/PageNotFound/PageNotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Layout from "../layout/Layout";
import Protected from "./Protected";
import Transaction from "../pages/Transaction/Transaction";
import QuizApp from "../quize/Quize";
import Submit from "../Components/Submit/Submit";
import ContestDetails from "../Components/ContestDetails/ContestDetails";
import MainLeaderboard from "../pages/MainLeaderboard";
import LoginSignup from "../pages/Login/LoginSignup";

export const routes = [
    {
        path: "",
        element: <Layout />,
        childRoutes: [
            {
                index: true,
                // element: <Home />,
                element:<Protected Component={Home} />,
            },
            {
                path: "contest-details/:id",
                element: <ContestDetails />
            },
            {
                path: "myprofile",
                element: <Protected Component={MyProfile} />
            },
            {
                path: "leaderboard",
                element: <Protected Component={MainLeaderboard} />
            },
            {
                path: "quize/:id",
                element: <Protected Component={QuizApp} />
            },
            {
                path: "submit",
                element: <Protected Component={Submit} />
            },

        ]
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "register",
        element: <LoginSignup />
    },
    {
        path: "signup",
        element: <Signup />
        
    },
    {
        path: "transaction",
        element: <Protected Component={Transaction} />
    },
    {
        path: "wallet",
        element: <Protected Component={Wallet} />
    },
    {
        path: "mycontest",
        element: <Protected Component={MyContest} />
    },
    {
        path: "contactus",
        element: <Protected Component={ContactUs} />
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
        path: "change-password",
        element: <Protected Component={ChangePassword} />
    },
    {
        path: "*",
        element: <PageNotFound />
    },
]