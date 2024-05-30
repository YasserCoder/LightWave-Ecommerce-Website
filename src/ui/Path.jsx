import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function Path({ dest = [], routes = [] }) {
    return (
        <div className="flex gap-1 text-sm items-center">
            <span>
                <Link to={"/home"} className="capitalize text-[#b1b1b1]">
                    Home
                </Link>
            </span>
            {dest.map((e, i) => {
                return (
                    e !== null && (
                        <div key={i} className="flex gap-1 items-center">
                            <span>
                                <FaAngleRight />
                            </span>
                            {dest.length === i + 1 ? (
                                <span className="capitalize">{e}</span>
                            ) : (
                                <Link to={routes.at(i)} className="capitalize">
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
