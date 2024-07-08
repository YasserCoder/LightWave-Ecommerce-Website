import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { LocalStorageContext } from "../LocalStorageContext";
import { useGetProductsListe } from "../../hook/cart/useGetProductsListe";

import Loader from "../Loader";
import CartBody from "./CartBody";

function AnonUsersCart({ user }) {
    const queryClient = useQueryClient();

    const { value, setValue } = useContext(LocalStorageContext);

    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function deleteCartItem(productId) {
        setIsDeleting(true);
        await setValue((prevItems) => {
            return prevItems.filter((item) => {
                return item.productId !== productId;
            });
        });
        queryClient.invalidateQueries({
            queryKey: ["cart products"],
        });
        toast.success("Cart item successfully deleted");
        setIsDeleting(false);
    }
    async function updateCartItem(id, newQte) {
        setIsUpdating(true);
        await setValue((prevItems) => {
            return prevItems.map((item) => {
                return item.productId === id
                    ? { ...item, quantity: newQte }
                    : item;
            });
        });
        queryClient.invalidateQueries({
            queryKey: ["cart products"],
        });
        toast.success("Cart item successfully updated");
        setIsUpdating(false);
    }

    const { isLoading, cartItems } = useGetProductsListe(value);

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

export default AnonUsersCart;
