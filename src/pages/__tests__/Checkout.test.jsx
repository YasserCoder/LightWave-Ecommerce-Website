import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Checkout from "../Checkout";
import { useLocation } from "react-router-dom";
import { useUser } from "../../hook/auth/useUser";
// import { useAddOrder } from "../../hook/useAddOrder";

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

        expect(screen.getByRole("form")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });
});
