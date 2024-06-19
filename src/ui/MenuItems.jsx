import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function MenuItems({ categories = {} }) {
    return Object.keys(categories).map((key) => {
        const value = categories[key];
        if (typeof value === "object" && !Array.isArray(value)) {
            return (
                <MenuItem key={key} label={key}>
                    <MenuItems categories={value} />
                </MenuItem>
            );
        } else if (Array.isArray(value)) {
            return (
                <MenuItem key={key} label={key}>
                    {value.map((item) => (
                        <MenuItem key={item} label={item} />
                    ))}
                </MenuItem>
            );
        }
        return <MenuItem key={key} label={key} />;
    });
}

const MenuItem = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };
    function searchParent(event, isolated = false) {
        event.stopPropagation();
        let path = [event.target.textContent];
        event.target.classList.add("activebtn");
        let btn = isolated
            ? event.target.parentElement.parentElement.previousElementSibling
                  .firstElementChild
            : event.target.parentElement.parentElement.parentElement
                  .previousElementSibling?.firstElementChild;
        if (btn) {
            if (btn.tagName === "BUTTON") {
                path.push(btn.textContent);
                while (btn.tagName === "BUTTON") {
                    btn =
                        btn.parentElement.parentElement.parentElement
                            .previousElementSibling?.firstElementChild;

                    if (btn) {
                        if (btn.tagName === "BUTTON")
                            path.push(btn.textContent);
                    } else {
                        break;
                    }
                }
            }
        }
        navigate(`${path.reverse().join("/")}`);
    }
    useEffect(() => {
        document.querySelectorAll(`.activebtn`).forEach((btn) => {
            btn.disabled = false;
            btn.classList.remove("activebtn");
        });
        const pathParts = location.pathname
            .split("/")
            .filter((part) => part !== "" && part !== "shop")
            .map((e) => {
                return e.includes("%20") ? e.replaceAll("%20", " ") : e;
            });
        pathParts.forEach((e) => {
            document.querySelectorAll(`button[value="${e}"]`).forEach((btn) => {
                btn.disabled = true;
                btn.classList.add("activebtn");
            });
        });
    }, [location]);
    return (
        <li className="mb-2 whitespace-break-spaces">
            {children ? (
                <>
                    <div
                        className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-300 rounded"
                        onClick={toggleOpen}
                    >
                        <button
                            className="hover:text-bluegreen text-start"
                            onClick={searchParent}
                            value={label}
                        >
                            {label}
                        </button>

                        <span className="ml-2">
                            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                    </div>
                    {isOpen && (
                        <ul className="pl-4 mt-2 relative z-40">
                            <span className="absolute h-full w-[2px] left-1 top-0 bg-slate-400"></span>
                            {children}
                        </ul>
                    )}
                </>
            ) : (
                <button
                    className="block p-2 hover:text-bluegreen rounded text-start"
                    onClick={(event) => {
                        searchParent(event, true);
                    }}
                    value={label}
                >
                    {label}
                </button>
            )}
        </li>
    );
};

export default MenuItems;
