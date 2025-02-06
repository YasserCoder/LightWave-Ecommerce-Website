import { describe, expect, it, vi } from "vitest";
import supabase from "../supabase";
import { getProductInfo, getProducts, getProductsListe } from "../apiProducts";

vi.mock("../supabase.js");

describe("getProductInfo function", () => {
    const prodInfo = {
        id: 1,
        name: "Product 1",
        price: 120,
        categoryId: 16,
    };

    const category1 = { id: 16, name: "category1", parentId: 1 };
    const category2 = { id: 1, name: "category2", parentId: null };
    it.only("should get the productInfo successfuly", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: prodInfo,
                        error: null,
                    }),
                }),
            }),
        }));
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: category1,
                        error: null,
                    }),
                }),
            }),
        }));
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: category2,
                        error: null,
                    }),
                }),
            }),
        }));

        const result = await getProductInfo(1);

        expect(supabase.from).toHaveBeenCalledWith("product");
        expect(supabase.from).toHaveBeenCalledWith("category");
        expect(supabase.from).toHaveBeenCalledWith("category");
        expect(result).toEqual({
            id: 1,
            name: "Product 1",
            price: 120,
            categoryId: 16,
            category: ["category2", "category1"],
        });
    });
    it("should throw an error if getProductInfo fails", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: null,
                        error: "Product could not be loaded",
                    }),
                }),
            }),
        }));

        await expect(getProductInfo(1)).rejects.toThrow(
            "Product could not be loaded"
        );
    });
});

describe("getProductsListe function", () => {
    const liste = [
        { productId: 1, quantity: 3 },
        { productId: 2, quantity: 1 },
    ];
    it("should get the products liste successfuly", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: { id: 1, name: "prod1", price: 100 },
                        error: null,
                    }),
                }),
            }),
        }));
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: { id: 2, name: "prod2", price: 80 },
                        error: null,
                    }),
                }),
            }),
        }));

        const result = await getProductsListe(liste);

        expect(result).toEqual([
            { product: { id: 1, name: "prod1", price: 100 }, quantity: 3 },
            { product: { id: 2, name: "prod2", price: 80 }, quantity: 1 },
        ]);
    });
    it("should throw an error if getProductsListe fails", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: null,
                        error: "Product could not be loaded",
                    }),
                }),
            }),
        }));

        await expect(getProductsListe(liste)).rejects.toThrow(
            "Product could not be loaded"
        );
    });
});

describe("getProducts function", () => {
    const products = [
        {
            id: 1,
            name: "Product 1",
            created_at: "2023-01-01",
            sale: 10,
            price: 100,
            categoryId: 16,
        },
        {
            id: 2,
            name: "Product 2",
            created_at: "2023-01-02",
            sale: 0,
            price: 200,
            categoryId: 16,
        },
    ];

    it("should get the products successfully", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                in: vi.fn().mockReturnValue({
                    order: vi.fn().mockReturnValue({
                        range: vi.fn().mockReturnValue({
                            count: vi.fn().mockResolvedValueOnce({ count: 2 }),
                            data: products,
                            error: null,
                        }),
                    }),
                }),
            }),
        }));

        const result = await getProducts({
            category: "all",
            status: "",
            sortBy: "",
            page: 1,
            pageSize: 10,
            searchQuery: "",
        });

        expect(supabase.from).toHaveBeenCalledWith("product");
        expect(result).toEqual({ data: products, count: 2 });
    });

    it("should throw an error if getProducts fails", async () => {
        supabase.from.mockImplementationOnce(() => ({
            select: vi.fn().mockReturnValue({
                in: vi.fn().mockReturnValue({
                    order: vi.fn().mockReturnValue({
                        range: vi.fn().mockReturnValue({
                            count: vi.fn().mockResolvedValueOnce({ count: 0 }),
                            data: null,
                            error: "Products could not be loaded",
                        }),
                    }),
                }),
            }),
        }));

        await expect(
            getProducts({
                category: "all",
                status: "",
                sortBy: "",
                page: 1,
                pageSize: 10,
                searchQuery: "",
            })
        ).rejects.toThrow("Products could not be loaded");
    });
});
