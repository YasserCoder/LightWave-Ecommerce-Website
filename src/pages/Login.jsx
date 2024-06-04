import { Link } from "react-router-dom";
import InputText from "../ui/InputText";
import Path from "../ui/Path";
import { useState } from "react";
import Button from "../ui/Button";
import Form from "../ui/Form";

function Login() {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        setPwd("");
        setEmail("");
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
                    value={pwd}
                    handleChange={setPwd}
                />
                <span className="text-bluegreen font-medium self-end mr-1 -mt-7">
                    <Link>Recover password</Link>
                </span>
                <div className="self-start">
                    <Button
                        btnstyle=" px-[28px] rounded-1 "
                        handle={handleSubmit}
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
