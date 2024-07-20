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
export async function getProducts({ category, status, sortBy }) {
    let prodsId = [];
    async function getProductsByCategory(id) {
        let query = supabase
            .from("category")
            .select("id,product(id,name,created_at,sale,price)")
            .eq("parentId", id);
        let { data, error } = await query;
        if (error) {
            console.error(error.message);
            throw new Error("get Category could not be loaded");
        }

        for (let item of data) {
            if (item.product.length !== 0) {
                for (let prod of item.product) {
                    if (status === "sale") {
                        if (prod["sale"] > 0) {
                            prodsId = insertSorted(
                                prodsId,
                                prod,
                                "sale",
                                "desc"
                            );
                        }
                    } else if (status === "latest") {
                        prodsId = insertSorted(
                            prodsId,
                            prod,
                            "created_at",
                            "desc"
                        );
                    } else if (sortBy !== "") {
                        const [column, order] = sortBy.split("-");
                        prodsId = insertSorted(
                            prodsId,
                            prod,
                            column,
                            order,
                            column === "name"
                        );
                    } else {
                        prodsId.push(prod);
                    }
                }
            }
            await getProductsByCategory(item.id);
        }
    }
    if (category === "all" || category === "shop") {
        let query = supabase
            .from("product")
            .select("id,name,created_at,sale,price");

        if (sortBy !== "") {
            const [column, order] = sortBy.split("-");
            query = query.order(column, { ascending: order === "asc" });
        }
        if (status === "sale") {
            query = query.gt("sale", 0).order("sale", { ascending: false });
        } else if (status === "latest") {
            query = query.order("created_at", { ascending: false });
        }

        let { data, error } = await query;
        if (error) {
            console.error(error);
            throw new Error("Products could not be loaded");
        }
        prodsId = data;
    } else {
        let query = supabase
            .from("category")
            .select("id,product(id,name,created_at,sale,price)")
            .eq("name", category);
        let { data, error } = await query;
        if (error) {
            console.error(error.message);
            throw new Error("Products could not be loaded");
        }
        for (let item of data) {
            if (item.product.length !== 0) {
                for (let prod of item.product) {
                    if (status === "sale") {
                        if (prod["sale"] > 0) {
                            prodsId = insertSorted(
                                prodsId,
                                prod,
                                "sale",
                                "desc"
                            );
                        }
                    } else if (status === "latest") {
                        prodsId = insertSorted(
                            prodsId,
                            prod,
                            "created_at",
                            "desc"
                        );
                    } else if (sortBy !== "") {
                        const [column, order] = sortBy.split("-");
                        prodsId = insertSorted(
                            prodsId,
                            prod,
                            column,
                            order,
                            column === "name"
                        );
                    } else {
                        prodsId.push(prod);
                    }
                }
            }
            await getProductsByCategory(item.id);
        }
    }

    return prodsId;
}

function insertSorted(arr, item, key, order, string = false) {
    let index;
    if (string) {
        index = arr.findIndex((element) =>
            order === "asc"
                ? element[key].localeCompare(item[key]) < 0
                : element[key].localeCompare(item[key]) > 0
        );
        console.log("isString", order);
    } else {
        index = arr.findIndex((element) =>
            order === "asc"
                ? element[key] > item[key]
                : element[key] < item[key]
        );
    }

    if (index === -1) {
        arr.push(item);
    } else {
        arr.splice(index, 0, item);
    }

    return arr;
}
