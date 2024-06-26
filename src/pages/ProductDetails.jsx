import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { calculateNewPrice } from "../utils/helpers";
import { useProductDetails } from "../hook/useProductDetails";

import Path from "../ui/Path";
import Loader from "../ui/Loader";
import Button from "../ui/Button";
import Section from "../ui/Section";
import LikeBtn from "../ui/LikeBtn";
import ProdCard from "../ui/ProdCard";
import Services from "../ui/Services";
import CategoryPath from "../ui/CategoryPath";

import { FaCartPlus } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";

function ProductDetails() {
    const [like, setLike] = useState(false);
    const [qte, setQte] = useState(1);

    function handleChecked(e) {
        setLike(e.target.checked);
    }

    const location = useLocation();
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const productId = Number(pathSegments[pathSegments.length - 1]);

    const { isLoading, productInfo } = useProductDetails(productId);

    const {
        brand,
        category,
        // delivery,
        imgs,
        description,
        sale,
        price,
        specifications,
        garantee,
        name,
    } = { ...productInfo };

    if (isLoading) return <Loader />;

    return (
        <>
            <div className="py-4  container">
                <Path dest={["Product's Details"]} />
                <div className="my-6  flex flex-col gap-10 lg:justify-between lg:flex-row">
                    <ProdImg imgs={imgs} />
                    <div className="flex flex-col gap-y-3 ">
                        <div className="flex gap-2 items-center text-grey">
                            <CategoryPath category={category} />
                        </div>
                        <p className="text-3xl font-bold">{name}</p>
                        <p className="capitalize flex gap-2 font-medium">
                            <span>brand</span>
                            <span className="text-bluegreen font-semibold">
                                {brand}
                            </span>
                        </p>
                        <div className="my-[12px] sm:my-[22px] flex justify-between items-center overflow-hidden">
                            <div className="">
                                {sale > 0 && (
                                    <div className="flex gap-2 items-baseline">
                                        <span className="text-xs bg-yellow-300 text-white p-1 font-extrabold">{`-${sale}%`}</span>
                                        <span className="line-through text-grey self-end">
                                            {calculateNewPrice(price, 0)}
                                        </span>
                                    </div>
                                )}
                                <p className="text-4xl mt-2 font-bold ">
                                    {`$${calculateNewPrice(price, sale)}`}
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
                                {`${garantee} warranty`}
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
                            <span>{`${description}`}</span>
                        </p>
                        <ul>
                            {Object.keys(specifications).map((key, i) => {
                                return (
                                    <li className="" key={i}>
                                        <span className="font-semibold capitalize mr-2">{`- ${key} :`}</span>
                                        <span className="">{`${specifications[key]} `}</span>
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
                        <ProdCard key={index} id={1} />
                    ))}
                    {Array.from({ length: 2 }, (_, index) => (
                        <ProdCard key={index} id={1} />
                    ))}
                </div>
            </Section>
            <Section title={"Our Services"}>
                <Services />
            </Section>
        </>
    );
}

function ProdImg({ imgs }) {
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
                {imgs.map((pic, i) => {
                    return (
                        <SwiperSlide
                            className="flex justify-center items-center w-fit"
                            key={i}
                        >
                            <img
                                src={pic.imgUrl}
                                alt={pic.imgAlt}
                                className="h-full w-fit  object-contain"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {imgs.length > 1 && (
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
                    {imgs.map((pic, i) => {
                        return (
                            <SwiperSlide
                                className="cursor-pointer opacity-40"
                                key={i}
                            >
                                <img
                                    src={pic.imgUrl}
                                    alt={pic.imgAlt}
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
