import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import WishList from "./pages/WishList";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
                initialIsOpen={false}
                buttonPosition="bottom-left"
            />
            <BrowserRouter>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="home" />} />
                        <Route path="home" element={<Home />} />

                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="wishlist" element={<WishList />} />
                        <Route path="cart" element={<Cart />} />
                        <Route
                            path="product/:productId"
                            element={<ProductDetails />}
                        />
                        <Route path="shop/*" element={<Shop />} />
                    </Route>

                    <Route path="adminLogin" element={<AdminLogin />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
