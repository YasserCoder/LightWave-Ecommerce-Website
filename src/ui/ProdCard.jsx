import { FaAngleRight, FaCartPlus } from "react-icons/fa6";
import chandlier from "../assets/chandlier.png";
import newicon from "../assets/new.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import LikeBtn from "./LikeBtn";
import { calculateNewPrice } from "../utils/helpers";
import { FaRegEye } from "react-icons/fa";
function ProdCard({
    name = "Product name",
    price = 120,
    sale = 0,
    latest = false,
    soldOut = false,
}) {
    const [like, setLike] = useState(false);
    function handleChecked(e) {
        setLike(e.target.checked);
    }
    return (
        <div className={`shadow-lg flex flex-col relative  `}>
            {soldOut && (
                <span className="absolute h-full w-full bg-secondary z-20 opacity-65"></span>
            )}
            <div className={`relative h-56 overflow-hidden `}>
                <Link to={"/product/1"} className="h-full flex justify-center">
                    <img
                        src={chandlier}
                        alt="chandlier"
                        className="object-contain"
                    />
                </Link>

                {/* {!soldOut && (
                    <span className="absolute right-3 bottom-3">
                        <LikeBtn
                            size={25}
                            like={like}
                            setLike={handleChecked}
                        />
                    </span>
                )} */}
                {/* <Link to={"/product/1"} className="absolute left-3 bottom-3 ">
                    <FaRegEye className="size-[25px] " />
                </Link> */}
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
                    <span>lamps</span>
                    <span className="text-xs">
                        <FaAngleRight />
                    </span>
                    <span>bureau</span>
                </div>
                <Link
                    className=" font-semibold uppercase flex-grow line-clamp-2 hover:text-bluegreen duration-300"
                    title={name}
                    to={"/product/1"}
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
                {/* <Link className="flex justify-center items-center gap-3 text-xl text-bluegreen hover:scale-105 duration-300">
                    <span>
                        <FaCartPlus />
                    </span>

                    <span className="capitalize">add to cart</span>
                </Link> */}

                <Link
                    to={"/product/1"}
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
                    setLike={handleChecked}
                    disabled={soldOut}
                />
                <span className="w-[2px] h-6 bg-grey"></span>
                <Link className=" text-bluegreen hover:scale-105 duration-300">
                    <span>
                        <FaCartPlus className="size-[27px]" />
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default ProdCard;
