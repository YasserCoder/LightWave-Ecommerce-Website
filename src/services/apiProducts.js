import supabase from "./supabase";

export async function getProductInfo(prodId) {
    let { data, error } = await supabase
        .from("product")
        .select(
            "*,imgs:prodImage(imgUrl,imgAlt),specifications:prodSpecifications(key,value),inWishlist:wishlist(productId)"
        )
        .eq("id", prodId)
        .single();
    if (error) {
        console.error(error);
        throw new Error("Product could not be loaded");
    }

    const category = await getCategoryPath(data.categoryId);

    const result = {
        ...data,
        category: category,
    };

    return result;
}

async function getCategoryPath(prodId) {
    const catsPath = [];

    async function getCategory(id) {
        let { data, error } = await supabase
            .from("category")
            .select("*")
            .eq("id", id)
            .single();
        if (error) {
            console.error(error);
            throw new Error("Categories's path could not be loaded");
        }

        catsPath.push(data.name);
        if (data.parentId !== null) {
            await getCategory(data.parentId);
        }
    }

    await getCategory(prodId);

    return catsPath.reverse();
}

export async function getProductsListe(liste) {
    let cartItems = [];
    for (let element of liste) {
        let { data, error } = await supabase
            .from("product")
            .select("*,imgs:prodImage(imgUrl,imgAlt)")
            .eq("id", element.productId)
            .single();
        if (error) {
            console.error(error);
            throw new Error("Product could not be loaded");
        }
        cartItems.push({ product: data, quantity: element.quantity });
    }
    return cartItems;
}

// async function getSpecifications(prodId) {
//     let { data, error } = await supabase
//         .from("prodSpecifications")
//         .select("key,value")
//         .eq("productId", prodId);
//     if (error) {
//         console.error(error);
//         throw new Error("Specifications could not be loaded");
//     }

//     let result = {};
//     let obj = {};
//     Object.keys(data).map((key) => {
//         obj = data[key];

//         result[obj.key] = obj.value;
//     });
//     return result;
// }

// async function getImages(prodId) {
//     let { data, error } = await supabase
//         .from("prodImage")
//         .select("imgUrl,imgAlt")
//         .eq("productId", prodId);
//     if (error) {
//         console.error(error);
//         throw new Error("Images could not be loaded");
//     }

//     return data;
// }
