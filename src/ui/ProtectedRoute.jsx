import { useUser } from "../hook/useUser";
import { useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const { isLoading, isAuthenticated } = useUser();

    // 2. If there is NO authenticated user, redirect to the /login
    useEffect(
        function () {
            if (!isAuthenticated && !isLoading) {
                navigate("/");
                alert("you have to be authenicated to access to the wishlist");
            }
        },
        [isAuthenticated, isLoading, navigate]
    );

    // 3. While loading, show a spinner
    if (isLoading)
        return (
            <div className="h-[100vh] flex justify-center items-center">
                <Loader />
            </div>
        );

    // 4. If there IS a user, render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
