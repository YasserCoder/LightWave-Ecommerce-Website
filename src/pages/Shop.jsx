import { useScreenSize } from "../hook/useScreenSize";
import Path from "../ui/Path";
import SideBar from "../ui/SideBar";
// import Categories from "./../ui/Categories";
import CategoriesV1 from "./../ui/CategoriesV1";
import { BsSortUp } from "react-icons/bs";
import SortBy from "../ui/SortBy";
import Filter from "../ui/Filter";
import { useSearchParams } from "react-router-dom";

function Shop() {
    const { screenSize: isMediumScreen } = useScreenSize(1024);
    const [searchParams] = useSearchParams();
    const dest = ["shop"];
    let category = searchParams.get("category");
    if (category === "all") {
        category = null;
    }
    // console.log(dest);
    return (
        <>
            <div className="my-4  container">
                {/* <Categories /> */}
                <Path dest={[...dest, category]} />
                <div className="my-6  flex flex-col gap-10 lg:flex-row">
                    {!isMediumScreen && <SideBar />}
                    <Products category={category} />
                </div>
            </div>
        </>
    );
}

function Products({ category, itemsNum = 12000 }) {
    const { screenSize: isSmallScreen } = useScreenSize(540);

    return (
        <section className={`w-full overflow-x-hidden space-y-10`}>
            <CategoriesV1 />
            <div className="flex justify-between items-center">
                <div className="relative w-fit flex gap-2 sm:gap-3 items-baseline">
                    <h1 className="text-2xl sm:text-3xl font-extrabold capitalize">
                        {category === null ? "our Products" : category}
                    </h1>
                    {/* <span className="absolute w-[40%] h-[2px] bg-bluegreen left-0 -bottom-4"></span> */}
                    <span className="text-grey text-sm sm:text-lg ">{`${itemsNum} items`}</span>
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
        </section>
    );
}

export default Shop;
