import { it } from "vitest";
import SortBy from "../SortBy";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const MockSortBy = ({ options }) => {
    return (
        <BrowserRouter>
            <SortBy options={options} />
        </BrowserRouter>
    );
};

it("should get select item", () => {
    render(<MockSortBy options={[]} />);
    screen.getByRole("combobox");
});
