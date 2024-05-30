import { useSearchParams } from "react-router-dom";

function Filter({ filterField, options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get(filterField) || options.at(0).value;

    function handleClick(value) {
        searchParams.set(filterField, value);
        // if (searchParams.get("page")) searchParams.set("page", 1);

        setSearchParams(searchParams);
    }
    return (
        <div className="shadow-md border-grey flex bg-secondary rounded-md w-fit mx-auto sm:mx-0">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                    disabled={option.value === currentFilter}
                    className={
                        option.value !== currentFilter
                            ? `text-lg hover:bg-bluegreen rounded-md py-3 px-[14px] lg:px-5 hover:text-secondary duration-300`
                            : `bg-bluegreen text-secondary rounded-md py-3 px-[14px] lg:px-5 text-lg cursor-not-allowed`
                    }
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default Filter;
