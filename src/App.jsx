import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

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
                        <Route path="profile" element={<Profile />} />
                        <Route path="wishlist" element={<WishList />} />
                        <Route path="cart" element={<Cart />} />
                        <Route path="about">
                            <Route
                                index
                                element={<Navigate replace to="whoarewe" />}
                            />
                            <Route path="whoarewe" element={<About />} />
                            <Route path="payment" element={<About />} />
                            <Route path="delivery" element={<About />} />
                            <Route path="garantee" element={<About />} />
                        </Route>
                        <Route path="contact" element={<Contact />} />
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
            <Toaster
                position="top-center"
                gutter={12}
                containerStyle={{ margin: "8px" }}
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                    error: {
                        duration: 5000,
                    },
                    style: {
                        fontSize: "16px",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "#fff",
                        color: "#374151",
                    },
                }}
            />
        </QueryClientProvider>
    );
}

export default App;
