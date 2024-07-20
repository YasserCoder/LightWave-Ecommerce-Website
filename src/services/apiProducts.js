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
        category,
    };

    return result;
}
export async function getProducts(category) {
    let prodsId = [];
    async function getCategory(id) {
        let { data, error } = await supabase
            .from("category")
            .select("id,product(id)")
            .eq("parentId", id);
        if (error) {
            console.error(error.message);
            throw new Error("get Category could not be loaded");
        }

        for (let item of data) {
            if (item.product.length !== 0) {
                for (let prod of item.product) {
                    prodsId.push(prod);
                }
            }
            await getCategory(item.id);
        }
    }
    if (category === "all" || category === "shop") {
        let { data, error } = await supabase.from("product").select("id");
        if (error) {
            console.error(error);
            throw new Error("Products could not be loaded");
        }
        prodsId = [...data];
    } else {
        let { data, error } = await supabase
            .from("category")
            .select("id,product(id)")
            .eq("name", category);
        if (error) {
            console.error(error.message);
            throw new Error("Products could not be loaded");
        }
        for (let item of data) {
            if (item.product.length !== 0) {
                for (let prod of item.product) {
                    prodsId.push(prod);
                }
            }
            await getCategory(item.id);
        }
    }

    return prodsId;
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
