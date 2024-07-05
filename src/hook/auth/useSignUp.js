import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signup as signupApi } from "../../services/apiAuth";

export function useSignUp() {
    const navigate = useNavigate();
    const { mutate: signup, isLoading } = useMutation({
        mutationFn: signupApi,
        onSuccess: () => {
            toast.success("Account successfully created! Login NOW");
            navigate("/login", { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { signup, isLoading };
}
