import { useState } from "react";
import Button from "./Button";
import { useScreenSize } from "../hook/useScreenSize";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    const [value, setValue] = useState("");
    const { screenSize: isSmallScreen } = useScreenSize(768);
    function handleSearch(e) {
        e.preventDefault();
        console.log("search");
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
            >
                {isSmallScreen ? <FaSearch className="text-2xl" /> : "Search"}
            </Button>
        </form>
    );
}

export default SearchBar;
