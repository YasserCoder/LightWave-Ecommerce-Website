import { useEffect, useRef, useState } from "react";
import {
    FaAngleLeft,
    FaAngleRight,
    FaChevronDown,
    FaChevronRight,
    FaChevronUp,
} from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const cats = {
    Lighting: {
        Lamps: ["Table Lamps", "Floor Lamps", "Desk Lamps", "Reading Lamps"],
        "Ceiling Lights": [
            "Chandeliers",
            "Pendant Lights",
            "Flush Mount Lights",
            "Semi-Flush Mount Lights",
            "Recessed Lighting",
        ],
        "Wall Lights": ["Wall Sconces", "Picture Lights", "Bath/Vanity Lights"],
        "Outdoor Lighting": [
            "Outdoor Wall Lights",
            "Outdoor Ceiling Lights",
            "Landscape Lighting",
            "Solar Lights",
        ],
    },
    "Cables and Wires": {
        "Electrical Cables": [
            "Power Cables",
            "Control Cables",
            "Data Cables",
            "Coaxial Cables",
        ],
        Wires: [
            "Copper Wires",
            "Aluminum Wires",
            "Armored Wires",
            "Hook-Up Wires",
        ],
        "Cable Accessories": [
            "Cable Ties",
            "Cable Clips",
            "Cable Sleeves",
            "Cable Connectors",
        ],
    },
    "Electrical Components": {
        "Switches and Sockets": [
            "Wall Switches",
            "Dimmer Switches",
            "Smart Switches",
            "Wall Sockets",
            "USB Sockets",
            "Surge Protectors",
        ],
        "Circuit Protection": [
            "Circuit Breakers",
            "Fuses",
            "RCDs (Residual Current Devices)",
        ],
        Transformers: [
            "Power Transformers",
            "Isolation Transformers",
            "Step-Up/Step-Down Transformers",
        ],
    },
    "Tools and Instruments": {
        "Hand Tools": ["Screwdrivers", "Pliers", "Wire Strippers"],
        "Power Tools": ["Drills", "Saws", "Heat Guns"],
        "Testing Instruments": [
            "Multimeters",
            "Voltage Testers",
            "Clamp Meters",
        ],
    },
    "Home Automation": {
        "Smart Lighting": ["Smart Bulbs", "Smart Light Strips"],
        "Smart Switches and Plugs": ["Smart Switches", "Smart Plugs"],
        Sensors: ["Motion Sensors", "Light Sensors", "Smoke Detectors"],
    },
    "Heating and Cooling": {
        Fans: ["Ceiling Fans", "Portable Fans", "Exhaust Fans"],
        Heaters: ["Space Heaters", "Radiant Heaters", "Baseboard Heaters"],
        "Air Conditioners": [
            "Window AC Units",
            "Portable AC Units",
            "Split AC Units",
        ],
    },
    "Batteries and Chargers": {
        Batteries: [
            "AA/AAA Batteries",
            "Rechargeable Batteries",
            "Specialty Batteries (Lithium, Alkaline)",
        ],
        Chargers: ["Battery Chargers", "USB Chargers", "Wireless Chargers"],
    },
    "Accessories and Consumables": {
        "Light Bulbs": [
            "LED Bulbs",
            "Halogen Bulbs",
            "Incandescent Bulbs",
            "Fluorescent Tubes",
        ],
        "Electrical Tapes and Insulators": [
            "Electrical Tape",
            "Heat Shrink Tubing",
            "Insulation Tape",
        ],
        "Adapters and Converters": [
            "Plug Adapters",
            "Voltage Converters",
            "USB Adapters",
        ],
    },
};

function CategoriesV1() {
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

const CategoryItem = ({ category, isOpen, handleItemClick, setOpenItem }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("category") || "all";

    const handleClick = (value, event) => {
        event.stopPropagation();
        searchParams.set("category", value);
        setSearchParams(searchParams);
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

            {isOpen && category !== "all" && (
                <ul
                    className="bg-secondary h-fit absolute z-30 left-[50%] translate-x-[-50%] top-[calc(100%+22px)] rounded-lg p-2 w-48 xs:w-56 shadow-md font-medium"
                    onClick={handleMenuClick}
                >
                    {renderMenuItems(cats[category])}
                </ul>
            )}
        </li>
    );
};
const MenuItem = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="mb-2 whitespace-break-spaces">
            {children ? (
                <>
                    <div
                        className="flex justify-between items-center text-left cursor-pointer p-2 hover:bg-gray-300 rounded"
                        onClick={toggleOpen}
                    >
                        <span>
                            <button className="hover:text-bluegreen text-start">
                                {label}
                            </button>
                        </span>
                        <span className="ml-2">
                            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </span>
                    </div>
                    {isOpen && (
                        <ul className="pl-4 mt-2 relative">
                            <span className="absolute h-full w-[2px] left-1 top-0 bg-slate-400"></span>
                            {children}
                        </ul>
                    )}
                </>
            ) : (
                <button className="block p-2 hover:text-bluegreen rounded">
                    {label}
                </button>
            )}
        </li>
    );
};

const renderMenuItems = (data) => {
    return Object.keys(data).map((key) => {
        const value = data[key];
        if (typeof value === "object" && !Array.isArray(value)) {
            return (
                <MenuItem key={key} label={key}>
                    {renderMenuItems(value)}
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
};

export default CategoriesV1;
