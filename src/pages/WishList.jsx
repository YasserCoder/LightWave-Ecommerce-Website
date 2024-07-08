import { Link } from "react-router-dom";
import { useGetLikedItems } from "../hook/wishlist/useGetLikedItems";
import { useUser } from "../hook/auth/useUser";

import Path from "../ui/Path";
import Loader from "../ui/Loader";
import ProdCard from "../ui/ProdCard";

import { TbHeartX } from "react-icons/tb";

function WishList() {
    const { isLoading: isConnecting, user } = useUser();
    const { isLoading, wishlistItems } = useGetLikedItems(user?.id);

    if (isConnecting || isLoading) {
        return <Loader />;
    }

    if (user?.role !== "authenticated") {
        return (
            <div className="py-36 flex items-center justify-center container">
                <p className="text-3xl text-center font-semibold">
                    <Link to={"/login"} className="underline text-bluegreen">
                        Login
                    </Link>{" "}
                    to get access to this page
                </p>
            </div>
        );
    }

    return (
        <div className="py-4 container flex flex-col gap-y-10">
            <Path dest={["wishlist"]} />
            {!wishlistItems.length && <EmptyWishList />}
            {wishlistItems.length > 0 && (
                <div className="grid grid-cols-220 gap-5 mb-10 lg:mb-16">
                    {wishlistItems.map((item) => {
                        return (
                            <ProdCard
                                id={item.productId}
                                key={item.productId}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

function EmptyWishList() {
    return (
        <div className="flex flex-col justify-center items-center gap-y-5">
            <TbHeartX className="size-[160px] text-bluegreen opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5 text-center">
                your Wish list is empty
            </h3>
            <p className="max-w-[170px] text-center">
                go to shop page and like some products
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
export default WishList;
