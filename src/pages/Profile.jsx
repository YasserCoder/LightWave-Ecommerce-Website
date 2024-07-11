import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useUser } from "../hook/auth/useUser";
import { useUpdateUser } from "../hook/auth/useUpdateUser";
import { isWhitespace } from "../utils/helpers";
import { emailRegex, phoneRegex } from "../utils/constants";

import Loader from "../ui/Loader";
import Path from "../ui/Path";
import InputText from "../ui/InputText";
import Button from "../ui/Button";

function Profile() {
    const { isLoading, user } = useUser();
    const { updateUser, isUpdating } = useUpdateUser();

    const [name, setName] = useState(user?.user_metadata?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [country, setCountry] = useState(user?.user_metadata?.country || "");
    const [city, setCity] = useState(user?.user_metadata?.city || "");
    const [adress, setAdress] = useState(user?.user_metadata?.adress || "");
    const [postCode, setPostCode] = useState(
        user?.user_metadata?.postCode || ""
    );
    const [error, setError] = useState("");

    useEffect(() => {
        setName(user?.user_metadata?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.user_metadata?.phone || "");
        setPostCode(user?.user_metadata?.postCode || "");
        setAdress(user?.user_metadata?.adress || "");
        setCity(user?.user_metadata?.city || "");
        setCountry(user?.user_metadata?.country || "");
    }, [user]);

    if (isLoading) {
        return (
            <div className="h-[100vh] flex justify-center items-center">
                <Loader />
            </div>
        );
    }
    if (user?.role !== "authenticated") {
        return (
            <div className="py-36 flex items-center justify-center container">
                <p className="text-3xl text-center font-semibold">
                    <Link to={"/login"} className="underline text-bluegreen">
                        Login
                    </Link>{" "}
                    to get access to this page
                </p>
            </div>
        );
    }
    async function handleSubmit(e) {
        e.preventDefault();

        if (!name || !oldPassword || !phone || !email) {
            setError("fill all the nessecary cases");
            return;
        }
        if (isWhitespace(name) || !isNaN(name) || name.length < 6) {
            setError("Invalide name");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Invalid email");
            return;
        }
        if (
            user?.user_metadata?.pwd &&
            oldPassword !== user?.user_metadata?.pwd
        ) {
            setError("wrong old password");
            return;
        }
        if (!phoneRegex.test(phone)) {
            setError("Invalid phone number");
            return;
        }
        if (newPassword !== cpassword) {
            setError("Passwords do not match");
            return;
        }
        if (postCode !== "" && isNaN(postCode)) {
            setError("invalide Post Code");
            return;
        }
        let updateObj = {
            email,
            newPassword,
            name,
            phone,
            postCode,
            adress,
            country,
            city,
        };
        Object.keys(updateObj).forEach((item) => {
            if (
                updateObj[item] === "" ||
                updateObj[item] === user?.user_metadata[item]
            ) {
                delete updateObj[item];
            }
        });

        updateUser(updateObj);
    }

    return (
        <div className="py-4 container ">
            <Path dest={["profile"]} />
            <form className="flex flex-col w-full border border-[#BDBDBD] rounded-md shadow-xl gap-8 my-6 sm:my-12 lg:my-8 p-5 xs:p-7 sm:px-8 md:px-16 xl:px-20">
                <h1 className="uppercase font-black text-2xl mb-3">profile</h1>
                <div className="flex gap-y-8 flex-wrap gap-x-5 justify-between ">
                    <div className="flex flex-col gap-y-8">
                        <div className="flex flex-col gap-8">
                            <h4 className="capitalize font-bold text-lg mb-2">
                                login details
                            </h4>
                            <div className="flex gap-8 flex-wrap">
                                <InputText
                                    label="full name"
                                    value={name}
                                    handleChange={setName}
                                    smallSize={true}
                                />
                                <InputText
                                    label="old password"
                                    type="password"
                                    value={oldPassword}
                                    handleChange={setOldPassword}
                                    smallSize={true}
                                />
                            </div>
                            <div className="flex gap-8 flex-wrap">
                                <InputText
                                    label="new password"
                                    type="password"
                                    value={newPassword}
                                    handleChange={setNewPassword}
                                    smallSize={true}
                                />
                                <InputText
                                    label="repeat password"
                                    type="password"
                                    value={cpassword}
                                    handleChange={setCpassword}
                                    smallSize={true}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <h4 className="capitalize font-bold text-lg mb-2">
                                the contact person
                            </h4>
                            <div className="flex gap-8 flex-wrap">
                                <InputText
                                    label="email"
                                    type="email"
                                    value={email}
                                    handleChange={setEmail}
                                    smallSize={true}
                                />
                                <InputText
                                    label="Phone Number"
                                    value={phone}
                                    handleChange={setPhone}
                                    smallSize={true}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-8 ">
                        <h4 className="capitalize font-bold text-lg mb-2">
                            adress
                        </h4>
                        <div className="flex gap-8 flex-wrap">
                            <InputText
                                label="country"
                                value={country}
                                handleChange={setCountry}
                                smallSize={true}
                            />
                            <InputText
                                label="city / state"
                                value={city}
                                handleChange={setCity}
                                smallSize={true}
                            />
                        </div>
                        <div className="flex gap-8 flex-wrap">
                            <InputText
                                label="Post Code"
                                value={postCode}
                                handleChange={setPostCode}
                                smallSize={true}
                            />
                            <InputText
                                label="adress"
                                value={adress}
                                handleChange={setAdress}
                                smallSize={true}
                            />
                        </div>
                    </div>
                </div>
                {error && (
                    <p className="self-start text-red-600 ">{`**${error}`}</p>
                )}
                <div className="mt-5 mb-3">
                    <Button
                        btnstyle=" px-[28px] capitalize disabled:bg-grey disabled:text-black"
                        handle={handleSubmit}
                        submit={true}
                        state={isUpdating || oldPassword === ""}
                    >
                        save informations
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default Profile;
