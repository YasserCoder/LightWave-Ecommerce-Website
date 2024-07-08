import { useDeleteCartItem } from "../../hook/cart/useDeleteCartItem";
import { useGetCartItems } from "../../hook/cart/useGetCartItems";
import { useUpdateCart } from "../../hook/cart/useUpdateCart";

import Loader from "../Loader";
import CartBody from "./CartBody";

function AuthUsersCart({ user }) {
    const { isLoading, cartItems } = useGetCartItems(user?.id);
    const { isUpdating, updateCartItem } = useUpdateCart();
    const { isDeleting, deleteCartItem } = useDeleteCartItem();

    if (isLoading) return <Loader />;

    return (
        <CartBody
            user={user}
            cartItems={cartItems}
            isDeleting={isDeleting}
            deleteCartItem={deleteCartItem}
            isUpdating={isUpdating}
            updateCartItem={updateCartItem}
        />
    );
}

export default AuthUsersCart;
