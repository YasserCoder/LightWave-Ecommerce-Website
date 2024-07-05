import { useState } from "react";
import { Link } from "react-router-dom";

import { useLogin } from "../hook/auth/useLogin";

import InputText from "../ui/InputText";
import Path from "../ui/Path";
import Button from "../ui/Button";
import Form from "../ui/Form";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading } = useLogin();
    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;
        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }
    return (
        <div className="container py-4">
            <Path dest={["login"]} />
            <Form title={"login"}>
                <InputText
                    label="email"
                    type="email"
                    value={email}
                    handleChange={setEmail}
                />
                <InputText
                    label="password"
                    type="password"
                    value={password}
                    handleChange={setPassword}
                />
                <span className="text-bluegreen font-medium self-end mr-1 -mt-7">
                    <Link>Recover password</Link>
                </span>
                <div className="self-start">
                    <Button
                        btnstyle=" px-[28px] rounded-1 "
                        handle={handleSubmit}
                        state={isLoading}
                        submit={true}
                    >
                        Login
                    </Button>
                </div>
                <p className="text-sm text-[#828282] self-start">
                    Don`t have an account yet? &nbsp;
                    <span>
                        <Link to={"/register"} className="text-bluegreen">
                            Sign up
                        </Link>
                    </span>
                </p>
            </Form>
        </div>
    );
}

export default Login;
