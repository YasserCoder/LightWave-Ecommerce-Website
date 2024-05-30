import {
    FaArrowsRotate,
    FaHeadset,
    FaTruckFast,
    FaWallet,
} from "react-icons/fa6";
import Section from "./Section";

function Services() {
    return (
        <Section title={"Our Services"}>
            <div className="flex justify-between items-center flex-wrap gap-y-2 sm:gap-y-5">
                <Item>
                    <span className="text-4xl font-medium text-bluegreen">
                        <FaTruckFast />
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                        Delivery availability
                    </h3>
                    <p className="text-grey -mt-1">home or stopdesk</p>
                </Item>
                <Item>
                    <span className="text-4xl font-medium text-bluegreen">
                        <FaWallet />
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                        payment on Delivery
                    </h3>
                    <p className="text-grey -mt-1">hand by hand</p>
                </Item>
                <Item>
                    <span className="text-4xl font-medium text-bluegreen">
                        <FaArrowsRotate />
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                        products garantee
                    </h3>
                    <p className="text-grey -mt-1">
                        refund the broken products
                    </p>
                </Item>
                <Item>
                    <span className="text-4xl font-medium text-bluegreen">
                        <FaHeadset />
                    </span>
                    <h3 className="text-lg font-semibold capitalize">
                        support 24/7
                    </h3>
                    <p className="text-grey -mt-1">contact us</p>
                </Item>
            </div>
        </Section>
    );
}

function Item({ children }) {
    return (
        <div className="basis-[100%] sm:basis-[48%] lg:basis-[23%] flex flex-col gap-2 items-center py-8 justify-center border-2 rounded-md border-bluegreen">
            {children}
        </div>
    );
}

export default Services;
