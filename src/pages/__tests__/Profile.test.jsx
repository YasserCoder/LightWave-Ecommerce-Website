import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useUser } from "../../hook/auth/useUser";
import { useUpdateUser } from "../../hook/auth/useUpdateUser";
import Profile from "../Profile";

vi.mock("../../hook/auth/useUser");
vi.mock("../../hook/auth/useUpdateUser");

describe("Profile Component", () => {
    beforeEach(() => {
        useUser.mockReturnValue({
            isLoading: false,
            user: {
                role: "authenticated",
                email: "test@example.com",
                user_metadata: {
                    name: "Test User",
                    email: "test@example.com",
                    phone: "1234567890",
                    country: "Test Country",
                    city: "Test City",
                    adress: "Test Address",
                    postCode: "12345",
                    pwd: "oldpassword",
                },
            },
        });

        useUpdateUser.mockReturnValue({
            updateUser: vi.fn(),
            isUpdating: false,
        });
    });

    it("renders Profile component", () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        expect(
            screen.getByRole("heading", { name: /profile/i })
        ).toBeInTheDocument();
        expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/old password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/new password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/repeat password/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/city \/ state/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/post code/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/adress/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("disable the button when the old pwd is empty", () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/old password/i), {
            target: { value: "" },
        });

        expect(screen.getByRole("button")).toBeDisabled();
    });
    it("displays error message when required fields are missing", () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByLabelText(/old password/i), {
            target: { value: "slsk" },
        });
        fireEvent.click(screen.getByText(/save informations/i));

        expect(
            screen.getByText(/fill all the nessecary cases/i)
        ).toBeInTheDocument();
    });

    it("displays error message for wrong old password", () => {
        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/old password/i), {
            target: { value: "wrongpassword" },
        });
        fireEvent.click(screen.getByRole("button"));

        expect(screen.getByText(/wrong old password/i)).toBeInTheDocument();
    });

    it("calls updateUser with correct data", () => {
        const updateUserMock = vi.fn();
        useUpdateUser.mockReturnValue({
            updateUser: updateUserMock,
            isUpdating: false,
        });

        render(
            <Router>
                <Profile />
            </Router>
        );

        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "Updated User" },
        });
        fireEvent.change(screen.getByLabelText(/phone/i), {
            target: { value: "0123456789" },
        });
        fireEvent.change(screen.getByLabelText(/old password/i), {
            target: { value: "oldpassword" },
        });
        fireEvent.click(screen.getByRole("button"));

        expect(updateUserMock).toHaveBeenCalledWith({
            name: "Updated User",
            phone: "0123456789",
        });
    });
});
