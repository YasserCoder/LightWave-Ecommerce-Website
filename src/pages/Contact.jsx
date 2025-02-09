import { useEffect, useState } from "react";

import { useSendMessage } from "../hook/useSendMessage";
import { useUser } from "../hook/auth/useUser";
import { isWhitespace } from "../utils/helpers";
import { emailRegex, phoneRegex } from "../utils/constants";

import Path from "../ui/Path";
import InputText from "../ui/InputText";
import Button from "../ui/Button";
import Services from "../ui/Services";

import { FaHeadset, FaPhone, FaRegEnvelope } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const items = {
    "our number": {
        icon: <FaPhone />,
        desc: "+213111111111",
    },
    "our email": {
        icon: <FaRegEnvelope />,
        desc: "lightwave08@gmail.com",
    },
    "our adress": {
        icon: <FaLocationDot />,
        desc: "Algiers,Algeria-16000",
    },
    "support 24/7": {
        icon: <FaHeadset />,
        desc: "contact us",
    },
};

function Contact() {
    return (
        <div className="py-4  container flex flex-col gap-y-[40px] md:gap-y-[60px] xl:gap-y-[90px]">
            <Path dest={["contact us"]} />
            <Services items={items} />
            <div className="flex flex-col gap-y-4 justify-center items-center md:flex-row bg-[#f9f9f9] p-4 md:p-8 md:pr-0 rounded-lg">
                <Form />
                <Location />
            </div>
        </div>
    );
}

function Location() {
    return (
        <iframe
            role="map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25580.110781994143!2d3.071246290087893!3d36.73423535929684!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fad6795639515%3A0x4ba4b4c9d0a7e602!2sAlgiers!5e0!3m2!1sen!2sdz!4v1719164984223!5m2!1sen!2sdz"
            className="h-[300px] max-w-[500px] md:h-[400px] lg:h-[500px] w-full md:max-w-none rounded-lg md:-translate-x-10"
            allowFullScreen={true}
            loading="lazy"
        ></iframe>
    );
}

function Form() {
    const { isLoading, user } = useUser();
    const [name, setName] = useState(user?.user_metadata?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { isSending, sendMessage } = useSendMessage();
    useEffect(() => {
        setName(user?.user_metadata?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.user_metadata?.phone || "");
    }, [user]);
    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !message || !phone || !email) {
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
        if (!phoneRegex.test(phone)) {
            setError("Invalid phone number");
            return;
        }
        let messageData = {
            email: email,
            name: name,
            phone: phone,
            content: message,
        };
        sendMessage(messageData, {
            onSettled: () => {
                setName("");
                setPhone("");
                setEmail("");
                setMessage("");
                setError("");
            },
        });
    }
    return (
        <form className="flex flex-col items-center  rounded-md bg-white shadow-xl gap-8 w-full max-w-[500px] md:max-w-none md:w-fit p-4 xs:p-7 sm:px-12 md:px-14 xl:px-28">
            <div className="mb-3 flex flex-col items-center gap-y-2">
                <h1 className="uppercase font-black text-2xl">Get In Touch</h1>
                <p className="text-grey">send us a message</p>
            </div>
            <InputText label="full name" value={name} handleChange={setName} />
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
            <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="py-2 pl-3 border w-[250px] sm:w-72 rounded-md  outline-none bg-transparent border-[#e5e5e5]"
                rows={5}
            />
            {error && <p className=" text-red-600 ">{`**${error}`}</p>}
            <div className="">
                <Button
                    btnstyle=" px-[28px] rounded-xl capitalize hover:bg-hovercol hover:text-bluegreen disabled:bg-grey disabled:text-black"
                    handle={handleSubmit}
                    submit={true}
                    state={isSending || isLoading}
                >
                    send
                </Button>
            </div>
        </form>
    );
}

export default Contact;
