import { useContext, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { LocalStorageContext } from "../../ui/LocalStorageContext";

export function useDeleteLocalCart() {
    const queryClient = useQueryClient();
    const { setValue } = useContext(LocalStorageContext);

    const [isErasing, setIsErasing] = useState(false);

    async function deleteLocalCart() {
        setIsErasing(true);
        setValue([]);
        queryClient.invalidateQueries({
            queryKey: ["cart products"],
        });

        setIsErasing(false);
    }
    return { isErasing, deleteLocalCart };
}
