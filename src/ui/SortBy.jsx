import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function SortBy({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy") || "";
    const status = searchParams.get("status") || "all";
    // const realOp=status === "all" ? []

    useEffect(() => {
        if (status !== "all") {
            searchParams.set("sortBy", "");
            setSearchParams(searchParams);
        }
    }, [status, setSearchParams, searchParams]);

    function handleChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParams(searchParams);
    }

    return (
        <select
            value={status === "all" ? sortBy : ""}
            onChange={handleChange}
            className="px-3 py-2 bg-secondary rounded-xl shadow-md cursor-pointer max-w-[160px] xs:max-w-none"
            disabled={status !== "all"}
        >
            {options.map((option) => (
                <option value={option.value} key={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default SortBy;
