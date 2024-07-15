import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { addMessage } from "../services/apiMessage";

export function useSendMessage() {
    const { mutate: sendMessage, isLoading: isSending } = useMutation({
        mutationFn: addMessage,
        onSuccess: () => {
            toast.success("Message has been send successfuly ");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { isSending, sendMessage };
}
