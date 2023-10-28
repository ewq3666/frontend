import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from "react-helmet";
import Header from './Header/Header';

const Layout = () => {

    return (
        <div className="layout-main-container">
            <Helmet>
                <meta name="robots" content="noindex" />
                <title>EWQ - The Premier Platform for Paid Quizzes and Earnings </title>
                <meta name="description" content="Experience EWQ, the top destination for paid quizzes that empower you to earn rewards while expanding your knowledge. Join our platform to unlock a world of educational opportunities and exciting rewards today."></meta>
            </Helmet>
            <Header />
            <Outlet />
        </div>
    )
}

export default Layout;