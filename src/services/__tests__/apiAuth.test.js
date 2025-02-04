import { describe, it, expect, vi } from "vitest";
import { signup, updateUser } from "../apiAuth";
import supabase from "../supabase";

vi.mock("../supabase.js");

describe("signup API function", () => {
    it("should sign up a user and insert profile successfully", async () => {
        supabase.auth.signUp.mockResolvedValueOnce({
            data: { user: { id: "user123" } },
            error: null,
        });

        supabase.from.mockReturnValue({
            insert: vi.fn().mockResolvedValueOnce({ error: null }),
        });

        const result = await signup({
            email: "test@example.com",
            password: "password123",
            name: "Test User",
            phone: "1234567890",
        });

        expect(supabase.auth.signUp).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",
            options: {
                data: {
                    name: "Test User",
                    phone: "1234567890",
                    email: "test@example.com",
                    pwd: "password123",
                },
            },
        });

        expect(supabase.from).toHaveBeenCalledWith("profile");
        expect(result).toEqual({ user: { id: "user123" } });
    });

    it("should throw an error if signUp fails", async () => {
        supabase.auth.signUp.mockResolvedValueOnce({
            data: null,
            error: { message: "Signup failed" },
        });

        await expect(
            signup({
                email: "fail@example.com",
                password: "password123",
                name: "Fail User",
                phone: "9999999999",
            })
        ).rejects.toThrow("Signup failed");
    });

    it("should throw an error if inserting profile fails", async () => {
        supabase.auth.signUp.mockResolvedValueOnce({
            data: { user: { id: "user123" } },
            error: null,
        });

        supabase.from.mockReturnValue({
            insert: vi.fn().mockResolvedValueOnce({
                error: { message: "Profile insert failed" },
            }),
        });

        await expect(
            signup({
                email: "test@example.com",
                password: "password123",
                name: "Test User",
                phone: "1234567890",
            })
        ).rejects.toThrow("Profile insert failed");
    });
});
describe("updateUser API function", () => {
    it("should update a user and update profile successfully", async () => {
        supabase.auth.updateUser.mockResolvedValueOnce({
            data: { user: { id: "user123" } },
            error: null,
        });

        supabase.from.mockReturnValue({
            update: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValueOnce({ error: null }),
            }),
        });

        const result = await updateUser({
            email: "test@example.com",
            newPassword: "password123",
            name: "Test User",
            phone: "1234567890",
            country: "Algeria",
            city: "Jijel",
            postCode: "18000",
            adress: "Soummam Road",
        });

        expect(supabase.auth.updateUser).toHaveBeenCalledWith({
            email: "test@example.com",
            password: "password123",

            data: {
                name: "Test User",
                phone: "1234567890",
                country: "Algeria",
                city: "Jijel",
                postCode: "18000",
                adress: "Soummam Road",
                email: "test@example.com",
                pwd: "password123",
            },
        });

        expect(supabase.from).toHaveBeenCalledWith("profile");
        expect(result).toEqual({ user: { id: "user123" } });
    });

    it("should throw an error if updateUser fails", async () => {
        supabase.auth.updateUser.mockResolvedValueOnce({
            data: null,
            error: { message: "Update failed" },
        });

        await expect(
            updateUser({
                email: "test@example.com",
                newPassword: "password123",
                name: "Test User",
                phone: "1234567890",
                country: "Algeria",
                city: "Jijel",
                postCode: "18000",
                adress: "Soummam Road",
            })
        ).rejects.toThrow("Update failed");
    });

    it("should throw an error if inserting profile fails", async () => {
        supabase.auth.updateUser.mockResolvedValueOnce({
            data: { user: { id: "user123" } },
            error: null,
        });

        supabase.from.mockReturnValue({
            update: vi.fn().mockReturnValue({
                eq: vi.fn().mockResolvedValueOnce({
                    error: { message: "Profile update failed" },
                }),
            }),
        });

        await expect(
            updateUser({
                email: "test@example.com",
                newPassword: "password123",
                name: "Test User",
                phone: "1234567890",
                country: "Algeria",
                city: "Jijel",
                postCode: "18000",
                adress: "Soummam Road",
            })
        ).rejects.toThrow("Profile update failed");
    });
});
