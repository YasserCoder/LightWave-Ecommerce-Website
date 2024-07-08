import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { likeItem as likeItemApi } from "../../services/apiWishlist";

export function useLikeItem() {
    const queryClient = useQueryClient();

    const { mutate: likeItem, isLoading: isLiking } = useMutation({
        mutationFn: likeItemApi,
        onSuccess: (id) => {
            toast.success("product has been added to wishlist");
            queryClient.invalidateQueries({ queryKey: ["wishlist"] });
            queryClient.invalidateQueries({ queryKey: ["product", id] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isLiking, likeItem };
}
