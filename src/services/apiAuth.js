import supabase from "./supabase";

export async function signup({ email, password, name, phone }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                authority: "user",
                phone,
                email,
                pwd: password,
            },
        },
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data: session } = await supabase.auth.getSession();
    if (!session.session) return null;

    const { data, error } = await supabase.auth.getUser();

    if (error) throw new Error(error.message);
    return data?.user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateUser({
    email,
    newPassword,
    name,
    phone,
    country,
    city,
    postCode,
    adress,
}) {
    const { data, error } = await supabase.auth.updateUser({
        email,
        password: newPassword,
        data: {
            name,
            phone,
            country,
            city,
            postCode,
            adress,
            email,
            pwd: newPassword,
        },
    });
    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }
    return data;
}
