import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import Loader from "../ui/Loader";
import Path from "../ui/Path";

function Profile() {
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
        <div className="py-4 container ">
            <Path dest={["profile"]} />
        </div>
    );
}

export default Profile;
