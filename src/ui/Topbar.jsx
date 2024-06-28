import { Link } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { FaPhone, FaRegClock } from "react-icons/fa";

function Topbar() {
    const { user } = useUser();

    return (
        <div className="bg-primary text-secondary w-full py-4">
            <div className="container flex flex-col items-center gap-y-2 sm:flex-row sm:justify-between">
                <div className="flex gap-4 items-center text-sm sm:text-base md:gap-8">
                    <div className="flex items-center gap-1 md:gap-2">
                        <FaRegClock />
                        <span>8:00-20:00</span>
                    </div>
                    <div className="flex items-center gap-1 md:gap-2">
                        <FaPhone />
                        <span>0524245824 | 0661637497</span>
                    </div>
                </div>

                <div className="flex gap-3 items-center font-bold md:text-lg md:font-medium">
                    {user?.role === "authenticated" && <span>new</span>}
                    <Link to={"/login"} className="hover:underline">
                        Login
                    </Link>
                    <span>|</span>
                    <Link to={"/register"} className="hover:underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Topbar;
