import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { useScreenSize } from "../../hook/useScreenSize";
import BottomBar from "../BottomBar";

vi.mock("../../hook/useScreenSize", () => ({
    useScreenSize: vi.fn(),
}));

describe("BottomBar Component", () => {
    it("renders correctly in large screens", () => {
        useScreenSize.mockReturnValue({ screenSize: false });
        render(
            <MemoryRouter>
                <BottomBar />
            </MemoryRouter>
        );

        const home = screen.getByText(/home/i);
        expect(home).toBeInTheDocument();

        const shop = screen.getByText(/shop/i);
        expect(shop).toBeInTheDocument();

        const checkbox = screen.queryByRole("checkbox");
        expect(checkbox).not.toBeInTheDocument();

        const searchBar = screen.queryByRole("textbox");
        expect(searchBar).not.toBeInTheDocument();
    });
    it("renders correctly in small screens", () => {
        useScreenSize.mockReturnValue({ screenSize: true });
        render(
            <MemoryRouter>
                <BottomBar />
            </MemoryRouter>
        );

        const home = screen.queryByText(/home/i);
        expect(home).not.toBeInTheDocument();

        const shop = screen.queryByText(/shop/i);
        expect(shop).not.toBeInTheDocument();

        const checkbox = screen.queryByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        const searchBar = screen.getByRole("textbox");
        expect(searchBar).toBeInTheDocument();
    });
    it("renders correctly in small screens when checked and not checked", () => {
        useScreenSize.mockReturnValue({ screenSize: true });
        render(
            <MemoryRouter>
                <BottomBar />
            </MemoryRouter>
        );

        expect(screen.queryByText(/home/i)).not.toBeInTheDocument();

        const checkbox = screen.queryByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        fireEvent.click(checkbox);

        expect(screen.queryByText(/home/i)).toBeInTheDocument();

        fireEvent.click(document.body);

        expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    });
});
