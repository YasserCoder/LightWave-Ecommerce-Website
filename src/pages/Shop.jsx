import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import { useScreenSize } from "../hook/useScreenSize";
import { useCategories } from "../hook/useCategories";
import { getProducts } from "../services/apiProducts";

import Path from "../ui/Path";
import SideBar from "../ui/SideBar";
import Categories from "./../ui/Categories";
import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import ProdCard from "../ui/ProdCard";
import Pagination from "../ui/Pagination";
import Loader from "../ui/Loader";

import { BsSortUp } from "react-icons/bs";
import { MdSearchOff } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";

function Shop() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const location = useLocation();
    const pathParts = location.pathname
        .split("/")
        .filter((part) => part !== "")
        .map((e) => {
            return e.includes("%20") ? e.replaceAll("%20", " ") : e;
        });

    const { isLoading, cats } = useCategories();

    if (isLoading) return <Loader />;

    return (
        <div className="py-4  container">
            <Path dest={[...pathParts]} />
            <div className="my-6  flex flex-col gap-10 lg:flex-row">
                {!isMediumScreen && <SideBar cats={cats} />}
                <Products category={pathParts.at(-1)} cats={cats} />
            </div>
        </div>
    );
}

function Products({ category, cats }) {
    const { screenSize: isSmallScreen } = useScreenSize(540);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function getProductsByCat(category) {
        setIsLoading(true);
        const data = await getProducts(category);
        setProducts(data);
        setIsLoading(false);
    }
    useEffect(() => {
        getProductsByCat(category);
    }, [category]);

    console.log(products);
    return !query ? (
        <section className={`w-full overflow-x-hidden space-y-10`}>
            <Categories cats={cats} />
            <div className="flex justify-between items-center">
                <div className="relative w-fit flex gap-2 sm:gap-3 items-baseline">
                    <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
                        {category === "shop" || category === "all"
                            ? "our Products"
                            : category}
                    </h1>
                    <span className="text-grey text-sm sm:text-lg ">{`${products.length} items`}</span>
                </div>
                {!isSmallScreen && (
                    <Filter
                        filterField="status"
                        options={[
                            { value: "all", label: "All" },
                            { value: "latest", label: "Latest" },
                            { value: "sale", label: "Sale" },
                        ]}
                    />
                )}
            </div>
            <div
                className={`relative bg-[#F5F5F5] shadow-md rounded py-4 px-5 flex items-center ${
                    isSmallScreen ? "justify-center" : "justify-between"
                }`}
            >
                {!isSmallScreen && <div>10 / 160</div>}

                <div className="flex items-center gap-2">
                    <p className="capitalize flex items-center font-semibold gap-1">
                        sort by
                        <BsSortUp />
                    </p>
                    <SortBy
                        options={[
                            {
                                value: "name-desc",
                                label: "Product Name : A-Z",
                            },
                            {
                                value: "name-asc",
                                label: "Product Name : Z-A",
                            },
                            {
                                value: "totalPrice-desc",
                                label: "Price : Heigh-Low ",
                            },
                            {
                                value: "totalPrice-asc",
                                label: "Price : Low-Heigh ",
                            },
                        ]}
                    />
                </div>
            </div>
            {isSmallScreen && (
                <Filter
                    filterField="status"
                    options={[
                        { value: "all", label: "All" },
                        { value: "latest", label: "Latest" },
                        { value: "sale", label: "Sale" },
                    ]}
                />
            )}
            {isLoading ? (
                <Loader />
            ) : products.length === 0 ? (
                <EmptyCategory />
            ) : (
                <>
                    <div className="grid grid-cols-200 gap-2 px-1 xs:px-2 pb-5 lg:pb-7">
                        {products?.map((prod) => {
                            return <ProdCard key={prod.id} id={prod.id} />;
                        })}
                    </div>

                    <Pagination count={products.length} />
                </>
            )}
        </section>
    ) : (
        <ItemNotFound query={query} />
    );
}

function ItemNotFound({ query }) {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-5">
            <MdSearchOff className="size-[160px] text-bluegreen opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5">
                product not found
            </h3>
            <p className="max-w-[170px] text-center">
                {`there is no product named ${query}`}
            </p>
        </div>
    );
}
function EmptyCategory() {
    return (
        <div className="w-full flex flex-col justify-center items-center gap-y-5">
            <FaBoxOpen className="size-[160px] text-bluegreen opacity-60 " />
            <h3 className="text-3xl capitalize font-bold pt-5">
                Empty Category
            </h3>
        </div>
    );
}

export default Shop;
