import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { LocalStorageContext } from "../../ui/LocalStorageContext";

export function useAddLocalCartItem() {
    const queryClient = useQueryClient();
    const { value, setValue } = useContext(LocalStorageContext);

    const [isAdding, setIsAdding] = useState(false);

    async function addLocalCartItem(obj) {
        let exist = false;
        value.map((item) => {
            if (item.productId === obj.productId) {
                toast.error("product already exists in cart");
                exist = true;
            }
        });
        if (!exist) {
            setIsAdding(true);
            const newVal = [...value, obj];
            setValue(newVal);
            queryClient.invalidateQueries({
                queryKey: ["cart products"],
            });
            toast.success("Cart item successfully inserted");
            setIsAdding(false);
        }
    }
    return { isAdding, addLocalCartItem };
}
