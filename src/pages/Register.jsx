import { useState } from "react";
import InputText from "../ui/InputText";
import Path from "../ui/Path";
import Form from "../ui/Form";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pwd, setPwd] = useState("");
    const [cpwd, setCpwd] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        console.log("submit");
        setName("");
        setPwd("");
        setPhone("");
        setEmail("");
        setCpwd("");
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
                    value={pwd}
                    handleChange={setPwd}
                />
                <InputText
                    label="Confirm password"
                    type="password"
                    value={cpwd}
                    handleChange={setCpwd}
                />
                <div className="self-start">
                    <Button
                        btnstyle=" px-[28px] rounded-1"
                        handle={handleSubmit}
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
