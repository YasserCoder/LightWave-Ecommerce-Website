import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "../Contact";
import { useSendMessage } from "../../hook/useSendMessage";
import { useUser } from "../../hook/auth/useUser";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../hook/useSendMessage");
vi.mock("../../hook/auth/useUser");

describe("Contact Component", () => {
    const mockSendMessage = vi.fn();
    const mockUser = {
        user_metadata: { name: "John Doe", phone: "1234567890" },
        email: "john.doe@example.com",
    };

    beforeEach(() => {
        useSendMessage.mockReturnValue({
            isSending: false,
            sendMessage: mockSendMessage,
        });
        useUser.mockReturnValue({
            isLoading: false,
            user: mockUser,
        });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders Contact component", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
        expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
        expect(screen.getByRole("map")).toBeInTheDocument();
    });

    it("fills form with user data", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
        expect(screen.getByLabelText(/full name/i).value).toBe(
            mockUser.user_metadata.name
        );
        expect(screen.getByLabelText(/email/i).value).toBe(mockUser.email);
        expect(screen.getByLabelText(/Phone Number/i).value).toBe(
            mockUser.user_metadata.phone
        );
    });

    it("shows error message when form is submitted with empty fields", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "" },
        });

        fireEvent.click(screen.getByRole("button"));
        expect(
            screen.getByText(/fill all the nessecary cases/i)
        ).toBeInTheDocument();
    });

    it("shows error message when form is submitted with invalid data", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByLabelText(/full name/i), {
            target: { value: "123" },
        });
        fireEvent.change(screen.getByPlaceholderText(/Message/i), {
            target: { value: "hssjsj" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(screen.getByText(/Invalide name/i)).toBeInTheDocument();
    });

    it("submits form with valid data", () => {
        render(
            <MemoryRouter>
                <Contact />
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText(/Message/i), {
            target: { value: "Hello!" },
        });
        fireEvent.click(screen.getByRole("button"));
        expect(mockSendMessage).toHaveBeenCalledWith(
            {
                email: "john.doe@example.com",
                name: "John Doe",
                phone: "1234567890",
                content: "Hello!",
            },
            expect.any(Object)
        );
    });
});
