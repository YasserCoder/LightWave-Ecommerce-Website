import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import Filter from "../Filter";
import { describe, vi, it, expect } from "vitest";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useSearchParams: vi.fn(),
    };
});
describe("Filter component", () => {
    const setSearchParams = vi.fn();
    const mockUseSearchParams = (params) => {
        useSearchParams.mockReturnValue([
            new URLSearchParams(params),
            setSearchParams,
        ]);
    };

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
    ];

    it("renders correctly with initial filter", () => {
        mockUseSearchParams({ filterField: "option1" });

        render(
            <MemoryRouter>
                <Filter filterField="filterField" options={options} />
            </MemoryRouter>
        );

        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("disables the button for the current filter", () => {
        mockUseSearchParams({ filterField: "option1" });

        render(
            <MemoryRouter>
                <Filter filterField="filterField" options={options} />
            </MemoryRouter>
        );

        expect(screen.getByText("Option 1")).toBeDisabled();
        expect(screen.getByText("Option 2")).not.toBeDisabled();
    });

    it("calls setSearchParams with the correct values when a button is clicked", () => {
        mockUseSearchParams({ filterField: "option1" });

        render(
            <MemoryRouter>
                <Filter filterField="filterField" options={options} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Option 2"));

        expect(setSearchParams).toHaveBeenCalledWith(
            new URLSearchParams({ filterField: "option2" })
        );
    });

    it("does not reset the page if it is not present in the search params", () => {
        mockUseSearchParams({ filterField: "option1" });

        render(
            <MemoryRouter>
                <Filter filterField="filterField" options={options} />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Option 2"));

        expect(setSearchParams).toHaveBeenCalledWith(
            new URLSearchParams({ filterField: "option2" })
        );
    });
});
