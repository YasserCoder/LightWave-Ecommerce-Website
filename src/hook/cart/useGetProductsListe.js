import { useQuery } from "@tanstack/react-query";
import { getProductsListe } from "../../services/apiProducts";

export function useGetProductsListe(value) {
    const { isLoading, data: cartItems } = useQuery({
        queryKey: ["cart products"],
        queryFn: () => getProductsListe(value),
        enabled: !!value,
    });

    return { isLoading, cartItems };
}
