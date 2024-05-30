import { useState, useEffect } from "react";

export function useScreenSize(width, action = () => {}) {
    const [screenSize, setScreenSize] = useState(window.innerWidth < width);

    useEffect(
        function () {
            function handleResize() {
                setScreenSize(window.innerWidth < width);
                action();
            }
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        },
        [width, screenSize, action]
    );

    return { screenSize, setScreenSize };
}
