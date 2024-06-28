import { Link } from "react-router-dom";

import Path from "../ui/Path";

import { BsCartX } from "react-icons/bs";
function Cart() {
    return (
        <div className="py-4 container flex flex-col gap-y-10">
            <Path dest={["cart"]} />
            <EmptyCart />
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

export default Cart;
