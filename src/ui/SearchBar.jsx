import { useState } from "react";
import Button from "./Button";
import { useScreenSize } from "../hook/useScreenSize";
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { pathname } = useLocation();

    const inShop = pathname.split("/").includes("shop");

    const { screenSize: isSmallScreen } = useScreenSize(768);
    function handleSearch(e) {
        e.preventDefault();
        if (inShop) {
            searchParams.set("q", value);
            setSearchParams(searchParams);
        } else {
            navigate(`/shop?q=${value}`);
        }
        setValue("");
    }
    return (
        <form className="flex items-center flex-1  md:flex-auto">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                className="py-[10px] pl-3 bg-secondary rounded-sm outline-bluegreen w-full md:w-[320px] xl:w-[400px] "
                placeholder="Enter product name"
            />
            <Button
                btnstyle=" px-3 sm:px-[19px] rounded-1 "
                handle={handleSearch}
                submit={true}
            >
                {isSmallScreen ? <FaSearch className="text-2xl" /> : "Search"}
            </Button>
        </form>
    );
}

export default SearchBar;
