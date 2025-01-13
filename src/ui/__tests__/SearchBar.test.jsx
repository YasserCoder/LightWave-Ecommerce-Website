import { render, screen, fireEvent } from "@testing-library/react";
import {
    MemoryRouter,
    useNavigate,
    useLocation,
    useSearchParams,
} from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchBar from "../SearchBar";
import { useScreenSize } from "../../hook/useScreenSize";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
        useSearchParams: vi.fn(),
    };
});

vi.mock("../../hook/useScreenSize", () => ({
    useScreenSize: vi.fn(),
}));

describe("SearchBar Component", () => {
    let mockSetSearchParams;
    let mockNavigate;

    beforeEach(() => {
        mockSetSearchParams = vi.fn();
        mockNavigate = vi.fn();

        useNavigate.mockReturnValue(mockNavigate);
        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            mockSetSearchParams,
        ]);
        useLocation.mockReturnValue({ pathname: "/" });
        useScreenSize.mockReturnValue({ screenSize: true });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the input and button", () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        expect(
            screen.getByPlaceholderText("Enter product name")
        ).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("updates input value when typing", () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Enter product name");
        fireEvent.change(input, { target: { value: "Laptop" } });
        expect(input.value).toBe("Laptop");
    });

    it("updates search params when submitting in the shop route", () => {
        useLocation.mockReturnValue({ pathname: "/shop" });

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Enter product name");
        fireEvent.change(input, { target: { value: "Laptop" } });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockSetSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        );
        expect(mockSetSearchParams).toHaveBeenCalledWith(
            new URLSearchParams({ q: "Laptop" })
        );
    });

    it("navigates to the shop route when submitting outside of shop", () => {
        useLocation.mockReturnValue({ pathname: "/" });

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText("Enter product name");
        fireEvent.change(input, { target: { value: "Laptop" } });

        const button = screen.getByRole("button");
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/shop?q=Laptop");
    });
});
