import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dislikeItem as dislikeItemApi } from "../../services/apiWishlist";

export function useDislikeItem() {
    const queryClient = useQueryClient();

    const { isLoading: isDisliking, mutate: dislikeItem } = useMutation({
        mutationFn: dislikeItemApi,
        onSuccess: (id) => {
            toast.success("product has been droped from wishlist");
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDisliking, dislikeItem };
}
