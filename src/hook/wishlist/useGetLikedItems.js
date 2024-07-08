import { useQuery } from "@tanstack/react-query";
import { getLikedItems } from "../../services/apiWishlist";

export function useGetLikedItems(userId) {
    const { isLoading, data: wishlistItems } = useQuery({
        queryKey: ["wishlist"],
        queryFn: () => getLikedItems(userId),
        enabled: !!userId,
    });

    return { isLoading, wishlistItems };
}
