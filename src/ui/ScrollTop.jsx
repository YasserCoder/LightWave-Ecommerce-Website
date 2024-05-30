import { FaAngleUp } from "react-icons/fa";
import Icon from "./Icon";

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}
function ScrollTop() {
    return (
        <div className="fixed bottom-7 right-4 z-10">
            <Icon onClick={scrollToTop}>
                <FaAngleUp />{" "}
            </Icon>
        </div>
    );
}

export default ScrollTop;
