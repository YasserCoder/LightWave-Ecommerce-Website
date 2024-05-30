import BottomBar from "./BottomBar";
// import Categories from "./Categories";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

function Header() {
    return (
        <header className="flex justify-center flex-col items-center border-b border-[#e5e5e5]">
            <Topbar />
            <Navbar />
            <BottomBar />
            {/* <Categories /> */}
        </header>
    );
}

export default Header;
