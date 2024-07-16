import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../hook/auth/useUser";
import { useAddOrder } from "../hook/useAddOrder";
import { useDeleteCart } from "../hook/cart/useDeleteCart";
import { useDeleteLocalCart } from "../hook/cart/useDeleteLocalCart";
import { calculateNewPrice, isWhitespace } from "../utils/helpers";
import {
    DESK_PRICE,
    FREE_DELIVERY,
    HOME_PRICE,
    phoneRegex,
} from "../utils/constants";

import InputText from "../ui/InputText";
import Loader from "../ui/Loader";
import Button from "../ui/Button";

function Checkout() {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    useEffect(() => {
        if (!state) {
            navigate("/home");
        }
    });

    const { priceS, prodInfo, delivery, source, deliveryCost } = state || {};

    const price = Number(priceS);

    const { isLoading, user } = useUser();
    const { isInserting, addOrder } = useAddOrder();
    const { isDeleting, deleteCart } = useDeleteCart();
    const { isErasing, deleteLocalCart } = useDeleteLocalCart();

    const [deliveryMethode, setDeliveryMethode] = useState(
        delivery || "Stop Desk"
    );

    const [name, setName] = useState(user?.user_metadata?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.user_metadata?.phone || "");
    const [country, setCountry] = useState(user?.user_metadata?.country || "");
    const [city, setCity] = useState(user?.user_metadata?.city || "");
    const [adress, setAdress] = useState(user?.user_metadata?.adress || "");
    const [postCode, setPostCode] = useState(
        user?.user_metadata?.postCode || ""
    );
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setName(user?.user_metadata?.name || "");
        setEmail(user?.email || "");
        setPhone(user?.user_metadata?.phone || "");
        setPostCode(user?.user_metadata?.postCode || "");
        setAdress(user?.user_metadata?.adress || "");
        setCity(user?.user_metadata?.city || "");
        setCountry(user?.user_metadata?.country || "");
    }, [user]);

    useEffect(() => {
        if (deliveryCost === "free" || price > FREE_DELIVERY) {
            setTotalAmount(price);
        } else {
            if (deliveryMethode === "Stop Desk") {
                setTotalAmount(price + DESK_PRICE);
            } else {
                setTotalAmount(price + HOME_PRICE);
            }
        }
    }, [deliveryMethode, price, deliveryCost]);

    function handleOrder() {
        if (!name || !phone || !country || !city) {
            setError("fill all the nessecary cases");
            return;
        }
        if ((!adress || !postCode) && deliveryMethode === "Door Step") {
            setError("fill the nessecary cases for delivery");
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
        if (postCode !== "" && isNaN(postCode)) {
            setError("invalide Post Code");
            return;
        }
        let orderData = {
            deliveryPlace: deliveryMethode,
            status: "pending",
            totalAmount,
            customerEmail: email,
            customerName: name,
            customerPhone: phone,
            note,
            shippingAdress: `${country},${city},${adress}-${postCode}-`,
        };
        addOrder(
            { orderData, prodInfo },
            {
                onSuccess: async () => {
                    if (source === "cart") {
                        if (user?.role === "authenticated") {
                            deleteCart(user?.id);
                        } else {
                            deleteLocalCart();
                        }
                    }
                    navigate("/home");
                },
            }
        );
    }

    if (isLoading) return <Loader />;
    return (
        <div className="py-8 container flex flex-col items-center gap-y-10 lg:items-start lg:flex-row lg:justify-between xl:gap-x-12">
            <form className="flex flex-col w-full items-center border border-[#BDBDBD] rounded-md shadow-xl gap-12 lg:w-fit p-5 xs:p-7  md:py-10 sm:px-12 md:px-16 lg:px-20 ">
                <h1 className="uppercase font-black text-2xl mb-3">
                    Billing & Shipping
                </h1>
                <div className="flex flex-col items-center justify-center gap-8 md:justify-between md:flex-row md:flex-wrap lg:flex-col lg:flex-nowrap lg:justify-center  xl:justify-between xl:flex-row xl:flex-wrap">
                    <InputText
                        label="full name"
                        value={name}
                        handleChange={setName}
                        smallSize={true}
                    />
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
                    <InputText
                        label="Order Notes (optional)"
                        value={note}
                        handleChange={setNote}
                        smallSize={true}
                    />
                </div>
                {error && <p className=" text-red-600 ">{`**${error}`}</p>}
            </form>

            <div className="flex flex-col gap-y-7 items-center">
                <div className="bg-[#e5e5e5] rounded-md text-black shadow-lg p-8 xl:px-14 flex flex-col gap-y-6 xs:w-full sm:w-[450px] xl:w-[500px]">
                    <h3 className="font-bold text-2xl mx-auto uppercase">
                        your order
                    </h3>
                    <div className="flex flex-col gap-y-2">
                        <h6 className="capitalize font-semibold ">products</h6>
                        <div>
                            {prodInfo?.map((prod, i) => {
                                return (
                                    <div
                                        key={i}
                                        className="bg-white p-3 max-w-[450px] border border-[#BDBDBD]"
                                    >
                                        <span>{prod.name}</span>
                                        <span className="font-bold">{` (x${prod.qte})`}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <h6 className="capitalize font-semibold ">sub-total</h6>
                        <p className="text-lg font-bold">{`$${calculateNewPrice(
                            price,
                            0
                        )}`}</p>
                    </div>
                    <div className="h-[1px] w-full bg-[#BDBDBD]"></div>
                    <div className="flex flex-col gap-y-3">
                        <h6 className="capitalize font-semibold ">shipping</h6>
                        <div className="flex flex-col gap-y-2 justify-center items-center gap-x-[14px] lg:justify-start md:flex-row">
                            <p className="capitalize text-nowrap">
                                select delivery location :
                            </p>
                            <select
                                value={deliveryMethode}
                                onChange={(e) => {
                                    setDeliveryMethode(e.target.value);
                                }}
                                className="px-3 py-2 bg-secondary rounded-xl shadow-md cursor-pointer w-[200px] "
                            >
                                <option value={"Stop Desk"}>Stop Desk</option>
                                <option value={"Door Step"}>Door Step</option>
                            </select>
                        </div>
                        <div className="flex items-center mt-2 gap-x-2 justify-center lg:justify-start">
                            <input
                                type="checkbox"
                                checked={true}
                                disabled={true}
                                className="size-4 disabled:text-white"
                            />
                            <label className="">Payment on delivery</label>
                        </div>
                    </div>
                    <div className="h-[1px] w-full bg-[#BDBDBD]"></div>
                    <div className="flex justify-between items-center">
                        <h6 className="capitalize font-bold text-xl">total</h6>
                        <p className="text-2xl font-bold text-bluegreen">
                            {`$${calculateNewPrice(totalAmount, 0)}`}
                        </p>
                    </div>
                </div>
                <p className="text-grey max-w-[450px] text-sm">
                    Your personal data will be used to process your order and
                    support your experience on this website with full respect
                    for privacy
                </p>
                <Button
                    handle={handleOrder}
                    btnstyle=" w-full flex justify-center capitalize text-lg font-semibold hover:bg-hovercol hover:text-bluegreen disabled:bg-grey disabled:text-black"
                    state={
                        isInserting ||
                        isDeleting ||
                        isErasing ||
                        !name ||
                        !phone ||
                        !country ||
                        !city
                    }
                >
                    ordre now
                </Button>
            </div>
        </div>
    );
}

export default Checkout;
