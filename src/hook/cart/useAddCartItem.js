import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addCartItem as addCartItemApi } from "../../services/apiCart";

export function useAddCartItem() {
    const queryClient = useQueryClient();

    const { mutate: addCartItem, isLoading: isInserting } = useMutation({
        mutationFn: addCartItemApi,
        onSuccess: () => {
            toast.success("Cart item successfully inserted");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (err) => {
            if (
                err.message ===
                'duplicate key value violates unique constraint "cart_pkey"'
            ) {
                toast.error("The product is already in cart");
            } else {
                toast.error(err.message);
            }
        },
    });

    return { isInserting, addCartItem };
}
