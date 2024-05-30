import { Link } from "react-router-dom";
import Hero from "../ui/Hero";
import ProdCard from "../ui/ProdCard";
import Section from "../ui/Section";
import Services from "../ui/Services";
import { Swiper, SwiperSlide } from "swiper/react";
import anounnce from "../assets/Anounnce.jpg";
import beetro from "../assets/brands/Beetro.png";
import bms from "../assets/brands/BMS.png";
import finolex from "../assets/brands/finolex.png";
import energical from "../assets/brands/energical.png";
import legrand from "../assets/brands/legrand.svg";
import philips from "../assets/brands/philips.svg";

import "swiper/css";
import styles from "../ui/brands.module.css";

import { Navigation } from "swiper/modules";
import { useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";

function Home() {
    return (
        <>
            <Hero />
            <Services />
            <Anouncement
                title={"latest products"}
                latest={true}
                dest="latest"
            />
            <Anouncement title={"sale products"} sale={22} dest="sale" />
            <BestDeals />
            <OurBrands />
        </>
    );
}
function OurBrands() {
    return (
        <Section title={"our brands"}>
            <div className={`${styles.logos} border-y`}>
                <div className={styles.logosSlide}>
                    <img src={beetro} alt="beetro" />
                    <img src={bms} alt="bms" />
                    <img src={energical} alt="energical" />
                    <img src={finolex} alt="finolex" />
                    <img src={legrand} alt="legrand" />
                    <img src={philips} alt="philips" />
                </div>
                <div className={styles.logosSlide}>
                    <img src={beetro} alt="beetro" />
                    <img src={bms} alt="bms" />
                    <img src={energical} alt="energical" />
                    <img src={finolex} alt="finolex" />
                    <img src={legrand} alt="legrand" />
                    <img src={philips} alt="philips" />
                </div>
            </div>
        </Section>
    );
}

function Anouncement({ title, latest, sale, dest }) {
    return (
        <Section title={title}>
            <div className="grid grid-cols-250 gap-4 mb-10 lg:mb-16">
                {Array.from({ length: 2 }, (_, index) => (
                    <ProdCard key={index} latest={latest} sale={sale} />
                ))}
                {Array.from({ length: 2 }, (_, index) => (
                    <ProdCard
                        name="osisudhdhd dudxxc xjxuxhxc"
                        key={index}
                        latest={latest}
                        sale={sale}
                    />
                ))}
            </div>
            <div className="mx-auto w-fit">
                <Link
                    to={`/shop?status=${dest}`}
                    className="bg-bluegreen py-[10px] text-secondary capitalize font-medium text-lg px-10 rounded-1 active:bg-bluegreen hover:bg-hovercol hover:text-bluegreen active:text-secondary"
                >
                    load more
                </Link>
            </div>
        </Section>
    );
}

function BestDeals() {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    return (
        <Section title={"best deals"}>
            <div className="relative w-[80%] mx-auto">
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    grabCursor={true}
                    onInit={(swiper) => {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                        swiper.navigation.init();
                        swiper.navigation.update();
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                    }}
                >
                    {Array.from({ length: 3 }, (_, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative border ">
                                <img src={anounnce} />
                                <Link className="absolute left-3 bottom-4 sm:bottom-8 sm:left-6 lg:bottom-10 xl:bottom-12 xl:left-9 text-lg xl:text-xl xl:font-semibold flex items-center font-semibold  gap-1  text-bluegreen hover:text-hovercol">
                                    Buy Now <MdOpenInNew />
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <button
                    ref={prevRef}
                    className="absolute top-[50%] z-20 translate-y-[-50%] -left-[42px] sm:-left-13 md:-left-16 lg:-left-20 xl:text-5xl size-8 md:size-12 xl:size-16 flex items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-xl md:text-3xl cursor-pointer duration-300"
                >
                    <FaAngleLeft />
                </button>
                <button
                    ref={nextRef}
                    className="absolute top-[50%] z-20 translate-y-[-50%] -right-[42px] sm:-right-13 md:-right-16 lg:-right-20 xl:text-5xl size-8 md:size-12 xl:size-16 flex items-center justify-center rounded-full hover:bg-bluegreen hover:text-secondary hover:scale-110 text-xl md:text-3xl cursor-pointer duration-300"
                >
                    <FaAngleRight />
                </button>
            </div>
        </Section>
    );
}

export default Home;
