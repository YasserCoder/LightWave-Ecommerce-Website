import { describe, expect, it, vi } from "vitest";
import supabase from "../supabase";
import { getCategories } from "../apiCategories";

vi.mock("../supabase.js");

describe("get Categories function", () => {
    it("should returns the Categories and subCategories in an object", async () => {
        const cats = [
            { id: 1, name: "Lighting", parentId: null },
            { id: 2, name: "Sockets", parentId: null },
            { id: 3, name: "Tools", parentId: null },
            { id: 4, name: "Lamps", parentId: 1 },
            { id: 5, name: "Desk Lamps", parentId: 4 },
            { id: 6, name: "Wall Lamps", parentId: 4 },
            { id: 7, name: "Hand Tools", parentId: 3 },
            { id: 8, name: "Screwdrivers", parentId: 7 },
        ];
        supabase.from.mockReturnValue({
            select: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValueOnce({ data: cats }),
            }),
        });

        const result = await getCategories();

        expect(supabase.from).toHaveBeenCalledWith("category");
        expect(result).toEqual({
            Lighting: {
                Lamps: {
                    "Desk Lamps": "",
                    "Wall Lamps": "",
                },
            },
            Sockets: "",
            Tools: {
                "Hand Tools": {
                    Screwdrivers: "",
                },
            },
        });
    });
    it("should throw an error if getCategories fails", async () => {
        supabase.from.mockReturnValue({
            select: vi.fn().mockReturnValue({
                order: vi.fn().mockResolvedValueOnce({
                    data: null,
                    error: { message: "Categories could not be loaded" },
                }),
            }),
        });

        await expect(getCategories()).rejects.toThrow(
            "Categories could not be loaded"
        );
    });
});
