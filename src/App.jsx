import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<Home />} />

                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="product/:productId" element={<Cart />} />
                    <Route path="shop/*" element={<Shop />} />
                </Route>

                <Route path="adminLogin" element={<AdminLogin />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
