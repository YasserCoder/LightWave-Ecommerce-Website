import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./bottombar.module.css";
import SearchBar from "./SearchBar";
import { useScreenSize } from "../hook/useScreenSize";

const pages = ["home", "shop", "about us", "contact us"];

const mdscreenstyle = " justify-center gap-x-10 ";
const smscreenstyle =
    "absolute top-13 font-semibold max-h-[322px] overflow-y-auto bg-white z-10 border shadow-sm  flex-col py-5 pl-7 pr-12  gap-y-2";
function BottomBar() {
    const [checked, setChecked] = useState(false);
    const { screenSize: isSmallScreen } = useScreenSize(768);
    function handleChecked(e) {
        setChecked(e.target.checked);
    }

    return (
        <div className="relative py-5 w-full container">
            {isSmallScreen && (
                <div className="flex gap-x-8 sm:gap-x-32 items-center">
                    <MenuBar
                        checked={checked}
                        handleChecked={handleChecked}
                        setChecked={setChecked}
                    />
                    <SearchBar />
                </div>
            )}

            {(checked || !isSmallScreen) && (
                <ul
                    className={`flex text-grey text-lg z-50  ${
                        isSmallScreen ? smscreenstyle : mdscreenstyle
                    }`}
                    id="list"
                >
                    {pages.map((e) => {
                        return (
                            <li key={e} className="group relative">
                                <NavLink
                                    to={`/${e.split(" ")[0]}`}
                                    className={
                                        "hover:text-bluegreen duration-700 capitalize"
                                    }
                                    onClick={() => {
                                        setChecked(false);
                                    }}
                                >
                                    {e}
                                </NavLink>
                                <span className="hidden md:block absolute w-0 h-[2px] -bottom-5 left-0 bg-bluegreen duration-300 group-hover:w-full"></span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

function MenuBar({ checked, handleChecked, setChecked }) {
    const navRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setChecked(false);
            }
        }
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, [setChecked]);
    return (
        <div
            className={`w-fit ${checked ? "border border-b-0" : ""}`}
            ref={navRef}
        >
            <label className={` ${styles.contain}`} data-testid="menu">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                        handleChecked(e);
                    }}
                />
                <svg viewBox="0 0 32 32">
                    <path
                        className={`${styles.line} ${styles.lineTopBottom}`}
                        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                    ></path>
                    <path className={`${styles.line}`} d="M7 16 27 16"></path>
                </svg>
            </label>
        </div>
    );
}

export default BottomBar;
