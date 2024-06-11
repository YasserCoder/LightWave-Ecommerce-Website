import Path from "../ui/Path";
import imgone from "../assets/prod2/img1.webp";
import imgtwo from "../assets/prod2/img2.webp";
import imgthree from "../assets/prod2/img3.webp";
import imgfour from "../assets/prod2/img4.webp";
import Button from "../ui/Button";
import Section from "../ui/Section";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { IoIosPricetag } from "react-icons/io";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { calculateNewPrice } from "../utils/helpers";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import LikeBtn from "../ui/LikeBtn";
import { FaCartPlus } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import ProdCard from "../ui/ProdCard";
import Services from "../ui/Services";

const imgs = [
    { img: imgone, alt: "img1" },
    { img: imgtwo, alt: "img2" },
    { img: imgthree, alt: "img3" },
    { img: imgfour, alt: "img4" },
];

const infoobj = {
    imgs,
    name: "3 in 1 flashlight, office and camping 180 adjustable, 3 modes, rechargeable with external battery function",
    description:
        "Multi-function LED Camping Lamp Outdoor Hiking Flashlight USB Rechargeable Indoor Table Lamp Emergency Power Bank",
    brand: "Beetro",
    specifications: [
        "Power : 5W",
        "dimensions: 15x30 cm",
        "batterie : 6 hours",
        "colors : green , red , yellow",
        "lighting : white",
    ],
    category: ["Lighting", "Lamps", "Desk Lamps"],
    delivery: true,
    price: 33,
    garantee: "1 month",
    sale: 12,
};
function ProductDetails() {
    const [like, setLike] = useState(false);
    const [qte, setQte] = useState(1);

    function handleChecked(e) {
        setLike(e.target.checked);
    }

    return (
        <>
            <div className="py-4  container">
                <Path dest={["Product's Details"]} />
                <div className="my-6  flex flex-col gap-10 lg:justify-between lg:flex-row">
                    <ProdImg />
                    <div className="flex flex-col gap-y-3 ">
                        <div className="flex gap-2 items-center text-grey">
                            {infoobj.category.map((e, i) => {
                                return (
                                    <p
                                        key={i}
                                        className="flex gap-1 items-center"
                                    >
                                        {i === 0 && (
                                            <span>
                                                <IoIosPricetag />
                                            </span>
                                        )}

                                        <Link
                                            to={`/shop/${infoobj.category
                                                .slice(0, i + 1)
                                                .join("/")}`}
                                            className="capitalize hover:font-semibold duration-300"
                                        >
                                            {e}
                                        </Link>

                                        {infoobj.category.length !== i + 1 && (
                                            <span>
                                                <FaAngleRight />
                                            </span>
                                        )}
                                    </p>
                                );
                            })}
                        </div>
                        <p className="text-3xl font-bold">{infoobj.name}</p>
                        <p className="capitalize flex gap-2 font-medium">
                            <span>brand</span>
                            <span className="text-bluegreen font-semibold">
                                {infoobj.brand}
                            </span>
                        </p>
                        <div className="my-[12px] sm:my-[22px] flex justify-between items-center overflow-hidden">
                            <div className="">
                                {infoobj.sale > 0 && (
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-xs bg-yellow-300 text-white p-1 font-extrabold">{`-${infoobj.sale}%`}</span>
                                        <span className="line-through text-grey self-end">
                                            {calculateNewPrice(
                                                infoobj.price,
                                                0
                                            )}
                                        </span>
                                    </div>
                                )}
                                <p className="text-4xl mt-2 font-bold ">
                                    {`$${calculateNewPrice(
                                        infoobj.price,
                                        infoobj.sale
                                    )}`}
                                </p>
                            </div>
                            <div className=" mr-4">
                                <LikeBtn
                                    size={45}
                                    like={like}
                                    setLike={handleChecked}
                                />
                            </div>
                        </div>
                        <div className="mb-[15px] sm:mb-[25px] justify-center flex gap-5 flex-wrap items-center">
                            <div className="flex justify-center items-center gap-x-4">
                                <p className="font-semibold capitalize text-lg">
                                    Quantity :{" "}
                                </p>
                                <div className="border-2 flex items-center rounded-md">
                                    <button
                                        className={`py-2 px-4  text-lg font-semibold border-r-2 ${
                                            qte <= 1
                                                ? "text-grey cursor-not-allowed"
                                                : "active:translate-y-[2px] text-bluegreen"
                                        }  `}
                                        disabled={qte <= 1}
                                        onClick={() => {
                                            if (qte > 1)
                                                setQte(Number(qte) - 1);
                                        }}
                                    >
                                        ــ
                                    </button>
                                    <input
                                        type="number"
                                        name="number"
                                        className="w-16 py-2 px-2 outline-none font-semibold"
                                        min={"1"}
                                        value={qte}
                                        onChange={(e) => {
                                            setQte(e.target.value);
                                        }}
                                    />
                                    <button
                                        className="py-2 px-4 text-lg font-semibold text-bluegreen border-l-2 active:translate-y-[2px]"
                                        onClick={() => {
                                            setQte(Number(qte) + 1);
                                        }}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="flex gap-x-4 items-center">
                                <Button btnstyle=" px-[20px]  rounded-md flex gap-2 items-center hover:bg-hovercol hover:text-bluegreen">
                                    <span className="">
                                        <FaCartPlus />
                                    </span>

                                    <span className="capitalize">
                                        add to cart
                                    </span>
                                </Button>

                                <Button btnstyle=" px-[20px] rounded-md flex gap-2 items-center hover:bg-hovercol hover:text-bluegreen">
                                    <span>
                                        <IoBagCheckOutline className="text-lg" />
                                    </span>

                                    <span className="capitalize">buy now</span>
                                </Button>
                            </div>
                        </div>
                        <div className="border-y py-4 flex gap-x-2 gap-y-3 flex-wrap items-center">
                            <div className="w-[180px] bg-purple-300 pl-3 text-sm capitalize py-2 rounded-md text-[#333333] bg-opacity-50">
                                {`${infoobj.garantee} warranty`}
                            </div>
                            <div className="w-[210px] bg-orange-200 text-sm capitalize pl-3 py-2 rounded-md text-[#333333] bg-opacity-50">
                                {`Certified products`}
                            </div>
                            <div className="w-[320px] bg-green-200 text-sm capitalize pl-3 py-2 rounded-md text-[#333333] bg-opacity-50">
                                {`Free delivery for orders over $50.00`}
                            </div>
                        </div>
                        <p className="my-[10px]  space-x-2">
                            <strong className="font-semibold text-lg">
                                {" "}
                                Description :{" "}
                            </strong>
                            <span>{`${infoobj.description}`}</span>
                        </p>
                        <ul>
                            {infoobj.specifications.map((spec, i) => {
                                return (
                                    <li className="" key={i}>
                                        <span className="font-semibold capitalize mr-2">{`- ${
                                            spec.split(":")[0]
                                        } :`}</span>
                                        <span className="">{`${
                                            spec.split(":")[1]
                                        } `}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <Section title="similar products">
                <div className="grid grid-cols-200 gap-4 ">
                    {Array.from({ length: 3 }, (_, index) => (
                        <ProdCard key={index} />
                    ))}
                    {Array.from({ length: 2 }, (_, index) => (
                        <ProdCard
                            name="osisudhdhd dudxxc xjxuxhxc"
                            key={index}
                        />
                    ))}
                </div>
            </Section>
            <Services />
        </>
    );
}

function ProdImg() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className="h-fit lg:sticky lg:top-5">
            <Swiper
                style={{
                    "--swiper-navigation-color": "#15616d",
                    "--swiper-pagination-color": "#fff",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                grabCursor={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-80  lg:w-[500px] xl:w-[600px]"
            >
                {infoobj.imgs.map((pic, i) => {
                    return (
                        <SwiperSlide
                            className="flex justify-center items-center w-fit"
                            key={i}
                        >
                            <img
                                src={pic.img}
                                alt={pic.alt}
                                className="h-full w-fit  object-contain"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {infoobj.imgs.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    // loop={true}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="lg:w-[520px] xl:w-[600px] bg-gray-100 py-2 "
                >
                    {infoobj.imgs.map((pic, i) => {
                        return (
                            <SwiperSlide
                                className="cursor-pointer opacity-40"
                                key={i}
                            >
                                <img
                                    src={pic.img}
                                    alt={pic.alt}
                                    className="h-full object-contain shadow-md"
                                />
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
}

export default ProductDetails;
