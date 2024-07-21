import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useAnouncementProducts(status, pageSize) {
    const { isLoading, data: { data: products, count } = {} } = useQuery({
        queryKey: [status],
        queryFn: () =>
            getProducts({
                category: "all",
                status,
                sortBy: "",
                page: 1,
                pageSize,
            }),
    });

    return { isLoading, products, count };
}
