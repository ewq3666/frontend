import { BrowserRouter as MainRoute, Route, Routes } from "react-router-dom";
import { routes } from "./Routes";

export const Router = () => {
    return (
        <MainRoute>
            <Routes>
                {
                    getRoutes(routes)
                }
            </Routes>
        </MainRoute>
    )
}

const getRoutes = (routes) => {
    return (
        routes?.map((item) => {
            return (
                <Route element={item.element} path={item.path} {...item}>
                    {getRoutes(item.childRoutes)}
                </Route>
            )
        })
    )
}