import { render, screen, fireEvent } from "@testing-library/react";
import {
    MemoryRouter as Router,
    useLocation,
    useNavigate,
} from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import SideBar from "../SideBar";

vi.mock("react-router-dom", async () => {
    const original = await vi.importActual("react-router-dom");
    return {
        ...original,
        useNavigate: vi.fn(),
        useLocation: vi.fn(),
    };
});

useLocation.mockReturnValue({ pathname: "/shop" });
const mockCats = {
    Lighting: { Lamps: { "Desk Lamps": "", "Wall Lamps": "" } },
    Sockets: "",
    Tools: { "Hand Tools": { Screwdrivers: "" } },
};

describe("Sidebar Component", () => {
    it("renders Sidebar component", () => {
        render(
            <Router>
                <SideBar cats={mockCats} />
            </Router>
        );

        expect(screen.getByText("Lighting")).toBeInTheDocument();
        expect(screen.getByText("Sockets")).toBeInTheDocument();
        expect(screen.getByText("Tools")).toBeInTheDocument();
    });

    it("opens and closes menu items", () => {
        render(
            <Router>
                <SideBar cats={mockCats} />
            </Router>
        );

        const lightingButton = screen.getByTestId("Lighting");
        fireEvent.click(lightingButton);

        expect(screen.getByText("Lamps")).toBeInTheDocument();

        const lampsButton = screen.getByTestId("Lamps");
        fireEvent.click(lampsButton);

        expect(screen.getByText("Desk Lamps")).toBeInTheDocument();
        expect(screen.getByText("Wall Lamps")).toBeInTheDocument();

        fireEvent.click(lightingButton);

        expect(screen.queryByText("Lamps")).not.toBeInTheDocument();
        expect(screen.queryByText("Desk Lamps")).not.toBeInTheDocument();
        expect(screen.queryByText("Wall Lamps")).not.toBeInTheDocument();
    });

    it("navigates to category on click", () => {
        let mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        render(
            <Router>
                <SideBar cats={mockCats} />
            </Router>
        );

        const lightingButton = screen.getByTestId("Lighting");
        fireEvent.click(lightingButton);

        const lampsButton = screen.getByTestId("Lamps");
        fireEvent.click(lampsButton);

        fireEvent.click(screen.getByText("Desk Lamps"));
        expect(mockNavigate).toHaveBeenCalledWith("Lighting/Lamps/Desk Lamps");
    });

    it("activate the selected button", () => {
        useLocation.mockReturnValue({
            pathname: "/shop/Lighting/Lamps/Desk%20Lamps",
        });
        render(
            <Router>
                <SideBar cats={mockCats} />
            </Router>
        );

        const lightingButton = screen.getByTestId("Lighting");
        fireEvent.click(lightingButton);

        const lampsButton = screen.getByTestId("Lamps");
        fireEvent.click(lampsButton);

        expect(screen.getByText("Desk Lamps")).toHaveClass("activebtn");
        expect(screen.getByText("Lamps")).toHaveClass("activebtn");
        expect(screen.getByText("Lighting")).toHaveClass("activebtn");
        expect(screen.getByText("Desk Lamps")).toBeDisabled();
    });
});
