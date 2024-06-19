import supabase from "./supabase";

export async function getCategories() {
    let { data, error } = await supabase
        .from("category")
        .select("*")
        .order("id");

    if (error) {
        console.error(error);
        throw new Error("Categories could not be loaded");
    }

    function findChildren(idParent) {
        let isEmpty = true;
        let result = {};

        for (const category of data) {
            if (category.parentId === idParent) {
                isEmpty = false;
                result[category.name] = findChildren(category.id);
            }
        }

        return isEmpty ? "" : result;
    }

    let result = {};

    for (const category of data) {
        if (category.parentId === null) {
            result[category.name] = findChildren(category.id);
        }
    }

    return result;
}
