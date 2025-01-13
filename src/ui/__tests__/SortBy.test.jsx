import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import SortBy from "../SortBy";

// Mock react-router-dom and preserve all original exports
vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useSearchParams: vi.fn(), // Mock useSearchParams
    };
});

const MockSortBy = ({ options }) => {
    return (
        <MemoryRouter>
            <SortBy options={options} />
        </MemoryRouter>
    );
};

describe("SortBy component", () => {
    let mockSetSearchParams;

    beforeEach(() => {
        // Mock the setSearchParams function
        mockSetSearchParams = vi.fn();

        // Mock useSearchParams implementation
        useSearchParams.mockReturnValue([
            new URLSearchParams(),
            mockSetSearchParams,
        ]);
    });

    it("updates search params when the selected option changes", () => {
        const options = [
            { value: "price", label: "Price" },
            { value: "rating", label: "Rating" },
            { value: "popularity", label: "Popularity" },
        ];

        render(<MockSortBy options={options} />);

        const dropdown = screen.getByRole("combobox");

        // Simulate selecting an option
        fireEvent.change(dropdown, { target: { value: "price" } });
        expect(mockSetSearchParams).toHaveBeenCalledWith(
            expect.any(URLSearchParams)
        );

        // Check if the correct param is set
        const params = new URLSearchParams();
        params.set("sortBy", "price");
        expect(mockSetSearchParams).toHaveBeenCalledWith(params);

        // Simulate selecting another option
        fireEvent.change(dropdown, { target: { value: "rating" } });
        params.set("sortBy", "rating");
        expect(mockSetSearchParams).toHaveBeenCalledWith(params);
    });

    it('disables the dropdown if status is not "all"', () => {
        const options = [
            { value: "price", label: "Price" },
            { value: "rating", label: "Rating" },
        ];

        const searchParams = new URLSearchParams();
        searchParams.set("status", "completed");

        useSearchParams.mockReturnValue([searchParams, mockSetSearchParams]);

        render(<MockSortBy options={options} />);

        const dropdown = screen.getByRole("combobox");

        // Check if the dropdown is disabled
        expect(dropdown).toBeDisabled();
    });
});
