import { useQuery } from "@tanstack/react-query";
import { getDeals } from "../../services/apiDeal";

export function useGetDeals() {
    const { isLoading: isGetting, data: deals } = useQuery({
        queryKey: ["deals"],
        queryFn: () => getDeals(),
    });

    return { isGetting, deals };
}
