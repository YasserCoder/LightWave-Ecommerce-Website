import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { logout as logoutApi } from "../services/apiAuth";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate: logout, isLoading } = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.setQueryData(["user"], null);
            navigate("/login", { replace: true });
            toast.success("you are in Anonnyme mode Now");
        },
        onError: () => {
            toast.error("Logout Failed");
        },
    });

    return { logout, isLoading };
}
