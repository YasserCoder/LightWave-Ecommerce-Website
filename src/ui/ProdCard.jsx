import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { calculateNewPrice } from "../utils/helpers";
import { useProductDetails } from "../hook/products/useProductDetails";
import { useUser } from "../hook/auth/useUser";
import { useAddCartItem } from "../hook/cart/useAddCartItem";
import { useAddLocalCartItem } from "../hook/cart/useAddLocalCartItem";

import LikeBtn from "./LikeBtn";
import Loader from "./Loader";

import { FaCartPlus } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";

import newicon from "../assets/new.png";
function ProdCard({ latest = false, id }) {
    const { isLoading: isConnecting, user } = useUser();
    const { isLoading, productInfo } = useProductDetails(id);
    const { name, price, sale, soldOut, category, imgs, inWishlist } = {
        ...productInfo,
    };
    const [like, setLike] = useState(inWishlist?.length > 0 || false);

    useEffect(() => {
        setLike(inWishlist?.length > 0);
    }, [inWishlist]);

    const { isInserting, addCartItem } = useAddCartItem();
    const { isAdding, addLocalCartItem } = useAddLocalCartItem();

    if (isLoading || isConnecting) return <Loader />;

    return (
        <div className={`shadow-lg flex flex-col relative z-0 `}>
            {soldOut && (
                <span className="absolute h-full w-full bg-secondary z-10 opacity-65"></span>
            )}
            <div className={`relative h-56 overflow-hidden `}>
                <Link
                    to={`/product/${id}`}
                    className="h-full flex justify-center"
                >
                    <img
                        src={imgs.at(0).imgUrl}
                        alt={imgs.at(0).imgAlt}
                        className="object-contain"
                    />
                </Link>
                {latest && (
                    <span className="absolute size-[40px] left-2 top-2">
                        <img src={newicon} alt="new" />
                    </span>
                )}
                {sale !== 0 && (
                    <span className="absolute w-[44px] h-6 text-sm flex justify-center items-center right-2 top-3 bg-red-600 text-white">
                        {`-${sale}%`}
                    </span>
                )}
                {soldOut && (
                    <span className="absolute uppercase w-full h-8 text-2xl flex justify-center items-center z-30 top-[60%] translate-y-[-60%] bg-grey text-secondary">
                        {`not available`}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1 px-4 py-2 border-y flex-grow ">
                <div className="flex gap-[2px] text-grey items-center text-xs capitalize whitespace-nowrap overflow-hidden text-ellipsis">
                    <p className="flex gap-1 items-center">
                        <span>
                            <IoIosPricetag />
                        </span>

                        <Link
                            to={`/shop/${category.join("/")}`}
                            className="capitalize hover:font-semibold duration-300"
                        >
                            {category.at(-1)}
                        </Link>
                    </p>
                </div>
                <Link
                    className=" font-semibold uppercase flex-grow line-clamp-2 hover:text-bluegreen duration-300"
                    title={name}
                    to={`/product/${id}`}
                >
                    {name}
                </Link>
                <div className="flex gap-2 items-baseline my-1">
                    <span className="font-bold text-bluegreen">{`$${calculateNewPrice(
                        price,
                        sale
                    )}`}</span>
                    {sale !== 0 && (
                        <span className="line-through text-xs text-grey">
                            {`$${calculateNewPrice(price, 0)}`}
                        </span>
                    )}
                </div>
            </div>
            <div className="px-9 sm:px-6 py-2 flex justify-between items-center">
                <Link
                    to={`/product/${id}`}
                    className=" text-bluegreen hover:scale-105 duration-300"
                >
                    <span>
                        <FaRegEye className="size-[27px]" />
                    </span>
                </Link>
                <span className="w-[2px] h-6 bg-grey"></span>
                <LikeBtn
                    size={27}
                    like={like}
                    setLike={setLike}
                    disabled={soldOut}
                    user={user}
                    productId={id}
                />
                <span className="w-[2px] h-6 bg-grey"></span>
                <button
                    className=" text-bluegreen hover:scale-105 duration-300 disabled:text-grey"
                    onClick={() => {
                        if (user?.role === "authenticated") {
                            addCartItem({
                                userId: user?.id,
                                productId: id,
                            });
                        } else {
                            addLocalCartItem({
                                productId: Number(id),
                                quantity: 1,
                            });
                        }
                    }}
                    disabled={isAdding || isInserting}
                >
                    <span>
                        <FaCartPlus className="size-[27px]" />
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ProdCard;
