import { useLocation, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProducts";

export function useGetProducts(pageSize) {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const pathParts = location.pathname
        .split("/")
        .filter((part) => part !== "")
        .map((e) => {
            return e.includes("%20") ? e.replaceAll("%20", " ") : e;
        });

    const category = pathParts.at(-1);
    const status = searchParams.get("status") || "all";
    const sortBy = searchParams.get("sortBy") || "";
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));
    const searchQuery = searchParams.get("q");

    const { isLoading, data: { data: products, count } = {} } = useQuery({
        queryKey: ["products", category, status, sortBy, page, searchQuery],
        queryFn: () =>
            getProducts({
                category,
                status,
                sortBy,
                page,
                pageSize,
                searchQuery,
            }),
    });

    return { isLoading, products, count };
}
