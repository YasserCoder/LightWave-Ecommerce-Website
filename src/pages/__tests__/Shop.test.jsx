import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    MemoryRouter,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { useCategories } from "../../hook/useCategories";
import { useGetProducts } from "../../hook/products/useGetProducts";
import { useScreenSize } from "../../hook/useScreenSize";
import { useUser } from "../../hook/auth/useUser";
import { useDislikeItem } from "../../hook/wishlist/useDislikeItem";
import { useLikeItem } from "../../hook/wishlist/useLikeItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import { useProductDetails } from "../../hook/products/useProductDetails";
import Shop from "../Shop";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useSearchParams: vi.fn(),
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});
vi.mock("../../hook/useCategories");
vi.mock("../../hook/products/useGetProducts");
vi.mock("../../hook/useScreenSize");
vi.mock("../../hook/auth/useUser");
vi.mock("../../hook/products/useProductDetails");
vi.mock("../../hook/cart/useAddCartItem");
vi.mock("../../hook/cart/useAddLocalCartItem");
vi.mock("../../hook/wishlist/useLikeItem");
vi.mock("../../hook/wishlist/useDislikeItem");

const productInfo = {
    name: "prod01",
    price: 120,
    sale: 10,
    soldOut: false,
    category: ["sockets"],
    imgs: [],
    inWishlist: [],
};

const mockCategories = {
    isLoading: false,
    cats: {
        Electronics: { Phones: "", Laptops: "" },
        Clothing: { Men: "", Women: "" },
    },
};

const mockProducts = {
    isLoading: false,
    products: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
    ],
    count: 2,
};
let mockNavigate = vi.fn();
const mockUser = { user: { id: 1, role: "authenticated" }, isLoading: false };
describe("Shop Component", () => {
    const setSearchParams = vi.fn();
    const mockUseSearchParams = (params) => {
        useSearchParams.mockReturnValue([
            new URLSearchParams(params),
            setSearchParams,
        ]);
    };
    beforeEach(() => {
        useCategories.mockReturnValue(mockCategories);
        useUser.mockReturnValue(mockUser);
        useGetProducts.mockReturnValue(mockProducts);
        useScreenSize.mockReturnValue({ screenSize: false });
        useLocation.mockReturnValue({ pathname: "/shop" });
        useNavigate.mockReturnValue(mockNavigate);
        mockUseSearchParams({});
        useProductDetails.mockReturnValue({
            isLoading: false,
            productInfo,
        });
        useAddCartItem.mockReturnValue({
            isInserting: false,
            addCartItem: vi.fn(),
        });
        useAddLocalCartItem.mockReturnValue({
            isAdding: false,
            addLocalCartItem: vi.fn(),
        });
        useLikeItem.mockReturnValue({
            likeItem: vi.fn(),
            isLiking: false,
        });
        useDislikeItem.mockReturnValue({
            dislikeItem: vi.fn(),
            isDisiking: false,
        });
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("renders shop elements", () => {
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("categories")).toBeInTheDocument();
        expect(screen.getByText(/our products/i)).toBeInTheDocument();
    });

    it("renders empty category message when no products", () => {
        useGetProducts.mockReturnValue({
            isLoading: false,
            products: [],
            count: 0,
        });
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        expect(screen.getByText("Empty Category")).toBeInTheDocument();
    });
    it("renders product not found message when no products with that name", () => {
        mockUseSearchParams({ q: "rare product" });
        useGetProducts.mockReturnValue({
            isLoading: false,
            products: [],
            count: 0,
        });
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        expect(screen.getByText(/product not found/i)).toBeInTheDocument();
        expect(screen.queryByText("Empty Category")).not.toBeInTheDocument();
    });

    it.only("navigate to category when clicking on it", () => {
        render(
            <MemoryRouter>
                <Shop />
            </MemoryRouter>
        );
        const category = within(screen.getByTestId("sidebar")).getByText(
            "Electronics"
        );
        expect(category).toBeInTheDocument();
        fireEvent.click(category);
        expect(mockNavigate).toHaveBeenCalledWith("Electronics");
    });
});
