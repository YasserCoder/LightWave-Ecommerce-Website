import supabase from "./supabase";

export async function getDeal(id) {
    let { data, error } = await supabase
        .from("deal")
        .select("*,dealItems(quantity,product(id,name)) ")
        .eq("id", id)
        .single();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}
export async function getDeals() {
    let { data, error } = await supabase.from("deal").select("id");
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}
