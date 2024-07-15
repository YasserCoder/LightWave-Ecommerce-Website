import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCart as deleteCartApi } from "../../services/apiCart";

export function useDeleteCart() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCart } = useMutation({
        mutationFn: deleteCartApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCart };
}
