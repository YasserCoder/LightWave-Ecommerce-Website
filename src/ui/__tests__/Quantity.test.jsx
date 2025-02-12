import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Quantity from "../Quantity";

describe("Quantity Component", () => {
    let mockSetQte;

    beforeEach(() => {
        // Mock the setQte function
        mockSetQte = vi.fn();
    });

    it("renders the initial quantity correctly", () => {
        render(<Quantity qte={5} setQte={mockSetQte} />);

        // Ensure the input has the correct initial value
        const input = screen.getByRole("spinbutton"); // Input of type number
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue(5);

        // Ensure the decrement button is enabled
        const decrementButton = screen.getByText("ــ");
        expect(decrementButton).not.toBeDisabled();

        // Ensure the increment button is enabled
        const incrementButton = screen.getByText("+");
        expect(incrementButton).not.toBeDisabled();
    });

    it("disables the decrement button when quantity is 1", () => {
        render(<Quantity qte={1} setQte={mockSetQte} />);

        const decrementButton = screen.getByText("ــ");
        expect(decrementButton).toBeDisabled();
    });

    it("calls setQte with the correct value when increment button is clicked", () => {
        render(<Quantity qte={3} setQte={mockSetQte} />);

        const incrementButton = screen.getByText("+");

        // Simulate click on increment button
        fireEvent.click(incrementButton);

        // Verify setQte was called with the incremented value
        expect(mockSetQte).toHaveBeenCalledWith(4);
    });

    it("calls setQte with the correct value when decrement button is clicked", () => {
        render(<Quantity qte={3} setQte={mockSetQte} />);

        const decrementButton = screen.getByText("ــ");

        // Simulate click on decrement button
        fireEvent.click(decrementButton);

        // Verify setQte was called with the decremented value
        expect(mockSetQte).toHaveBeenCalledWith(2);
    });

    it("updates the value when typing in the input field", () => {
        render(<Quantity qte={3} setQte={mockSetQte} />);

        const input = screen.getByRole("spinbutton");

        // Simulate typing a new value into the input
        fireEvent.change(input, { target: { value: "7" } });

        // Verify setQte was called with the new value
        expect(mockSetQte).toHaveBeenCalledWith(7);
    });
});
