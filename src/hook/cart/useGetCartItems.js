import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "../../services/apiCart";

export function useGetCartItems(userId) {
    const { isLoading, data: cartItems } = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCartItems(userId),
        enabled: !!userId,
    });

    return { isLoading, cartItems };
}
