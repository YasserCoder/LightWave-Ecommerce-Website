import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { calculateNewPrice } from "../../utils/helpers";
import { DESK_PRICE, FREE_DELIVERY, HOME_PRICE } from "../../utils/constants";

import Button from "../Button";
import Quantity from "../Quantity";
import Path from "../Path";

import { FaRegTrashCan } from "react-icons/fa6";
import { BsArrowLeft, BsArrowRepeat, BsCartX } from "react-icons/bs";

function CartBody({
    cartItems,
    user,
    isUpdating,
    updateCartItem,
    isDeleting,
    deleteCartItem,
}) {
    const [updatedItems, setUpdatedItems] = useState({});
    const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

    useEffect(() => {
        for (let id of Object.keys(updatedItems)) {
            if (updatedItems[id] !== null) {
                setIsUpdateDisabled(false);
                break;
            } else {
                setIsUpdateDisabled(true);
            }
        }
    }, [updatedItems]);

    return (
        <div className="py-4 container flex flex-col gap-y-10">
            <Path dest={["cart"]} />
            {!cartItems.length && <EmptyCart />}
            {cartItems.length > 0 && (
                <>
                    <div className="flex flex-col gap-y-4 w-full ">
                        {cartItems.map((item, i) => {
                            return (
                                <CartItem
                                    item={item}
                                    key={i}
                                    setUpdatedItems={setUpdatedItems}
                                    user={user}
                                    deleteCartItem={deleteCartItem}
                                    isDeleting={isDeleting}
                                />
                            );
                        })}
                    </div>
                    <div className="flex flex-col-reverse gap-y-2 justify-center sm:flex-row items-center sm:justify-between pb-7 border-b-2 lg:justify-center lg:gap-x-5">
                        <Link
                            to={"/shop"}
                            className="bg-bluegreen py-[10px] text-secondary active:translate-y-1 active:shadow-lg px-4 xs:px-7 capitalize flex gap-2 items-center xs:text-lg xs:font-semibold"
                        >
                            <BsArrowLeft />
                            <span>continue your shopping</span>
                        </Link>
                        <Button
                            btnstyle=" px-4 xs:px-7 capitalize flex gap-2 items-center xs:text-lg xs:font-semibold disabled:bg-grey disabled:text-black"
                            handle={() => {
                                Object.keys(updatedItems).map((productId) => {
                                    if (updatedItems[productId] !== null) {
                                        if (user?.role === "authenticated") {
                                            updateCartItem(
                                                {
                                                    userId: user?.id,
                                                    productId,
                                                    newQte: updatedItems[
                                                        productId
                                                    ],
                                                },
                                                {
                                                    onSuccess: () => {
                                                        setUpdatedItems({});
                                                        setIsUpdateDisabled(
                                                            true
                                                        );
                                                    },
                                                }
                                            );
                                        } else {
                                            updateCartItem(
                                                Number(productId),
                                                Number(updatedItems[productId])
                                            );
                                            setUpdatedItems({});
                                            setIsUpdateDisabled(true);
                                        }
                                    }
                                });
                            }}
                            state={isUpdateDisabled || isUpdating}
                        >
                            <BsArrowRepeat />
                            <span>update cart</span>
                        </Button>
                    </div>
                    <OrderInfo cartItems={cartItems} />
                </>
            )}
        </div>
    );
}
function OrderInfo({ cartItems }) {
    const navigate = useNavigate();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscounts, setTotalDiscounts] = useState(0);

    const [deliveryMethode, setDeliveryMethode] = useState("Stop Desk");
    const [paymentMethode, setPaymentMethode] = useState("Hand By Hand");
    const [deliveryCost, setDeliveryCost] = useState(5);

    const [prodInfo, setProdInfo] = useState([]);

    useEffect(() => {
        setTotalPrice(0);
        setTotalDiscounts(0);
        setProdInfo([]);
        cartItems?.map((item) => {
            setTotalPrice((prevAmount) => {
                return prevAmount + item.product.price * item.quantity;
            });
            setTotalDiscounts((prevAmount) => {
                const sum = item.product.price * item.quantity;
                return (
                    prevAmount +
                    (sum -
                        parseFloat(calculateNewPrice(sum, item.product.sale)))
                );
            });
            setProdInfo((prevItems) => {
                return [
                    ...prevItems,
                    {
                        id: item.product.id,
                        name: item.product.name,
                        qte: item.quantity,
                        price: Number(
                            calculateNewPrice(
                                item.product.price * item.quantity,
                                item.product.sale
                            )
                        ),
                    },
                ];
            });
        });
    }, [cartItems]);

    useEffect(() => {
        if (totalPrice - totalDiscounts > FREE_DELIVERY) {
            setDeliveryCost(0);
        } else {
            if (deliveryMethode === "Stop Desk") {
                setDeliveryCost(DESK_PRICE);
            } else {
                setDeliveryCost(HOME_PRICE);
            }
        }
    }, [totalDiscounts, totalPrice, deliveryMethode]);

    const handleCheckout = () => {
        const subTotal = Number(totalPrice - totalDiscounts);
        const data = {
            priceS: subTotal,
            prodInfo,
            delivery: deliveryMethode,
            source: "cart",
            deliveryCost: "normal",
        };
        navigate("/checkout", { state: data });
    };

    return (
        <div className="flex flex-col gap-y-7 justify-center items-center lg:items-start lg:flex-row lg:justify-between mb-8">
            <div className="bg-[#e5e5e5] rounded-md shadow-lg p-8 xl:px-14 flex flex-col gap-y-3 w-fit">
                <div className="flex flex-col gap-y-2 gap-x-[14px] justify-center lg:justify-start md:flex-row items-center">
                    <p className="font-semibold capitalize">
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
                <div className="flex flex-col gap-2 justify-center lg:justify-start md:flex-row items-center">
                    <p className="font-semibold capitalize">
                        select payment methode :
                    </p>
                    <select
                        value={paymentMethode}
                        onChange={(e) => {
                            setPaymentMethode(e.target.value);
                        }}
                        className="px-3 py-2 bg-secondary rounded-xl shadow-md cursor-pointer w-[200px] "
                    >
                        <option value={"Hand By Hand"}>Hand By Hand</option>
                        <option value={"Cards/Paypal"}>Cards/Paypal</option>
                    </select>
                </div>
                {paymentMethode === "Cards/Paypal" && (
                    <p className="mt-5 text-red-600 sm:max-w-[390px] xl:max-w-none">
                        Note : that payment methode is not available for now
                    </p>
                )}
                <p className="mt-5 text-black sm:max-w-[390px] xl:max-w-none">
                    * You can read our{" "}
                    <Link
                        to={"/about/delivery"}
                        className="capitalize text-bluegreen font-semibold"
                    >
                        Delivery
                    </Link>{" "}
                    and{" "}
                    <Link
                        to={"/about/payment"}
                        className="capitalize text-bluegreen font-semibold"
                    >
                        Payment
                    </Link>{" "}
                    policies for more informations{" "}
                </p>
            </div>
            <div className="bg-[#e5e5e5] rounded-md shadow-lg p-8 xl:px-14 flex flex-col gap-y-6 xs:w-full sm:w-[450px] xl:w-[500px]">
                <h3 className="font-bold text-xl capitalize">
                    about the order
                </h3>
                <div className="flex flex-col gap-y-3">
                    <div className="flex justify-between items-center">
                        <p className="font-light">{`Products(${cartItems?.length})`}</p>
                        <p className="font-semibold">{`$${calculateNewPrice(
                            totalPrice,
                            0
                        )}`}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-light">{`Total Discounts :`}</p>
                        <p className="font-semibold text-red-600">{`-$${calculateNewPrice(
                            totalDiscounts,
                            0
                        )}`}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <p className="font-light">{`Cost of delivery :`}</p>
                        <p
                            className={`font-semibold ${
                                deliveryCost === 0 ? "text-bluegreen" : ""
                            }`}
                        >{`${
                            deliveryCost === 0 ? "For Free" : `$${deliveryCost}`
                        }`}</p>
                    </div>
                </div>
                <div className="flex justify-between items-baseline">
                    <p className="font-semibold">{`Total :`}</p>
                    <p className={`font-bold text-xl`}>{`$${calculateNewPrice(
                        totalPrice + deliveryCost - totalDiscounts,
                        0
                    )}`}</p>
                </div>
                <div className="w-fit self-center mt-2">
                    <Button
                        btnstyle=" capitalize px-5 rounded-md "
                        handle={handleCheckout}
                    >
                        proceed to checkout
                    </Button>
                </div>
            </div>
        </div>
    );
}

function CartItem({ item, user, setUpdatedItems, isDeleting, deleteCartItem }) {
    const [qte, setQte] = useState(item.quantity);
    useEffect(() => {
        setQte(item.quantity);
    }, [item.quantity]);
    return (
        <div className="flex relative flex-col lg:flex-row gap-5 overflow-hidden border border-[#BDBDBD] p-6 rounded-md shadow-md">
            <div className="flex gap-[10px] items-center">
                <div className="flex justify-center items-center">
                    {item.product.imgs.length > 0 && (
                        <img
                            src={item.product.imgs[0].imgUrl}
                            alt={item.product.imgs[0].imgAlt}
                            className="object-contain h-28 min-w-24 xs:min-w-36 sm:min-w-40 xl:min-w-48"
                        />
                    )}
                </div>
                <p className="text-xl font-bold lg:max-w-[400px] xl:max-w-[500px]">
                    <Link
                        to={`/product/${item.product.id}`}
                        className="hover:text-bluegreen"
                    >
                        {item.product.name}
                    </Link>
                </p>
            </div>
            <div className="flex justify-center gap-6 lg:justify-between flex-grow items-center flex-wrap">
                <div className="flex flex-col">
                    <p className="font-semibold text-xl">
                        {`$${calculateNewPrice(
                            item.product.price,
                            item.product.sale
                        )}`}
                    </p>
                    {item.product.sale > 0 && (
                        <p className="line-through text-grey">
                            {`$${calculateNewPrice(item.product.price, 0)}`}
                        </p>
                    )}
                </div>
                <Quantity
                    qte={qte}
                    setQte={setQte}
                    id={item.product.id}
                    originalQte={item.quantity}
                    action={setUpdatedItems}
                />
                <div className="flex items-center gap-5 ">
                    <p className="capitalize text-lg font-semibold sm:hidden">
                        total price :
                    </p>
                    <div className="flex gap-x-1 items-baseline sm:flex-col">
                        <p className="font-bold text-2xl text-bluegreen">
                            {`$${calculateNewPrice(
                                item.product.price * qte,
                                item.product.sale
                            )}`}
                        </p>
                        {item.product.sale > 0 && (
                            <p className="line-through text-grey ">
                                {`$${calculateNewPrice(
                                    item.product.price * qte,
                                    0
                                )}`}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    className="absolute top-2 right-2 z-20 text-red-600 "
                    disabled={isDeleting}
                    onClick={() => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Delete item from the cart !",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#d33",
                            cancelButtonColor: "#3085d6",
                            confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                if (user?.role === "authenticated") {
                                    deleteCartItem({
                                        userId: user?.id,
                                        productId: item.product.id,
                                    });
                                } else {
                                    deleteCartItem(Number(item.product.id));
                                }
                            }
                        });
                    }}
                >
                    <FaRegTrashCan />
                </button>
            </div>
        </div>
    );
}

function EmptyCart() {
    return (
        <div className="flex flex-col justify-center items-center gap-y-5">
            <BsCartX className="size-[160px] text-bluegreen opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5">
                your cart is empty
            </h3>
            <p className="max-w-[150px] text-center">
                go to shop page and start shopping
            </p>
            <div className="py-4">
                <Link
                    to={"/shop"}
                    className="capitalize py-[10px] px-5 rounded-lg bg-bluegreen text-secondary"
                >
                    shop now{" "}
                </Link>
            </div>
        </div>
    );
}

export default CartBody;
