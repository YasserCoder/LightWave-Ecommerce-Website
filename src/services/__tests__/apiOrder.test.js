import { describe, expect, it, vi } from "vitest";
import supabase from "../supabase";
import { addOrder } from "../apiOrder";

vi.mock("../supabase.js");

const orderData = {
    deliveryPlace: "Home Step",
    status: "pending",
    totalAmount: 120,
    customerEmail: "test@gmail.com",
    customerName: "tester",
    customerPhone: "1234567890",
    note: "",
    shippingAdress: "",
};
const prodInfo = [
    {
        id: 1,
        name: "Product 1",
        qte: 2,
        price: 120,
    },
    {
        id: 2,
        name: "Product 2",
        qte: 3,
        price: 75,
    },
];
describe("addOrder function", () => {
    it.only("should returns the Categories and subCategories in an object", async () => {
        supabase.from.mockImplementationOnce(() => ({
            insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: { id: 12 },
                        error: null,
                    }),
                }),
            }),
        }));
        supabase.from.mockImplementationOnce(() => ({
            insert: vi.fn().mockResolvedValueOnce({ error: null }),
        }));

        await addOrder({ orderData, prodInfo });

        expect(supabase.from).toHaveBeenCalledWith("order");
        expect(supabase.from).toHaveBeenCalledWith("orderItems");
        expect(supabase.from.insert).toHaveBeenLastCalledWith({ orderId: 1 });
    });
    // it("should throw an error if getCategories fails", async () => {
    //     supabase.from.mockReturnValue({
    //         select: vi.fn().mockReturnValue({
    //             order: vi.fn().mockResolvedValueOnce({
    //                 data: null,
    //                 error: { message: "Categories could not be loaded" },
    //             }),
    //         }),
    //     });

    //     await expect(getCategories()).rejects.toThrow(
    //         "Categories could not be loaded"
    //     );
    // });
});
