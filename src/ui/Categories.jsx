import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
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

function Categories() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilter = searchParams.get("category") || "all";

    function handleClick(value) {
        searchParams.set("category", value);

        setSearchParams(searchParams);
    }

    return (
        <div className="relative pt-5 w-full container border-b ">
            <button
                ref={prevRef}
                className={
                    isBeginning
                        ? "hidden"
                        : `absolute top-[50%] z-20 translate-y-[-50%] left-1 size-9 flex items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-lg cursor-pointer duration-300`
                }
            >
                <FaAngleLeft />
            </button>

            <ul
                className={` text-grey pb-5 overflow-hidden mx-10 text-[17px] whitespace-nowrap`}
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
                    <SwiperSlide key={"all"} className="w-fit ">
                        <li className="group relative">
                            <button
                                className={
                                    "all" === currentFilter
                                        ? "text-bluegreen cursor-not-allowed"
                                        : "hover:text-bluegreen duration-700"
                                }
                                disabled={"all" === currentFilter}
                                onClick={() => {
                                    handleClick("all");
                                }}
                            >
                                All
                            </button>
                            <span
                                className={
                                    "all" !== currentFilter
                                        ? "absolute w-0 h-[2px] -bottom-5 z-50  left-0 bg-bluegreen duration-300 group-hover:w-full"
                                        : "absolute h-[2px] -bottom-5 z-50  left-0 bg-bluegreen duration-300 w-full"
                                }
                            ></span>
                        </li>
                    </SwiperSlide>
                    {Object.keys(cats).map((e) => {
                        return (
                            <SwiperSlide key={e} className="w-fit">
                                <li className="group relative list-none">
                                    <button
                                        className={
                                            e === currentFilter
                                                ? "text-bluegreen cursor-not-allowed"
                                                : "hover:text-bluegreen duration-700"
                                        }
                                        disabled={e === currentFilter}
                                        onClick={() => {
                                            handleClick(e);
                                        }}
                                    >
                                        {e}
                                    </button>
                                    <span
                                        className={
                                            e !== currentFilter
                                                ? "absolute w-0 h-[2px] -bottom-5 z-50  left-0 bg-bluegreen duration-300 group-hover:w-full"
                                                : "absolute h-[2px] -bottom-5 z-50  left-0 bg-bluegreen duration-300 w-full"
                                        }
                                    ></span>
                                </li>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </ul>

            <button
                ref={nextRef}
                className={
                    isEnd
                        ? "hidden"
                        : `absolute top-[50%] z-20 translate-y-[-50%] right-1 size-9 flex items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-lg cursor-pointer duration-300`
                }
            >
                <FaAngleRight />
            </button>
        </div>
    );
}

export default Categories;
