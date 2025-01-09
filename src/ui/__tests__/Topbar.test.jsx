import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useUser } from "../../hook/auth/useUser";
import Topbar from "../Topbar";

const MockTopbar = () => {
    return (
        <BrowserRouter>
            <Topbar />
        </BrowserRouter>
    );
};

vi.mock("../../hook/auth/useUser.js");

useUser.mockReturnValue({
    role: "",
});

describe("Testing Topbar", () => {
    it("test if the component is visible", () => {
        render(<MockTopbar />);
        const links = screen.getAllByRole("link");
        expect(links.length).toBe(2);
    });

    it("should not display the word 'new' when the user is not authenticated", () => {
        render(<MockTopbar />);
        const newText = screen.queryByText(/new/i);
        expect(newText).not.toBeInTheDocument();
    });
    it("should display the word 'new' when the user is authenticated", () => {
        useUser.mockReturnValue({
            user: {
                role: "authenticated",
            },
        });
        render(<MockTopbar />);
        const newText = screen.queryByText(/new/i);
        expect(newText).toBeInTheDocument();
    });
});
