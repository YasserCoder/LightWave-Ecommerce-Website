import { useState } from "react";
import { Link } from "react-router-dom";

import { useSignUp } from "../hook/useSignUp";

import InputText from "../ui/InputText";
import Path from "../ui/Path";
import Form from "../ui/Form";
import Button from "../ui/Button";

const phoneRegex =
    /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const isWhitespace = (str) => /^\s*$/.test(str);

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [error, setError] = useState("");

    const { signup, isLoading } = useSignUp();
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !password || !phone || !email) {
            setError("fill all the cases");
            return;
        }
        if (isWhitespace(name) || !isNaN(name) || name.length < 6) {
            setError("Invalide name");
            return;
        }

        if (!phoneRegex.test(phone)) {
            setError("Invalid phone number");
            return;
        }
        if (password !== cpassword) {
            setError("Passwords do not match");
            return;
        }

        signup(
            { email, password, name, phone },
            {
                onSettled: () => {
                    setName("");
                    setPassword("");
                    setPhone("");
                    setEmail("");
                    setCpassword("");
                },
            }
        );
    }
    return (
        <div className="container py-4">
            <Path dest={["sign up"]} />
            <Form title={"sign up"}>
                <InputText
                    label="full name"
                    value={name}
                    handleChange={setName}
                />
                <InputText
                    label="email"
                    type="email"
                    value={email}
                    handleChange={setEmail}
                />
                <InputText
                    label="Phone Number"
                    value={phone}
                    handleChange={setPhone}
                />
                <InputText
                    label="password"
                    type="password"
                    value={password}
                    handleChange={setPassword}
                />
                <InputText
                    label="Confirm password"
                    type="password"
                    value={cpassword}
                    handleChange={setCpassword}
                />
                {error && (
                    <p className="self-start text-red-600 ">{`**${error}`}</p>
                )}
                <div className="self-start">
                    <Button
                        btnstyle=" px-[28px] rounded-1"
                        handle={handleSubmit}
                        state={isLoading}
                        submit={true}
                    >
                        Sign up
                    </Button>
                </div>
                <p className="text-sm text-[#828282] self-start">
                    Already have an account ? &nbsp;
                    <span>
                        <Link to={"/login"} className="text-bluegreen">
                            Login
                        </Link>
                    </span>
                </p>
            </Form>
        </div>
    );
}

export default Register;
