import { useEffect, useRef } from "react";
import styles from "./input.module.css";

function InputText({
    value,
    type = "text",
    label,
    handleChange,
    smallSize = false,
}) {
    const inputRef = useRef(null);
    useEffect(() => {
        const input = inputRef.current;
        if (value !== "") {
            fixLabel();
        }
        if (input) {
            input.addEventListener("blur", fixLabel);
        }
        return () => {
            if (input) {
                input.removeEventListener("blur", fixLabel);
            }
        };
    }, [label, value]);
    function fixLabel() {
        const input = inputRef.current;
        if (input) {
            input.nextElementSibling.style =
                "top: -30px;padding-left: 0;color: #15616d;";
        }
    }
    return (
        <div className="relative">
            <input
                id={label}
                type={type}
                value={value}
                onChange={(e) => {
                    handleChange(e.target.value);
                }}
                className={`py-2 pl-3 border-b w-[230px] sm:w-72 ${
                    smallSize ? "xl:w-56" : ""
                }  outline-none bg-transparent border-[#e5e5e5] ${styles}`}
                ref={inputRef}
            />
            <label
                htmlFor={label}
                className="absolute left-0 py-2 top-0  pl-3 text-[#b1b1b1] pointer-events-none capitalize duration-500"
            >
                {label}
            </label>
        </div>
    );
}

export default InputText;
