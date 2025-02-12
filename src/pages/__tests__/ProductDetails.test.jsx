import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useLocation, useNavigate } from "react-router-dom";
import { useProductDetails } from "../../hook/products/useProductDetails";
import { useUser } from "../../hook/auth/useUser";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";
import { useSimilarProducts } from "../../hook/products/useSimilarProducts";
import { useLikeItem } from "../../hook/wishlist/useLikeItem";
import { useDislikeItem } from "../../hook/wishlist/useDislikeItem";
import ProductDetails from "../ProductDetails";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});

vi.mock("../../hook/products/useProductDetails");
vi.mock("../../hook/auth/useUser");
vi.mock("../../hook/cart/useAddCartItem");
vi.mock("../../hook/cart/useAddLocalCartItem");
vi.mock("../../hook/products/useSimilarProducts");
vi.mock("../../hook/wishlist/useLikeItem");
vi.mock("../../hook/wishlist/useDislikeItem");

const mockProductDetails = {
    brand: "Test Brand",
    category: ["Test Category"],
    imgs: [{ imgUrl: "test.jpg", imgAlt: "test image" }],
    description: "Test Description",
    sale: 10,
    price: 100,
    specifications: [{ key: "Weight", value: "1kg" }],
    garantee: "1 year",
    name: "Test Product",
    categoryId: 1,
    inWishlist: [],
};

const mockUser = {
    isLoading: false,
    user: { id: 1, role: "authenticated" },
};

const mockAddCartItem = {
    isInserting: false,
    addCartItem: vi.fn(),
};

const mockAddLocalCartItem = {
    isAdding: false,
    addLocalCartItem: vi.fn(),
};

const mockSimilarProducts = {
    isLoading: false,
    similarProducts: [{ id: 2 }],
};
const mockLikeItem = {
    likeItem: vi.fn(),
    isLiking: false,
};
const mockDislikeItem = {
    dislikeItem: vi.fn(),
    isDisiking: false,
};
const mockNavigate = vi.fn();

describe("ProductDetails Component", () => {
    beforeEach(() => {
        useProductDetails.mockReturnValue({
            isLoading: false,
            productInfo: mockProductDetails,
        });
        useUser.mockReturnValue(mockUser);
        useAddCartItem.mockReturnValue(mockAddCartItem);
        useAddLocalCartItem.mockReturnValue(mockAddLocalCartItem);
        useSimilarProducts.mockReturnValue(mockSimilarProducts);
        useLikeItem.mockReturnValue(mockLikeItem);
        useDislikeItem.mockReturnValue(mockDislikeItem);
        useLocation.mockReturnValue({ pathname: "product/1" });
        useNavigate.mockReturnValue(mockNavigate);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("renders product details correctly", () => {
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("link", { name: "Test Product" })
        ).toBeInTheDocument();
        expect(screen.getByText("Test Brand")).toBeInTheDocument();
        expect(screen.getByText("Test Description")).toBeInTheDocument();
        expect(screen.getByText("1 year warranty")).toBeInTheDocument();
        expect(screen.getByText(/our services/i)).toBeInTheDocument();
        expect(screen.getByText(/similar products/i)).toBeInTheDocument();
    });

    it("adds product to cart by default", () => {
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("add to cart"));
        expect(mockAddCartItem.addCartItem).toHaveBeenCalledWith({
            userId: 1,
            productId: 1,
            quantity: 1,
        });
    });
    it("adds product to cart after changing the quantity", () => {
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText("+"));
        fireEvent.click(screen.getByText("add to cart"));
        expect(mockAddCartItem.addCartItem).toHaveBeenCalledWith({
            userId: 1,
            productId: 1,
            quantity: 2,
        });
    });
    it("calls addLocalCartItem if the user is not authenticated", () => {
        useUser.mockReturnValue({});
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByRole("spinbutton"), {
            target: { value: 5 },
        });
        fireEvent.click(screen.getByText("add to cart"));
        expect(mockAddLocalCartItem.addLocalCartItem).toHaveBeenCalledWith({
            productId: 1,
            quantity: 5,
        });
    });

    it("navigates to checkout page when clicking at buy now btn", () => {
        render(
            <MemoryRouter>
                <ProductDetails />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: /buy now/i }));
        expect(mockNavigate).toHaveBeenCalledWith("/checkout", {
            state: {
                priceS: 90,
                prodInfo: [{ id: 1, name: "Test Product", qte: 1, price: 90 }],
                source: "prodDetails",
                deliveryCost: "normal",
            },
        });
    });
});
