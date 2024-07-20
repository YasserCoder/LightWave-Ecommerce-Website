import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useGetProducts(category) {
    const { isLoading, data: products } = useQuery({
        queryKey: ["products"],
        queryFn: () => getProducts(category),
    });

    return { isLoading, products };
}
