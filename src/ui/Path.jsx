import { FaAngleRight } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Path({ dest = [] }) {
    return (
        <div className="flex gap-1 text-sm items-center whitespace-nowrap overflow-x-auto ">
            <span>
                <Link
                    to={"/home"}
                    className="capitalize text-[#b1b1b1] flex gap-1 items-center hover:font-semibold"
                >
                    <FaHouse />
                    <span>Home</span>
                </Link>
            </span>
            {dest.map((e, i) => {
                return (
                    e !== null &&
                    e !== "all" && (
                        <div key={i} className="flex gap-1 items-center">
                            <span>
                                <FaAngleRight />
                            </span>
                            {dest.length === i + 1 ? (
                                <span className="capitalize">{e}</span>
                            ) : (
                                <Link
                                    to={`/${dest.slice(0, i + 1).join("/")}`}
                                    className="capitalize hover:font-semibold"
                                >
                                    {e}
                                </Link>
                            )}
                        </div>
                    )
                );
            })}
        </div>
    );
}

export default Path;
