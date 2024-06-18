import supabase from "./supabase";

export async function getProductInfo(prodId) {
    let { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", prodId);
    if (error) {
        console.error(error);
        throw new Error("Products could not be loaded");
    }
    const category = await getCategoryPath(data[0].categoryId);
    const specifications = await getSpecifications(data[0].id);
    const imgs = await getImages(data[0].id);

    const result = {
        ...data[0],
        category: category,
        specifications: specifications,
        imgs: imgs,
    };

    return result;
}

async function getCategoryPath(prodId) {
    const catsPath = [];

    async function getCategory(id) {
        let { data, error } = await supabase
            .from("category")
            .select("*")
            .eq("id", id);
        if (error) {
            console.error(error);
            throw new Error("Categories could not be loaded");
        }

        catsPath.push(data[0].name);
        if (data[0].parentId !== null) {
            await getCategory(data[0].parentId);
        }
    }

    await getCategory(prodId);

    return catsPath.reverse();
}

async function getSpecifications(prodId) {
    let { data, error } = await supabase
        .from("prodSpecifications")
        .select("key,value")
        .eq("productId", prodId);
    if (error) {
        console.error(error);
        throw new Error("Specifications could not be loaded");
    }

    let result = {};
    let obj = {};
    Object.keys(data).map((key) => {
        obj = data[key];

        result[obj.key] = obj.value;
    });
    return result;
}

async function getImages(prodId) {
    let { data, error } = await supabase
        .from("prodImage")
        .select("imgUrl,imgAlt")
        .eq("productId", prodId);
    if (error) {
        console.error(error);
        throw new Error("Imagess could not be loaded");
    }

    return data;
}
