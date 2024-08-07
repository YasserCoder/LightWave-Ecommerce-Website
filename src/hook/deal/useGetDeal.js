import { useQuery } from "@tanstack/react-query";
import { getDeal } from "../../services/apiDeal";

export function useGetDeal(id) {
    const { isLoading: isGetting, data: deal } = useQuery({
        queryKey: ["deal", id],
        queryFn: () => getDeal(id),
    });

    return { isGetting, deal };
}
