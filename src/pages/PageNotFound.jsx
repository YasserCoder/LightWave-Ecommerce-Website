import { Link } from "react-router-dom";

import imgNotFound from "../assets/imgNotFound.png";

function PageNotFound() {
    return (
        <div className="h-screen bg-[#f9f9f9] flex items-center relative">
            <img
                src={imgNotFound}
                alt="img"
                className="absolute w-fit left-0 lg:left-8 xl:left-20 top-0 h-full z-0 "
            />
            <div className="container flex justify-center">
                <div className=" z-10 bg-white rounded-xl flex flex-col gap-4 justify-center items-center w-fit py-4 px-12">
                    <h1 className="text-8xl font-extrabold">404</h1>
                    <h2 className="text-5xl font-bold uppercase my-5 text-center">
                        page not found
                    </h2>
                    <p className="text-center">
                        We are sorry ,the page you requested could not be found
                    </p>
                    <p className="text-center">
                        Please go back to the home page
                    </p>
                    <Link
                        to={"/home"}
                        className="uppercase py-3 px-6 bg-bluegreen text-white font-semibold rounded-2xl"
                    >
                        go home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
