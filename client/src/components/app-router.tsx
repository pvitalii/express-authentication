import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/home-page";
import LoginPage from "../pages/login-page";

function AppRouter() {

    return (
        <Routes>
            <Route>
                <Route path="/" element={HomePage()}/>
                <Route path="/login" element={LoginPage()} />
                <Route path="/registration" element={LoginPage()} />
            </Route>
        </Routes>
    )
}

export default AppRouter;