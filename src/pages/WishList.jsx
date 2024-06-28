import { TbHeartX } from "react-icons/tb";
import Path from "../ui/Path";
import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import Loader from "../ui/Loader";

function WishList() {
    const { isLoading, user } = useUser();

    if (isLoading) {
        return (
            <div className="h-[100vh] flex justify-center items-center">
                <Loader />
            </div>
        );
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
            <Path dest={["wish List"]} />
            <EmptyWishList />
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
