import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa6";
import { IoIosPricetag } from "react-icons/io";

function CategoryPath({ category }) {
    return category.map((e, i) => {
        return (
            <p key={i} className="flex gap-1 items-center">
                {i === 0 && (
                    <span>
                        <IoIosPricetag />
                    </span>
                )}

                <Link
                    to={`/shop/${category.slice(0, i + 1).join("/")}`}
                    className="capitalize hover:font-semibold duration-300"
                >
                    {e}
                </Link>

                {category.length !== i + 1 && (
                    <span>
                        <FaAngleRight />
                    </span>
                )}
            </p>
        );
    });
}

export default CategoryPath;
