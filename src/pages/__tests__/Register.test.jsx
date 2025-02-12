import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { useSignUp } from "../../hook/auth/useSignUp";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Register from "../Register";

vi.mock("../../hook/auth/useSignUp");

describe("Register Component", () => {
    const mockSignUp = vi.fn();

    beforeEach(() => {
        useSignUp.mockReturnValue({
            signup: mockSignUp,
            isLoading: false,
        });
    });

    it("renders Register component", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText("password")).toBeInTheDocument();
        expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /sign up/i })
        ).toBeInTheDocument();
    });

    it("shows error message when fields are empty", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText(/fill all the cases/i)).toBeInTheDocument();
    });

    it("shows error message for invalid name", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "swjjsjsswjsw" },
        });
        fireEvent.change(screen.getByLabelText(/phone/i), {
            target: { value: "123655224" },
        });
        fireEvent.change(screen.getByLabelText("password"), {
            target: { value: "wkwlslsjs" },
        });
        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText(/invalide name/i)).toBeInTheDocument();
    });

    it("shows error message when passwords do not match", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "tester" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "tester@gmail.com" },
        });
        fireEvent.change(screen.getByLabelText(/phone/i), {
            target: { value: "123655224" },
        });
        fireEvent.change(screen.getByLabelText("password"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { value: "password456" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });

    it("calls signup function with correct data", () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "John Doe" },
        });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: "john@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/phone number/i), {
            target: { value: "1234567890" },
        });
        fireEvent.change(screen.getByLabelText("password"), {
            target: { value: "password123" },
        });
        fireEvent.change(screen.getByLabelText(/confirm password/i), {
            target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button"));

        expect(mockSignUp).toHaveBeenCalledWith(
            {
                email: "john@example.com",
                password: "password123",
                name: "John Doe",
                phone: "1234567890",
            },
            expect.any(Object)
        );
    });
});
