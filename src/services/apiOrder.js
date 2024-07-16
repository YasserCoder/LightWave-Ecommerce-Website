import supabase from "./supabase";

export async function addOrder({ orderData, prodInfo }) {
    const { data: order, error: orderError } = await supabase
        .from("order")
        .insert([orderData])
        .select()
        .single();

    if (orderError) {
        console.log(orderError.message);
        throw new Error(orderError.message);
    }

    const orderItemsData = prodInfo.map((item) => ({
        orderId: order.id,
        productId: item?.id,
        quantity: item?.qte,
        price: item?.price,
    }));

    const { error: orderItemsError } = await supabase
        .from("orderItems")
        .insert(orderItemsData);

    if (orderItemsError) {
        console.log(orderItemsError.message);
        throw new Error(orderItemsError.message);
    }
}
