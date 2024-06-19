import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import MenuItems from "./MenuItems";

import {
    FaAngleLeft,
    FaAngleRight,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa";

function Categories({ cats }) {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    const [openItem, setOpenItem] = useState(null);
    const listRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (listRef.current && !listRef.current.contains(event.target)) {
                if (event.offsetX <= event.target.clientWidth) {
                    setOpenItem(null);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [listRef]);

    const handleItemClick = (item) => {
        setOpenItem((prev) => (prev === item ? null : item));
    };

    return (
        <div className="relative  pt-5 w-full container border-b ">
            <button
                ref={prevRef}
                className={`absolute top-[50%] z-20 translate-y-[-50%] left-1 size-9 items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-lg cursor-pointer duration-300 ${
                    isBeginning ? "hidden" : "flex"
                }`}
            >
                <FaAngleLeft />
            </button>

            <div className=" mx-10">
                <ul
                    className={` text-grey overflow-x-clip w-full pb-5 text-[17px] whitespace-nowrap`}
                    ref={listRef}
                >
                    <Swiper
                        slidesPerView={"auto"}
                        centeredSlides={true}
                        modules={[Navigation]}
                        spaceBetween={80}
                        grabCursor={true}
                        onInit={(swiper) => {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();

                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onReachBeginning={() => setIsBeginning(true)}
                        onReachEnd={() => setIsEnd(true)}
                        breakpoints={{
                            640: {
                                centeredSlides: true,
                            },
                            768: {
                                centeredSlides: false,
                            },
                        }}
                        className="overflow-visible"
                    >
                        <SwiperSlide key={"all"} className="w-fit h-auto">
                            <CategoryItem
                                category={"all"}
                                handleItemClick={() => {
                                    handleItemClick("all");
                                }}
                                setOpenItem={setOpenItem}
                            />
                        </SwiperSlide>
                        {Object.keys(cats).map((e) => {
                            return (
                                <SwiperSlide key={e} className={`w-fit h-auto`}>
                                    <CategoryItem
                                        category={e}
                                        isOpen={openItem === e}
                                        handleItemClick={() => {
                                            handleItemClick(e);
                                        }}
                                        setOpenItem={setOpenItem}
                                        cats={cats}
                                    />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </ul>
            </div>
            <button
                ref={nextRef}
                className={`absolute top-[50%] z-20 translate-y-[-50%] right-1 size-9  items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-lg cursor-pointer duration-300 ${
                    isEnd ? "hidden" : "flex"
                }`}
            >
                <FaAngleRight />
            </button>
        </div>
    );
}

const CategoryItem = ({
    category,
    isOpen,
    handleItemClick,
    setOpenItem,
    cats,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname
        .split("/")
        .filter((part) => part !== "" && part !== "shop")
        .map((e) => {
            return e.includes("%20") ? e.replaceAll("%20", " ") : e;
        });

    const currentFilter = pathParts[0] || "all";

    const handleClick = (value, event) => {
        event.stopPropagation();
        navigate(`/shop/${value}`);
        setOpenItem(null);
    };

    const handleLiClick = (event) => {
        event.stopPropagation();
        if (category !== "all") handleItemClick(category);
    };
    const handleMenuClick = (event) => {
        event.stopPropagation();
    };

    return (
        <li
            className={`group relative flex justify-between h-full items-center gap-3 cursor-pointer whitespace-normal max-w-44 xs:max-w-[300px] sm:max-w-none`}
            onClick={handleLiClick}
        >
            <span>
                <button
                    className={
                        category === currentFilter
                            ? "text-bluegreen cursor-not-allowed capitalize "
                            : "hover:text-bluegreen duration-700 capitalize "
                    }
                    disabled={category === currentFilter}
                    onClick={(event) => handleClick(category, event)}
                >
                    {category}
                </button>
            </span>

            {isOpen && category !== "all" && (
                <ul
                    className="bg-secondary h-fit absolute z-40 left-[50%] translate-x-[-50%] top-[calc(100%+22px)] rounded-lg p-2 w-48 xs:w-56 shadow-md font-medium"
                    onClick={handleMenuClick}
                >
                    <MenuItems categories={cats[category]} />
                </ul>
            )}

            {category !== "all" && (
                <span onClick={handleLiClick}>
                    {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                </span>
            )}

            <span
                className={`absolute  h-[2px] -bottom-5  z-20 left-0 bg-bluegreen duration-300 ${
                    category !== currentFilter
                        ? "w-0 group-hover:w-full"
                        : "w-full"
                } `}
            ></span>
        </li>
    );
};

export default Categories;
