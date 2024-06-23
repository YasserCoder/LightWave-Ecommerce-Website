import {
    FaArrowsRotate,
    FaHeadset,
    FaTruckFast,
    FaWallet,
} from "react-icons/fa6";

const defeaultItems = {
    "Delivery availability": {
        icon: <FaTruckFast />,
        desc: "home or stopdesk",
    },
    "payment on delivery": {
        icon: <FaWallet />,
        desc: "hand by hand",
    },
    "products garantee": {
        icon: <FaArrowsRotate />,
        desc: "refund broken products",
    },
    "support 24/7": {
        icon: <FaHeadset />,
        desc: "contact us",
    },
};

function Services({ items = { ...defeaultItems } }) {
    return (
        <div className="flex justify-between items-center flex-wrap gap-y-2 sm:gap-y-5">
            {Object.keys(items).map((key, i) => {
                const value = items[key];
                return (
                    <Item key={i}>
                        <span className="text-4xl font-medium text-bluegreen">
                            {value.icon}
                        </span>
                        <h3 className="text-lg font-semibold capitalize">
                            {key}
                        </h3>
                        <p className="text-grey -mt-1">{value.desc}</p>
                    </Item>
                );
            })}
        </div>
    );
}

function Item({ children }) {
    return (
        <div className="basis-[100%] xs:basis-[48%] lg:basis-[23%] flex flex-col gap-2 items-center py-8 justify-center border-2 rounded-md border-bluegreen">
            {children}
        </div>
    );
}

export default Services;
