import {
    FaAngleRight,
    FaCartPlus,
    FaHeart,
    FaRegEye,
    FaRegHeart,
} from "react-icons/fa6";
import chandlier from "../assets/chandlier.png";
import newicon from "../assets/new.png";
import { useState } from "react";
import { Link } from "react-router-dom";
function ProdCard({ name = "Product name", sale = 0, latest = false }) {
    const [like, setLike] = useState(false);
    return (
        <div className="shadow-lg flex flex-col">
            <div className="relative h-60 flex justify-center  overflow-hidden bg-white">
                <img
                    src={chandlier}
                    alt="chandlier"
                    className="object-contain bg-white"
                />

                <span
                    className="absolute right-3 bottom-3 cursor-pointer "
                    onClick={() => {
                        setLike(!like);
                    }}
                >
                    {like ? (
                        <FaHeart className="size-[30px] text-red-600" />
                    ) : (
                        <FaRegHeart className="size-[30px] text-grey" />
                    )}
                </span>
                {latest && (
                    <span className="absolute size-[40px] left-2 top-2">
                        <img src={newicon} alt="new" />
                    </span>
                )}
                {sale !== 0 && (
                    <span className="absolute w-[42px] h-6 text-sm flex justify-center items-center right-2 top-3 bg-red-600 text-white">
                        {`-${sale}%`}
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1 px-4 py-2 border-y flex-grow">
                <div className="flex gap-1 text-grey items-center capitalize">
                    <span>lamps</span>
                    <span className="text-sm">
                        <FaAngleRight />
                    </span>
                    <span>bureau</span>
                </div>
                <div className="text-xl font-semibold uppercase flex-grow">
                    {name}
                </div>
                <div className="flex gap-2 items-baseline my-1">
                    <span className="font-semibold text-lg text-bluegreen">
                        652.00$
                    </span>
                    {sale !== 0 && (
                        <span className="line-through text-sm text-grey">
                            700.00$
                        </span>
                    )}
                </div>
            </div>
            <div className="px-4 py-2 flex justify-center gap-3 ">
                <Link className="flex gap-2 items-center text-bluegreen hover:scale-105 duration-300">
                    <span>
                        <FaRegEye />
                    </span>
                    <span className="capitalize">View details</span>
                </Link>
                <span>|</span>
                <Link className="flex gap-2 items-center text-bluegreen hover:scale-105 duration-300">
                    <span>
                        <FaCartPlus />
                    </span>
                    <span className="capitalize">add to cart</span>
                </Link>
            </div>
        </div>
    );
}

export default ProdCard;
