import { render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import About from "../About";
import { describe, expect, it, vi } from "vitest";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useLocation: vi.fn(),
    };
});

describe("About Component", () => {
    it("renders the About component By default", () => {
        useLocation.mockReturnValue({ pathname: "/about/whoarewe" });
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", { name: "who are we" }));
        expect(
            screen.queryByRole("heading", { name: /payment/i })
        ).not.toBeInTheDocument();
    });
    it("renders the About component With the correct section", () => {
        useLocation.mockReturnValue({ pathname: "/about/payment" });
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );
        expect(screen.getByRole("heading", { name: "payment" }));
        expect(
            screen.queryByRole("heading", { name: /who are we/i })
        ).not.toBeInTheDocument();
    });
    it("changes the color of the active section link", () => {
        useLocation.mockReturnValue({ pathname: "/about/delivery" });
        render(
            <MemoryRouter>
                <About />
            </MemoryRouter>
        );
        expect(screen.getByTestId(/delivery/i)).toHaveClass("bg-bluegreen");
        expect(screen.getByTestId(/payment/i)).not.toHaveClass("bg-bluegreen");
    });
});
