import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../hook/auth/useUser";
import { useLogout } from "../hook/auth/useLogout";

import SearchBar from "./SearchBar";
import Button from "./Button";
import Loader from "./Loader";

import logo from "../assets/logo.png";
import { FaHeart, FaRegEye } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { useGetCartItems } from "../hook/cart/useGetCartItems";

function Navbar() {
    const { isLoading: isConnecting, user } = useUser();
    const { isLoading, cartItems } = useGetCartItems(user?.id);

    return (
        <nav className="container flex items-center justify-between py-5 border-b border-[#e1e1e1]">
            <div>
                <Link to="/">
                    <img src={logo} alt="logo" />
                </Link>
            </div>
            <div className="hidden md:block">
                <SearchBar />
            </div>
            <ul className="flex gap-4 items-center md:gap-2 lg:gap-4 ">
                <li className="group relative">
                    <UserIcon user={user} isConnecting={isConnecting} />
                    <span className="absolute w-0 h-[2px] -bottom-2 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
                </li>
                <li className="group relative">
                    <NavLink
                        to={"/wishlist"}
                        className="hover:text-bluegreen duration-700"
                    >
                        <FaHeart className="size-5" />
                    </NavLink>
                    <span className="absolute w-0 h-[2px] -bottom-2 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
                </li>
                <li className="group relative">
                    <NavLink
                        to={"/cart"}
                        className="hover:text-bluegreen duration-700 flex items-center"
                    >
                        <FaCartShopping className="size-5" />
                        <span className="text-xl">{`(${
                            isLoading || isConnecting ? "" : cartItems?.length
                        })`}</span>
                        {/* <span>{cartItems.}</span> */}
                    </NavLink>
                    <span className="absolute w-0 h-[2px] -bottom-2 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
                </li>
            </ul>
        </nav>
    );
}

function UserIcon({ isConnecting, user }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { pathname } = useLocation();
    const isActive =
        pathname.split("/").includes("login") ||
        pathname.split("/").includes("register") ||
        pathname.split("/").includes("profile");

    function handleUser(e) {
        e.stopPropagation();
        setOpen(!open);
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);
    return (
        <>
            <button
                className={`group-hover:text-bluegreen duration-700 ${
                    isActive ? "active" : ""
                }`}
                onClick={handleUser}
            >
                <FaUser className="size-5" />
            </button>
            {open && (
                <div
                    className="absolute top-10 z-30 -right-[70px] bg-[#e5e5e5] shadow-xl border-[#BDBDBD] rounded-md py-6 px-4 flex flex-col items-center gap-y-5 text-nowrap"
                    ref={menuRef}
                >
                    {isConnecting && <Loader />}
                    {user?.role === "authenticated" ? (
                        <AuthenicatedUser handleOpen={setOpen} user={user} />
                    ) : (
                        <AnonUser handleOpen={setOpen} />
                    )}
                </div>
            )}
        </>
    );
}

function AnonUser({ handleOpen }) {
    const navigate = useNavigate();
    return (
        <>
            <p className="font-semibold">Register for more benefits</p>
            <div className="flex items-center gap-x-4">
                <Button
                    btnstyle=" px-4 rounded-md"
                    handle={() => {
                        handleOpen(false);
                        navigate("/login");
                    }}
                >
                    Login
                </Button>
                <Button
                    btnstyle=" px-4 rounded-md whitespace-nowrap"
                    handle={() => {
                        handleOpen(false);
                        navigate("/register");
                    }}
                >
                    Sign up
                </Button>
            </div>
        </>
    );
}
function AuthenicatedUser({ handleOpen, user }) {
    const navigate = useNavigate();
    const { logout } = useLogout();
    return (
        <>
            <p className="font-semibold">{`Hi, ${
                user.user_metadata?.name?.split(" ")[0]
            }`}</p>
            <div className="flex items-center gap-x-4">
                <Button
                    btnstyle=" px-4 rounded-md flex gap-x-2 items-center capitalize"
                    handle={() => {
                        handleOpen(false);
                        navigate("/profile");
                    }}
                >
                    <FaRegEye />
                    <span>profile</span>
                </Button>
                <button
                    className="bg-red-600 flex gap-x-2 items-center capitalize py-[10px] px-4 rounded-md text-secondary  cursor-pointer active:translate-y-1 active:shadow-lg"
                    onClick={() => {
                        handleOpen(false);
                        logout();
                    }}
                >
                    <VscSignOut />
                    <span>logout</span>
                </button>
            </div>
        </>
    );
}

export default Navbar;
