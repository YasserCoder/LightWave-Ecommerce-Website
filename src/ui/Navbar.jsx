import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";
import { FaHeart } from "react-icons/fa";
import { FaCartShopping, FaUser } from "react-icons/fa6";

function Navbar() {
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
                    <NavLink
                        to={"/login"}
                        className="group-hover:text-bluegreen duration-700"
                    >
                        <FaUser className="size-5" />
                    </NavLink>
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
                        className="hover:text-bluegreen duration-700"
                    >
                        <FaCartShopping className="size-5" />
                    </NavLink>
                    <span className="absolute w-0 h-[2px] -bottom-2 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
