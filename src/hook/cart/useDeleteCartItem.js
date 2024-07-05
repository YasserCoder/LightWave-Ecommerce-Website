import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCartItem as deleteCartItemApi } from "../../services/apiCart";

export function useDeleteCartItem() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCartItem } = useMutation({
        mutationFn: deleteCartItemApi,
        onSuccess: () => {
            toast.success("Cart item successfully deleted");

            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCartItem };
}
