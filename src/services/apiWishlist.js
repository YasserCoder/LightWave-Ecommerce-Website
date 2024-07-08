import supabase from "./supabase";

export async function getLikedItems(userId) {
    let { data, error } = await supabase
        .from("wishlist")
        .select("productId")
        .eq("userId", userId)
        .order("liked_at");
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function dislikeItem({ userId, productId }) {
    const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("productId", productId)
        .eq("userId", userId);

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
    return productId;
}

export async function likeItem({ userId, productId }) {
    const { error } = await supabase
        .from("wishlist")
        .insert([{ userId, productId }]);
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    return productId;
}
