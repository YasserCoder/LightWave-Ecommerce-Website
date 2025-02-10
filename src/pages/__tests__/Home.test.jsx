import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { useGetDeal } from "../../hook/deal/useGetDeal";
import { useAnouncementProducts } from "../../hook/products/useAnouncementProduts";
import { useGetDeals } from "../../hook/deal/useGetDeals";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUser } from "../../hook/auth/useUser";
import { useProductDetails } from "../../hook/products/useProductDetails";
import { useDislikeItem } from "../../hook/wishlist/useDislikeItem";
import { useLikeItem } from "../../hook/wishlist/useLikeItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import Home from "../Home";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
    };
});
vi.mock("../../hook/deal/useGetDeal");
vi.mock("../../hook/products/useAnouncementProduts");
vi.mock("../../hook/deal/useGetDeals");
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

describe("Home Component", () => {
    beforeEach(() => {
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
        useUser.mockReturnValue({});

        useAnouncementProducts.mockReturnValue({
            isLoading: false,
            products: [{ id: 1 }],
        });

        useGetDeals.mockReturnValue({
            isGetting: false,
            deals: [{ id: 1 }, { id: 2 }],
        });

        useGetDeal.mockReturnValueOnce({
            isGetting: false,
            deal: {
                id: 1,
                amount: 100,
                img: "deal1.jpg",
                deliveryCost: "free",
                dealItems: [
                    { product: { id: 1, name: "Product 1" }, quantity: 2 },
                ],
            },
        });
        useGetDeal.mockReturnValueOnce({
            isGetting: false,
            deal: {
                id: 2,
                amount: 150,
                img: "deal2.jpg",
                deliveryCost: "normal",
                dealItems: [
                    { product: { id: 2, name: "Product 2" }, quantity: 1 },
                ],
            },
        });
    });

    it("renders Home components", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText(/lightwave/i)).toBeInTheDocument();
        expect(screen.getByText(/Our Services/i)).toBeInTheDocument();
        expect(screen.getByText(/latest products/i)).toBeInTheDocument();
        expect(screen.getByText(/sale products/i)).toBeInTheDocument();
        expect(screen.getByText(/best deals/i)).toBeInTheDocument();
        expect(screen.getAllByText(/load more/i)).toHaveLength(2);
    });

    it("renders products in Anouncement component", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(
            within(screen.getByTestId(/latest/i)).getByText(/prod01/i)
        ).toBeInTheDocument();
        expect(
            within(screen.getByTestId(/sale/i)).getByText(/prod01/i)
        ).toBeInTheDocument();
    });

    it("renders deals in BestDeals component", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByTestId("deal-1")).toBeInTheDocument();
        expect(screen.getByTestId("deal-2")).toBeInTheDocument();
    });
    it("navigates to checkout page when click on order btn ", () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );
        const orderBtn = within(screen.getByTestId("deal-1")).getByRole(
            "button"
        );
        expect(orderBtn).toBeInTheDocument();

        fireEvent.click(orderBtn);

        expect(mockNavigate).toBeCalledWith("/checkout", {
            state: {
                priceS: 100,
                prodInfo: [
                    {
                        id: 1,
                        name: "Product 1",
                        qte: 2,
                    },
                ],
                source: "deals",
                deliveryCost: "free",
            },
        });
    });
});
