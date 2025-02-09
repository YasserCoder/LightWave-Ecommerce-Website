import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLocation } from "react-router-dom";
import { useUser } from "../../hook/auth/useUser";
import Checkout from "../Checkout";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});

useLocation.mockReturnValue({ state: {} });

vi.mock("../../hook/auth/useUser", () => ({
    useUser: vi.fn(),
}));

vi.mock("../../hook/useAddOrder", () => ({
    useAddOrder: () => ({
        addOrder: vi.fn(),
        isInserting: false,
    }),
}));

vi.mock("../../hook/cart/useDeleteCart", () => ({
    useDeleteCart: () => ({
        deleteCart: vi.fn(),
        isDeleting: false,
    }),
}));
vi.mock("../../hook/cart/useDeleteLocalCart", () => ({
    useDeleteLocalCart: () => ({
        deleteLocalCart: vi.fn(),
        isErasing: false,
    }),
}));

describe("Checkout Component", () => {
    it("renders the checkout form", () => {
        useUser.mockReturnValue({ user: { id: 1 }, isLoading: false });
        render(<Checkout />);

        expect(screen.getByText(/Billing & Shipping/i)).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: /your order/i })
        ).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    it("changes the state of the button depending on the obligatory inputs", () => {
        useUser.mockReturnValue({ user: { id: 1 }, isLoading: false });
        render(<Checkout />);

        expect(screen.getByRole("button")).toBeDisabled();

        fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
            target: { value: "yasser" },
        });
        fireEvent.change(screen.getByRole("textbox", { name: /phone/i }), {
            target: { value: "0552955965" },
        });
        fireEvent.change(screen.getByRole("textbox", { name: /country/i }), {
            target: { value: "DZ" },
        });
        fireEvent.change(screen.getByRole("textbox", { name: /city/i }), {
            target: { value: "JGJ" },
        });

        expect(screen.getByRole("button")).toBeEnabled();
    });
    it("renders the order info correctly", () => {
        useUser.mockReturnValue({ user: { id: 1 }, isLoading: false });
        useLocation.mockReturnValue({
            state: {
                priceS: 30,
                prodInfo: [
                    { name: "prod1", qte: 2 },
                    { name: "prod2", qte: 1 },
                ],
                delivery: "Stop Desk",
                source: "",
                deliveryCost: "normal",
            },
        });
        render(<Checkout />);

        expect(screen.getByText("prod1")).toBeInTheDocument();
        expect(screen.getByText("prod2")).toBeInTheDocument();

        expect(screen.getByTestId("sub-total")).toHaveTextContent("$30.00");
        expect(screen.getByTestId("total-amount")).toHaveTextContent("$35.00");

        expect(screen.getByRole("combobox")).toHaveValue("Stop Desk");
    });
});
