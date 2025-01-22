import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router, useNavigate } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Categories from "../Categories";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
    };
});

const mockCats = {
    Electronics: { Phones: "", Laptops: "" },
    Clothing: { Men: "", Women: "" },
};

describe("Categories Component", () => {
    it("renders Categories component", () => {
        render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        expect(screen.getByText("all")).toBeInTheDocument();
        expect(screen.getByText("Electronics")).toBeInTheDocument();
        expect(screen.getByText("Clothing")).toBeInTheDocument();
    });

    it("opens and closes category items", () => {
        render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        const electronicsButton = screen.getByTestId("Electronics");
        fireEvent.click(electronicsButton);

        expect(screen.getByText("Phones")).toBeInTheDocument();
        expect(screen.getByText("Laptops")).toBeInTheDocument();

        fireEvent.click(electronicsButton);

        expect(screen.queryByText("Phones")).not.toBeInTheDocument();
        expect(screen.queryByText("Laptops")).not.toBeInTheDocument();
    });

    it("navigates to category on click", () => {
        let mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        const electronicsButton = screen.getByTestId("Electronics");
        fireEvent.click(electronicsButton);

        const phonesButton = screen.getByText("Phones");
        fireEvent.click(phonesButton);

        expect(mockNavigate).toHaveBeenCalledWith("Electronics/Phones");
    });

    it("handles click outside to close open items", () => {
        render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        const electronicsButton = screen.getByTestId("Electronics");
        fireEvent.click(electronicsButton);

        expect(screen.getByText("Phones")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);

        expect(screen.queryByText("Phones")).not.toBeInTheDocument();
    });
});
