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

export async function getProducts({
    category,
    status,
    sortBy,
    page,
    pageSize,
    searchQuery,
}) {
    let query;
    if (category === "all" || category === "shop") {
        query = supabase
            .from("product")
            .select("id,name,created_at,sale,price", { count: "exact" });
    } else {
        let categoryArr = [];
        let { data: categoryData, error: categoryError } = await supabase
            .from("category")
            .select("*");

        if (categoryError) {
            console.error(categoryError.message);
            throw new Error("Products could not be loaded");
        }
        let parentCategoryId = categoryData.find(
            (item) => item.name === category
        )?.id;
        categoryArr.push(parentCategoryId);
        findChildren(categoryData, parentCategoryId, categoryArr);

        query = supabase
            .from("product")
            .select("id,name,created_at,sale,price,categoryId", {
                count: "exact",
            })
            .in(
                "categoryId",
                categoryArr.map((catId) => catId)
            );
    }
    if (status === "sale") {
        query = query.gt("sale", 0).order("sale", { ascending: false });
    } else if (status === "latest") {
        query = query.order("created_at", { ascending: false });
    }
    if (sortBy !== "") {
        const [column, order] = sortBy.split("-");
        query = query.order(column, { ascending: order === "asc" });
    }
    if (page) {
        const from = (page - 1) * pageSize;
        const to = from + pageSize - 1;
        query = query.range(from, to);
    }
    if (searchQuery) {
        query = query.or(
            `name.ilike.%${searchQuery}%,brand.ilike.%${searchQuery}%`
        );
    }

    let { data, error, count } = await query;
    if (error) {
        console.error(error);
        throw new Error("Products could not be loaded");
    }

    return { data, count };
}

function findChildren(data, idParent, categoryArr) {
    for (const category of data) {
        if (category.parentId === idParent) {
            categoryArr.push(category.id);
            findChildren(data, category.id, categoryArr);
        }
    }
}
