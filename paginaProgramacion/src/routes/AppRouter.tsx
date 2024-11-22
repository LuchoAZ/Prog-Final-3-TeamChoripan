import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Home } from "../components/screens/Home/Home";
import { AdminPage } from "../components/screens/Admin/AdminPage";

export const AppRouter = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/:sucursalId" element={<AdminPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};