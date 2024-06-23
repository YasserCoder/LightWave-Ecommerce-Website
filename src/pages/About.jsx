import { NavLink, useLocation } from "react-router-dom";

import Path from "../ui/Path";

const sections = ["who are we", "payment", "delivery", "garantee"];

function About() {
    const location = useLocation();
    const section = location.pathname.split("/").pop();
    return (
        <div className="py-4  container">
            <Path dest={["about", section]} />
            <div className="my-6  flex flex-col gap-12 md:flex-row">
                <SideBar section={section} />
                <div className="mt-6 md:mt-0 flex flex-col gap-10">
                    {section === "whoarewe" && <WhoAreWe />}
                    {section === "payment" && <Payment />}
                    {section === "delivery" && <Delivery />}
                    {section === "garantee" && <Garantee />}
                </div>
            </div>
        </div>
    );
}

function Garantee() {
    return (
        <>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-4xl text-black font-extrabold capitalize mb-[6px]">
                    garantee
                </h1>
                <p className="indent-1">
                    At LightWave, we stand behind the quality of our products
                    with our comprehensive guarantee policy. We understand the
                    importance of assurance when making a purchase, and we are
                    committed to ensuring your satisfaction every step of the
                    way.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Warranty Duration
                </h1>
                <p>
                    The duration of the guarantee may vary from product to
                    product, depending on the type and manufacturer
                    specifications. We provide detailed information about the
                    warranty period for each item to help you make informed
                    decisions about your purchase. Rest assured that we only
                    offer products from reputable brands that meet our high
                    standards of quality and durability.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Damaged Products
                </h1>
                <p>
                    In the rare event that a product is damaged during delivery,
                    we have you covered. LightWave guarantees that any items
                    damaged in transit will be refunded or replaced promptly.
                    Your peace of mind is our top priority, and we are dedicated
                    to resolving any issues related to damaged products with
                    efficiency and care.
                </p>
                <p>
                    If you have any questions regarding our guarantee policy or
                    need assistance with a warranty claim, our customer service
                    team is here to help. Your satisfaction is our goal, and we
                    are committed to providing you with a positive shopping
                    experience.
                </p>
                <p>
                    Thank you for choosing LightWave for your electrical supply
                    needs. We aim to exceed your expectations and build a
                    long-lasting relationship based on trust and quality
                    service.
                </p>
            </div>
        </>
    );
}
function Delivery() {
    return (
        <>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-4xl text-black font-extrabold capitalize mb-[6px]">
                    delivery
                </h1>
                <p className="indent-1">
                    At LightWave, we have partnered with Lorem Delivery Service
                    to ensure the secure and timely delivery of our products to
                    customers everywhere. Lorem Delivery Service is committed to
                    providing reliable delivery options, whether to your
                    doorstep or a designated stopdesk location.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Delivery Pricing
                </h1>
                <p>
                    The prices for delivery may vary from city to city,
                    reflecting differences in distance and logistics. We strive
                    to offer competitive delivery pricing to accommodate our
                    customers that needs and ensure a smooth shopping
                    experience. In some cases, delivery may be free of charge
                    for select products, adding even more value to your
                    purchase.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Return Policy
                </h1>
                <p>
                    Lorem Delivery Service also guarantees a hassle-free return
                    process for products purchased from LightWave. Should you
                    need to return an item for any reason, Lorem Delivery
                    Service will handle the return at no cost to you. This
                    commitment to customer satisfaction extends to the entire
                    shopping experience, from purchase to delivery and beyond.
                </p>
                <p>
                    If you have any inquiries or require assistance regarding
                    our delivery policy, please do not hesitate to contact our
                    customer service team. We are dedicated to providing you
                    with exceptional service every step of the way.
                </p>
                <p>
                    Thank you for entrusting LightWave and Lorem Delivery
                    Service with your electrical supply needs. We look forward
                    to serving you and ensuring a seamless delivery experience.
                </p>
            </div>
        </>
    );
}

function Payment() {
    return (
        <>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-4xl text-black font-extrabold capitalize mb-[6px]">
                    payment
                </h1>
                <p className="indent-1">
                    At LightWave, we offer flexible payment options to cater to
                    our customers, both locally and internationally. Our payment
                    policy is designed to ensure a convenient and secure
                    transaction process for all buyers.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Local Buyers
                </h1>
                <p>
                    For buyers within the country, we provide the convenience of
                    payment on delivery. You can inspect your order upon arrival
                    and make the payment in cash or other approved local
                    electronic payment methods. We want to make your purchasing
                    experience seamless and hassle-free, giving you peace of
                    mind when making your payment.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    International Buyers
                </h1>
                <p>
                    For customers outside the country, we offer payment options
                    via card or PayPal. This secure method allows you to
                    complete your purchase with ease and confidence, regardless
                    of your location. We strive to provide a smooth and
                    efficient payment process for our international buyers,
                    ensuring a positive shopping experience no matter where you
                    are.
                </p>
                <p>
                    If you have any inquiries or require clarification about our
                    payment policy, feel free to reach out to our customer
                    service team. We are here to assist you and address any
                    questions you may have regarding payment methods or
                    transactions.
                </p>
                <p>
                    Thank you for choosing LightWave for your electrical supply
                    needs. We value your trust and aim to provide you with
                    exceptional service at every stage of your shopping journey.
                </p>
            </div>
        </>
    );
}

function WhoAreWe() {
    return (
        <>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-4xl text-black font-extrabold capitalize mb-[6px]">
                    who are we
                </h1>
                <p className="indent-1">
                    LightWave is an online store that specializes in providing
                    high-quality electrical supplies. As a leading provider in
                    the industry, we take pride in offering an extensive range
                    of products and exceptional customer service.
                </p>
                <p>
                    At LightWave, our mission is to make purchasing electrical
                    supplies a smooth and seamless experience for every
                    customer. With a wide range of products, competitive
                    pricing, and expert guidance, we strive to be your
                    one-stop-shop for all your electrical needs.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    {" "}
                    our mission
                </h1>
                <p className="">
                    Our mission at LightWave is to make purchasing electrical
                    supplies a smooth and seamless experience for every
                    customer. We strive to offer a wide range of products,
                    competitive pricing, and expert guidance to ensure that you
                    can find everything you need in one place.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    our commitment
                </h1>
                <p>
                    We are committed to sourcing and providing only the best
                    products, ensuring that our customers receive top-notch
                    quality with every purchase. Our team is dedicated to
                    staying up-to-date with industry trends and innovations to
                    offer the most advanced and efficient electrical solutions.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    our values
                </h1>
                <p>
                    Integrity, reliability, and customer satisfaction are at the
                    core of our values. We believe in building long-lasting
                    relationships with our customers by consistently delivering
                    on our promises and providing unparalleled service.
                </p>
            </div>
            <div className="flex flex-col gap-[14px]">
                <h1 className="text-2xl text-black font-bold capitalize mb-[6px]">
                    Why Choose LightWave
                </h1>
                <p>
                    With a passion for excellence and a commitment to
                    customer-centric values, we invite you to discover the
                    LightWave difference. Whether you{"'"}re a homeowner,
                    contractor, or business owner, we have the products and
                    expertise to meet your electrical supply needs and exceed
                    your expectations.
                </p>
                <p>
                    Thank you for choosing LightWave as your trusted source for
                    electrical supplies. We look forward to serving you and
                    helping you power your projects with confidence.
                </p>
            </div>
        </>
    );
}

function SideBar({ section }) {
    return (
        <aside className="flex flex-col gap-y-[15px] pt-5 pb-2 md:py-5 border-y-2 border-[#e5e5e5] h-fit md:sticky md:top-4">
            <h3 className="capitalize font-bold">sections</h3>
            <ul className="flex pb-4 overflow-auto md:pb-0 md:flex-col gap-[6px] ">
                {sections.map((sec) => {
                    return (
                        <li
                            className={`py-2 text-center min-w-32 md:text-start md:w-48 md:pl-2 ${
                                section === sec.split(" ").join("")
                                    ? "text-secondary bg-bluegreen"
                                    : "border border-[#e5e5e5] md:border-none"
                            }`}
                            key={sec}
                        >
                            <NavLink
                                to={`/about/${sec.split(" ").join("")}`}
                                className={({ isActive }) =>
                                    `capitalize  ${
                                        isActive
                                            ? "activeSection"
                                            : "hover:text-bluegreen"
                                    }`
                                }
                            >
                                {sec}
                            </NavLink>
                        </li>
                    );
                })}{" "}
            </ul>
        </aside>
    );
}

export default About;
