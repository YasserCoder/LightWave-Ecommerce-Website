import { MdOpenInNew } from "react-icons/md";
import background from "./../assets/backwhite.jpg";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Hero() {
    const navigate = useNavigate();
    function handleClick() {
        navigate("/shop");
    }
    return (
        <section className="w-full bg-[#f9f9f9]   bg-opacity-80 overflow-hidden mb-[40px] md:mb-[60px] xl:mb-[90px]">
            <div className="relative container min-h-[350px] max-h-[500px] flex justify-center overflow-hidden">
                <img
                    src={background}
                    alt="back"
                    className="w-full object-cover h-auto"
                />
                <div className="absolute text-lg left-[8%] md:left-16 lg:left-32 text-[#939b9b] top-[50%] lg:text-xl translate-y-[-50%] max-w-[55%] lg:max-w-[500px] space-y-3  sm:space-y-5 lg:space-y-8">
                    <p>
                        Welcome to{" "}
                        <span className="uppercase text-bluegreen text-xl sm:text-3xl lg:text-5xl font-bold">
                            LIGHTWAVE
                        </span>
                    </p>
                    <p className="">
                        your premier destination for high-quality electrical
                        supplies
                        <span className="hidden sm:inline">
                            , illuminating your path to sustainable solutions
                        </span>
                        .
                    </p>
                    <p className="text-base translate-y-4 md:translate-y-8 lg:translate-y-12">
                        <Button
                            handle={handleClick}
                            btnstyle=" flex items-center px-[12px] gap-2 rounded-lg active:bg-bluegreen hover:bg-hovercol hover:text-bluegreen active:text-secondary"
                        >
                            Shop now <MdOpenInNew />
                        </Button>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Hero;
