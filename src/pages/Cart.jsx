import { useUser } from "../hook/auth/useUser";

import Loader from "../ui/Loader";
import AuthUsersCart from "../ui/cart/AuthUsersCart";
import AnonUsersCart from "../ui/cart/AnonUsersCart";

function Cart() {
    const { user, isLoading: isConnecting } = useUser();

    if (isConnecting) {
        return <Loader />;
    }

    if (user?.role === "authenticated") {
        return <AuthUsersCart user={user} />;
    }

    return <AnonUsersCart user={user} />;
}

export default Cart;
