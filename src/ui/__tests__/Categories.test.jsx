import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Categories from "../Categories";
import { describe, expect, it } from "vitest";

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

    it.skip("navigates to category on click", () => {
        const { container } = render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        const electronicsButton = screen.getByTestId("Electronics");
        fireEvent.click(electronicsButton);

        const phonesButton = screen.getByText("Phones");
        fireEvent.click(phonesButton);

        expect(container.innerHTML).toContain("/shop/Phones");
    });

    it.skip("handles click outside to close open items", () => {
        render(
            <Router>
                <Categories cats={mockCats} />
            </Router>
        );

        const electronicsButton = screen.getByTestId("Electronics");
        fireEvent.click(electronicsButton);

        expect(screen.getByText("Phones")).toBeInTheDocument();

        fireEvent.mouseDown(document);

        expect(screen.queryByText("Phones")).not.toBeInTheDocument();
    });
});
