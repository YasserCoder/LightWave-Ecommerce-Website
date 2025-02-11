import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useLogin } from "../../hook/auth/useLogin";
import Login from "../Login";

vi.mock("../../hook/auth/useLogin");

describe("Login Component", () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        useLogin.mockReturnValue({
            login: mockLogin,
            isLoading: false,
        });
    });

    it("renders login form", () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /login/i })
        ).toBeInTheDocument();
    });

    it("submits the form with valid data", () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const emailInput = screen.getByLabelText(/email/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalledWith(
            { email: "test@example.com", password: "password123" },
            expect.any(Object)
        );
    });

    it("does not submit the form with empty fields", () => {
        render(
            <Router>
                <Login />
            </Router>
        );

        const loginButton = screen.getByRole("button", { name: /login/i });
        fireEvent.click(loginButton);

        expect(mockLogin).not.toHaveBeenCalled();
    });

    it("displays loading state", () => {
        useLogin.mockReturnValue({
            login: mockLogin,
            isLoading: true,
        });

        render(
            <Router>
                <Login />
            </Router>
        );

        const loginButton = screen.getByRole("button", { name: /login/i });
        expect(loginButton).toBeDisabled();
    });
});
