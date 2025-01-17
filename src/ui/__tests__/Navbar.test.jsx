import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { LocalStorageContext } from "../LocalStorageContext";
import { useUser } from "../../hook/auth/useUser";
import Navbar from "../Navbar";
import { useGetCartItems } from "../../hook/cart/useGetCartItems";

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

vi.mock("../../hook/cart/useGetCartItems", () => ({
    useGetCartItems: vi.fn(),
}));
useGetCartItems.mockReturnValue({
    isLoading: false,
    cartItems: ["socket", "switch"],
});

describe("Navbar component", () => {
    it("returns the right number of cart items when user is authenticated", () => {
        render(
            <MemoryRouter>
                <LocalStorageContext.Provider value={{ value: [] }}>
                    <Navbar />
                </LocalStorageContext.Provider>
            </MemoryRouter>
        );
        const cartItemsN = screen.getByTestId(/item number/i);
        expect(cartItemsN).toHaveTextContent("2");
    });
    it("returns the right number of cart items when user is not authenticated", () => {
        useUser.mockReturnValue({});
        render(
            <MemoryRouter>
                <LocalStorageContext.Provider value={{ value: [0] }}>
                    <Navbar />
                </LocalStorageContext.Provider>
            </MemoryRouter>
        );
        const cartItemsN = screen.getByTestId(/item number/i);
        expect(cartItemsN).toHaveTextContent("1");
    });
});
