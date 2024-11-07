import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addOrder as addOrderApi } from "../services/apiOrder";

export function useAddOrder() {
    const { mutate: addOrder, isLoading: isInserting } = useMutation({
        mutationFn: addOrderApi,
        onSuccess: () => {
            toast.success("Order has been successfuly sent");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isInserting, addOrder };
}
