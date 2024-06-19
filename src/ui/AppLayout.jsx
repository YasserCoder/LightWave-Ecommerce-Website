import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import ScrollTop from "./ScrollTop";

function AppLayout() {
    const [scrollVisible, setScrollVisible] = useState(false);
    const pathName = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName]);

    function handleScroll() {
        if (
            document.body.scrollTop > 50 ||
            document.documentElement.scrollTop > 50
        ) {
            setScrollVisible(true);
        } else {
            setScrollVisible(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-[calc(100vh-430px)]">
                <Outlet />
            </main>
            {scrollVisible && <ScrollTop />}
            <Footer />
        </>
    );
}

export default AppLayout;
