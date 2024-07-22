import { useQuery } from "@tanstack/react-query";
import { getSimilarProducts } from "../../services/apiProducts";

export function useSimilarProducts(id, name, brand, categoryId) {
    const { isLoading, data: similarProducts } = useQuery({
        queryKey: ["Similar Products", id],
        queryFn: () => getSimilarProducts({ name, brand, categoryId }),
    });

    return { isLoading, similarProducts };
}
