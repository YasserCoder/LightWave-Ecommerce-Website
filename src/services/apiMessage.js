import supabase from "./supabase";

export async function addMessage(contactData) {
    const { error: messageError } = await supabase
        .from("message")
        .insert([contactData]);

    if (messageError) {
        console.log(messageError.message);
        throw new Error(messageError.message);
    }
}
