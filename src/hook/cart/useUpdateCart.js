import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateQuantity } from "../../services/apiCart";

export function useUpdateCart() {
    const queryClient = useQueryClient();

    const { mutate: updateCartItem, isLoading: isUpdating } = useMutation({
        mutationFn: updateQuantity,
        onSuccess: () => {
            toast.success("Cart item successfully updated");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isUpdating, updateCartItem };
}
