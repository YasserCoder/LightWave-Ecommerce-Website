import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import ScrollTop from "./ScrollTop";
import { useEffect, useState } from "react";

function AppLayout() {
    const [scrollVisible, setScrollVisible] = useState(false);

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
