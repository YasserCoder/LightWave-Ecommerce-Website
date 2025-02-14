import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { useGetLikedItems } from "../../hook/wishlist/useGetLikedItems";
import { useUser } from "../../hook/auth/useUser";
import { useLikeItem } from "../../hook/wishlist/useLikeItem";
import { useDislikeItem } from "../../hook/wishlist/useDislikeItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import { useProductDetails } from "../../hook/products/useProductDetails";
import WishList from "../WishList";

vi.mock("../../hook/wishlist/useGetLikedItems");
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

describe("WishList", () => {
    it("renders login prompt when user is not authenticated", () => {
        useUser.mockReturnValue({ isLoading: false, user: { role: "guest" } });
        useGetLikedItems.mockReturnValue({
            isLoading: false,
            wishlistItems: [],
        });

        render(
            <MemoryRouter>
                <WishList />
            </MemoryRouter>
        );

        expect(
            screen.getByText(/to get access to this page/i)
        ).toBeInTheDocument();
    });

    it("renders empty wishlist message when there are no items", () => {
        useUser.mockReturnValue({
            isLoading: false,
            user: { role: "authenticated" },
        });
        useGetLikedItems.mockReturnValue({
            isLoading: false,
            wishlistItems: [],
        });

        render(
            <MemoryRouter>
                <WishList />
            </MemoryRouter>
        );

        expect(
            screen.getByText(/your wish list is empty/i)
        ).toBeInTheDocument();
    });

    it("renders wishlist items when there are items", () => {
        useUser.mockReturnValue({
            isLoading: false,
            user: { id: 1, role: "authenticated" },
        });
        useGetLikedItems.mockReturnValue({
            isLoading: false,
            wishlistItems: [{ productId: 1 }, { productId: 2 }],
        });
        useProductDetails.mockReturnValue({
            isLoading: false,
            productInfo,
        });

        render(
            <MemoryRouter>
                <WishList />
            </MemoryRouter>
        );

        expect(screen.getAllByText(/prod01/i)).toHaveLength(2);
    });
});
