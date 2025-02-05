import supabase from "./supabase";

export async function getCategories() {
    let { data, error } = await supabase
        .from("category")
        .select("*")
        .order("id");

    if (error) {
        throw new Error(error.message);
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

    data.filter((category) => category.parentId === null).map((category) => {
        result[category.name] = findChildren(category.id);
    });

    return result;
}
