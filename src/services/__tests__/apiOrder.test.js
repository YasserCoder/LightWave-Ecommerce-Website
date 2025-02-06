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
    it("should insert the order and the orderItems successfuly", async () => {
        const mockInsertOrder = vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
                single: vi.fn().mockResolvedValueOnce({
                    data: { id: 12 },
                    error: null,
                }),
            }),
        });

        const mockInsertOrderItems = vi
            .fn()
            .mockResolvedValueOnce({ error: null });

        supabase.from
            .mockImplementationOnce(() => ({ insert: mockInsertOrder })) // For "order"
            .mockImplementationOnce(() => ({ insert: mockInsertOrderItems })); // For "orderItems"

        await addOrder({ orderData, prodInfo });

        expect(supabase.from).toHaveBeenCalledWith("order");
        expect(supabase.from).toHaveBeenCalledWith("orderItems");
        expect(mockInsertOrder).toHaveBeenCalledWith([orderData]);
        expect(mockInsertOrderItems).toHaveBeenCalledWith([
            { orderId: 12, productId: 1, quantity: 2, price: 120 },
            { orderId: 12, productId: 2, quantity: 3, price: 75 },
        ]);
    });
    it("should throw an error if addOrder fails", async () => {
        supabase.from.mockReturnValue({
            insert: vi.fn().mockReturnValue({
                select: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValueOnce({
                        data: null,
                        error: { message: "Insert Order Failed" },
                    }),
                }),
            }),
        });

        await expect(addOrder({ orderData, prodInfo })).rejects.toThrow(
            "Insert Order Failed"
        );
    });
});
