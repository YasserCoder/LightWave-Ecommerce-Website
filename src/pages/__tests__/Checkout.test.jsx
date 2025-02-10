import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../hook/auth/useUser";
import { useAddOrder } from "../../hook/useAddOrder";
import { useDeleteCart } from "../../hook/cart/useDeleteCart";
import { useDeleteLocalCart } from "../../hook/cart/useDeleteLocalCart";
import Checkout from "../Checkout";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});

vi.mock("../../hook/auth/useUser");
vi.mock("../../hook/useAddOrder");
vi.mock("../../hook/cart/useDeleteCart");
vi.mock("../../hook/cart/useDeleteLocalCart");

useLocation.mockReturnValue({ state: {} });

useUser.mockReturnValue({
    user: { id: 1, role: "authenticated" },
    isLoading: false,
});

useAddOrder.mockReturnValue({
    addOrder: vi.fn(),
    isInserting: false,
});

useDeleteCart.mockReturnValue({
    deleteCart: vi.fn(),
    isDeleting: false,
});

useDeleteLocalCart.mockReturnValue({
    deleteLocalCart: vi.fn(),
    isErasing: false,
});

const fillTheForm = ({
    name,
    email,
    phone,
    country,
    city,
    postCode,
    adress,
    note,
}) => {
    fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
        target: { value: name || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
        target: { value: email || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /phone/i }), {
        target: { value: phone || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /country/i }), {
        target: { value: country || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /city/i }), {
        target: { value: city || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /adress/i }), {
        target: { value: adress || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /post code/i }), {
        target: { value: postCode || "" },
    });
    fireEvent.change(screen.getByRole("textbox", { name: /order notes/i }), {
        target: { value: note || "" },
    });
};

describe("Checkout Component", () => {
    it("renders the checkout form", () => {
        render(<Checkout />);

        expect(screen.getByText(/Billing & Shipping/i)).toBeInTheDocument();
        expect(
            screen.getByRole("heading", { name: /your order/i })
        ).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
    it("changes the state of the button depending on the obligatory inputs", () => {
        render(<Checkout />);

        expect(screen.getByRole("button")).toBeDisabled();

        fillTheForm({
            name: "yasser",
            phone: "0552955965",
            country: "DZ",
            city: "JGJ",
        });

        expect(screen.getByRole("button")).toBeEnabled();
    });
    it("renders the order info correctly", () => {
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
    it("renders the error message when submit with invalid information", () => {
        render(<Checkout />);

        expect(screen.queryByText(/\*\*/i)).not.toBeInTheDocument();
        fillTheForm({
            name: "yasser",
            email: "yasser@example.com",
            phone: "0552955965",
            country: "DZ",
            city: "JGJ",
            adress: "JGJ,s,s",
            postCode: "jqjjj",
        });
        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText(/\*\*/i)).toBeInTheDocument();
        expect(screen.getByText(/\*\*/i)).toHaveTextContent(
            "**invalide Post Code"
        );

        fillTheForm({
            name: "yasser",
            email: "yasser@example.com",
            phone: "jkswkxw",
            country: "DZ",
            city: "JGJ",
            adress: "JGJ,s,s",
            postCode: "12345",
        });
        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText(/\*\*/i)).toHaveTextContent(
            "**Invalid phone number"
        );
    });
    it("calls the addOrder function when submit with valid informations", () => {
        let mockAddOrder = vi.fn();
        let mockDeleteCart = vi.fn();
        useAddOrder.mockReturnValue({
            addOrder: mockAddOrder,
            isInserting: false,
        });
        useDeleteCart.mockReturnValue({
            deleteCart: mockDeleteCart,
            isDeleting: false,
        });
        render(<Checkout />);

        fillTheForm({
            name: "yasser",
            email: "yasser@example.com",
            phone: "0552955965",
            country: "DZ",
            city: "JGJ",
            adress: "JGJ,s,s",
            postCode: "12345",
        });
        fireEvent.click(screen.getByRole("button"));

        expect(mockAddOrder).toHaveBeenCalled();
        expect(mockDeleteCart).not.toHaveBeenCalled();
    });
    it("calls the DeleteCart function when the user is authenticated and the source equals 'cart", async () => {
        let mockAddOrder = vi.fn((_, options) => {
            if (options?.onSuccess) options.onSuccess();
        });
        let mockDeleteCart = vi.fn();
        let mockDeleteLocalCart = vi.fn();
        let mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        useAddOrder.mockReturnValue({
            addOrder: mockAddOrder,
            isInserting: false,
        });
        useDeleteCart.mockReturnValue({
            deleteCart: mockDeleteCart,
            isDeleting: false,
        });
        useDeleteLocalCart.mockReturnValue({
            deleteLocalCart: mockDeleteLocalCart,
            isErasing: false,
        });
        useLocation.mockReturnValue({
            state: {
                source: "cart",
            },
        });
        render(<Checkout />);

        fillTheForm({
            name: "yasser",
            email: "yasser@example.com",
            phone: "0552955965",
            country: "DZ",
            city: "JGJ",
            adress: "JGJ,s,s",
            postCode: "12345",
        });
        fireEvent.click(screen.getByRole("button"));

        expect(mockAddOrder).toHaveBeenCalled();
        expect(mockDeleteCart).toHaveBeenCalledWith(1);
        expect(mockDeleteLocalCart).not.toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
    it("calls the DeleteLocalCart function when the user is non authenticated and the source equals 'cart", async () => {
        let mockAddOrder = vi.fn((_, options) => {
            if (options?.onSuccess) options.onSuccess();
        });
        let mockDeleteCart = vi.fn();
        let mockDeleteLocalCart = vi.fn();
        let mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        useUser.mockReturnValue({});
        useAddOrder.mockReturnValue({
            addOrder: mockAddOrder,
            isInserting: false,
        });
        useDeleteCart.mockReturnValue({
            deleteCart: mockDeleteCart,
            isDeleting: false,
        });
        useDeleteLocalCart.mockReturnValue({
            deleteLocalCart: mockDeleteLocalCart,
            isErasing: false,
        });
        useLocation.mockReturnValue({
            state: {
                source: "cart",
            },
        });
        render(<Checkout />);

        fillTheForm({
            name: "yasser",
            email: "yasser@example.com",
            phone: "0552955965",
            country: "DZ",
            city: "JGJ",
            adress: "JGJ,s,s",
            postCode: "12345",
        });
        fireEvent.click(screen.getByRole("button"));

        expect(mockAddOrder).toHaveBeenCalled();
        expect(mockDeleteCart).not.toHaveBeenCalled();
        expect(mockDeleteLocalCart).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });
});
