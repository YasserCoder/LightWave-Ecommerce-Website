import { MemoryRouter } from "react-router-dom";
import ProdCard from "../ProdCard";
import { useUser } from "../../hook/auth/useUser";
import { useProductDetails } from "../../hook/products/useProductDetails";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";
import { fireEvent, render, screen } from "@testing-library/react";
import { useLikeItem } from "../../hook/wishlist/useLikeItem";
import { useDislikeItem } from "../../hook/wishlist/useDislikeItem";

vi.mock("../../hook/auth/useUser", () => ({
    useUser: vi.fn(),
}));
useUser.mockReturnValue({
    user: {
        id: "first",
        role: "authenticated",
    },
    isLoading: false,
});
vi.mock("../../hook/products/useProductDetails", () => ({
    useProductDetails: vi.fn(),
}));
useProductDetails.mockReturnValue({
    isLoading: false,
    productInfo: {
        name: "test01",
        price: 120,
        sale: 10,
        soldOut: false,
        category: ["sockets"],
        imgs: [
            {
                imgUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
                imgAlt: "image",
            },
        ],
        inWishlist: [],
    },
});

vi.mock("../../hook/cart/useAddCartItem", () => ({
    useAddCartItem: vi.fn(),
}));
vi.mock("../../hook/cart/useAddLocalCartItem", () => ({
    useAddLocalCartItem: vi.fn(),
}));

vi.mock("../../hook/wishlist/useLikeItem", () => ({
    useLikeItem: vi.fn(),
}));

vi.mock("../../hook/wishlist/useDislikeItem", () => ({
    useDislikeItem: vi.fn(),
}));

describe("ProdCard Component", () => {
    let mockAddCartItem;
    let mockAddLocalCartItem;
    let mockLikeItem;
    let mockDislikeItem;

    beforeEach(() => {
        mockAddCartItem = vi.fn();
        mockAddLocalCartItem = vi.fn();
        mockLikeItem = vi.fn();
        mockDislikeItem = vi.fn();

        useAddCartItem.mockReturnValue({
            isInserting: false,
            addCartItem: mockAddCartItem,
        });
        useAddLocalCartItem.mockReturnValue({
            isAdding: false,
            addLocalCartItem: mockAddLocalCartItem,
        });
        useLikeItem.mockReturnValue({
            likeItem: mockLikeItem,
            isLiking: false,
        });
        useDislikeItem.mockReturnValue({
            dislikeItem: mockDislikeItem,
            isDisiking: false,
        });
    });
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("rendring elements", () => {
        render(
            <MemoryRouter>
                <ProdCard id={1} />;
            </MemoryRouter>
        );

        const name = screen.getByRole("link", { name: /test01/i });
        expect(name).toBeInTheDocument();

        const img = screen.getByRole("img", { name: "product-image" });
        expect(img).toBeInTheDocument();

        const category = screen.getByRole("link", { name: "sockets" });
        expect(category).toBeInTheDocument();
    });
    it("adding elements to the cart for the authenticated users", () => {
        render(
            <MemoryRouter>
                <ProdCard id={1} />;
            </MemoryRouter>
        );

        const addToCartBtn = screen.getByRole("button");
        fireEvent.click(addToCartBtn);

        expect(mockAddCartItem).toBeCalledWith({
            userId: "first",
            productId: 1,
        });
    });
    it("adding elements to the local cart for the anon users", () => {
        useUser.mockReturnValue({});
        render(
            <MemoryRouter>
                <ProdCard id={1} />;
            </MemoryRouter>
        );

        const addToCartBtn = screen.getByRole("button");
        fireEvent.click(addToCartBtn);

        expect(mockAddLocalCartItem).toBeCalledWith({
            productId: 1,
            quantity: 1,
        });
    });
    it("like & dislike products", () => {
        useUser.mockReturnValue({
            user: {
                id: "first",
                role: "authenticated",
            },
            isLoading: false,
        });
        render(
            <MemoryRouter>
                <ProdCard id={1} />;
            </MemoryRouter>
        );

        const checkbox = screen.getByRole("checkbox");

        expect(checkbox.checked).toBeFalsy();

        // simulate clicking on the checkbox
        fireEvent.click(checkbox);

        expect(mockLikeItem).toBeCalledWith({
            productId: 1,
            userId: "first",
        });
        // simulate clicking on the checkbox again
        fireEvent.click(checkbox);

        expect(mockDislikeItem).toBeCalledWith({
            productId: 1,
            userId: "first",
        });
    });
});
