import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaPhone,
    FaRegClock,
    FaRegEnvelope,
    FaTiktok,
} from "react-icons/fa";
import logo from "../assets/footerlogo160.png";
import Icon from "./Icon";

function Footer() {
    return (
        <footer className="bg-primary text-secondary w-full py-[30px] sm:pb-5 lg:pb-[40px] ">
            <div className="container flex flex-col gap-y-8 lg:justify-between lg:flex-row-reverse ">
                <div className="flex flex-wrap justify-between gap-y-[30px] lg:flex-1 ">
                    <div className="space-y-[15px]">
                        <h1 className="uppercase font-semibold text-sm">
                            INFORMATION FOR BUYER
                        </h1>
                        <ul className="grid grid-cols-2 gap-x-7 lg:gap-x-12 gap-y-[10px]">
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/shop"}>stock</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/shop?status=sale"}>sale</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/shop?status=latest"}>latest</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/contact"}>contact us</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/about/whoarewe"}>who are we</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/about/delivery"}>delivery</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/about/payment"}>payment</Link>
                            </li>
                            <li className="hover:underline capitalize text-sm text-white">
                                <Link to={"/about/garantee"}>garantee</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-[15px]">
                        <h1 className="uppercase font-semibold text-sm">
                            CONTACTS
                        </h1>
                        <ul className="space-y-[15px]">
                            <li className="flex items-center gap-x-2">
                                <span>
                                    <FaRegClock />
                                </span>
                                <span>Every day from 08:00 - 20:00</span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <span>
                                    <FaRegEnvelope />
                                </span>
                                <span>lightwave08@gmail.com</span>
                            </li>
                            <li className="flex items-center gap-x-2">
                                <span>
                                    <FaPhone />
                                </span>
                                <span>0524245824 | 0661637497</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <SocialMedia />
            </div>
        </footer>
    );
}
function SocialMedia() {
    return (
        <div className="flex flex-col gap-y-[25px] lg:mt-2 lg:gap-y-[30px] lg:basis-[40%] xl:basis-[55%]">
            <div className="flex flex-col gap-y-[25px] lg:gap-y-[30px] sm:items-center sm:flex-row sm:justify-between lg:flex-col lg:items-start">
                <div>
                    <Link to={"/home"}>
                        <img
                            src={logo}
                            alt="footer-logo"
                            className="2xl:w-[176px]"
                        />
                    </Link>
                </div>
                <div className="flex gap-6">
                    <Icon href="https://facebook.com">
                        <FaFacebookF />
                    </Icon>
                    <Icon href="https://instagram.com">
                        <FaInstagram />
                    </Icon>
                    <Icon href="https://tiktok.com">
                        <FaTiktok />
                    </Icon>
                </div>
            </div>
            <p className="text-xs font-medium uppercase text-[#828282]">
                lightwave 2008-2024
            </p>
        </div>
    );
}

export default Footer;
