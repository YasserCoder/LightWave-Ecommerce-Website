import supabase from "./supabase";

export async function getCartItems(userId) {
    let { data, error } = await supabase
        .from("cart")
        .select(" quantity,product(*,imgs:prodImage(imgUrl,imgAlt))")
        .eq("userId", userId)
        .order("added_at");
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function updateQuantity({ userId, productId, newQte }) {
    const { error } = await supabase
        .from("cart")
        .update({ quantity: newQte })
        .eq("productId", productId)
        .eq("userId", userId);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
}

export async function deleteCartItem({ userId, productId }) {
    const { error } = await supabase
        .from("cart")
        .delete()
        .eq("productId", productId)
        .eq("userId", userId);

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

export async function addCartItem({ userId, productId, quantity = 1 }) {
    const { data, error } = await supabase
        .from("cart")
        .insert([{ userId, productId, quantity }])
        .select();
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}
export async function deleteCart(userId) {
    const { error } = await supabase.from("cart").delete().eq("userId", userId);
    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
