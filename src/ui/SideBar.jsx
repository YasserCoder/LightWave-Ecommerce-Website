import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
const menuData = {
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

function SideBar() {
    return (
        <ul className="bg-secondary h-fit absolute left-0 top-28 lg:left-auto lg:sticky lg:top-4 mx-auto  rounded-lg p-2 w-full lg:w-auto lg:min-w-72 shadow-md font-medium">
            {renderMenuItems(menuData)}
        </ul>
    );
}

const MenuItem = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className="mb-2">
            {children ? (
                <div>
                    <div
                        className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-300 rounded"
                        onClick={toggleOpen}
                    >
                        <span>
                            <NavLink
                                to="/cart"
                                className="hover:text-bluegreen"
                            >
                                {label}
                            </NavLink>
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
                </div>
            ) : (
                <NavLink
                    to=""
                    className="block p-2 hover:text-bluegreen rounded"
                >
                    {label}
                </NavLink>
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

export default SideBar;
