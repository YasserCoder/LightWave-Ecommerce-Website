import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import CartBody from "../cart/CartBody";

const cartItems = [
    {
        product: {
            id: 1,
            name: "Product 1",
            price: 100,
            imgs: [
                {
                    imgUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
                    imgAlt: "product 1",
                },
            ],
            sale: 10,
        },
        quantity: 1,
    },
    {
        product: {
            id: 2,
            name: "Product 2",
            price: 150,
            imgs: [
                {
                    imgUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
                    imgAlt: "product 2",
                },
            ],
            sale: 0,
        },
        quantity: 3,
    },
];

describe("CartBody Component", () => {
    it("renders the cart items", () => {
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByTestId("cart-items")).toBeInTheDocument();
    });
    it("renders empty cart message when cart is empty", () => {
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={[]}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/shop now/i)).toBeInTheDocument();
        expect(screen.queryByTestId("cart-items")).not.toBeInTheDocument();
    });

    it("enable update cart button when quantity is changed", () => {
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("button", {
                name: /update cart/i,
            })
        ).toBeDisabled();

        const quantityInput = within(
            screen.getByTestId("cart-item-1")
        ).getByRole("spinbutton");

        fireEvent.change(quantityInput, { target: { value: "5" } });

        const updateButton = screen.getByRole("button", {
            name: /update cart/i,
        });
        expect(updateButton).toBeEnabled();
    });
    it("calls updateCartItem when update cart button clicked", () => {
        const updateCartItem = vi.fn();
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={updateCartItem}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        const quantityInput = within(
            screen.getByTestId("cart-item-1")
        ).getByRole("spinbutton");
        fireEvent.change(quantityInput, { target: { value: "5" } });

        const updateButton = screen.getByRole("button", {
            name: /update cart/i,
        });

        fireEvent.click(updateButton);

        expect(updateCartItem).toHaveBeenCalledWith(1, 5);
    });

    it.skip("calls deleteCartItem when delete button is clicked", async () => {
        const deleteCartItem = vi.fn();
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={deleteCartItem}
                />
            </MemoryRouter>
        );

        const deleteButton = within(
            screen.getByTestId("cart-item-1")
        ).getByTestId("delete-btn");
        fireEvent.click(deleteButton);

        const confirmDelete = await screen.findByRole("button", {
            name: /Yes, delete it/i,
        });
        fireEvent.click(confirmDelete);

        expect(deleteCartItem).toHaveBeenCalledWith(1);
    });

    it("disables inputs and buttons when isUpdating or isDeleting is true", () => {
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={true}
                    isUpdating={true}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        const updateBtn = screen.getByRole("button", {
            name: /update cart/i,
        });
        const deleteBtn = within(screen.getByTestId("cart-item-1")).getByTestId(
            "delete-btn"
        );

        expect(updateBtn).toBeDisabled();
        expect(deleteBtn).toBeDisabled();
    });
    it("displays the total price > 50 correctly", () => {
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItems}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId("total-price")).toHaveTextContent("$540.00");
    });
    it("displays the total price < 50 correctly", () => {
        let cartItem = [
            {
                product: {
                    id: 1,
                    name: "Product 1",
                    price: 50,
                    imgs: [
                        {
                            imgUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
                            imgAlt: "product 1",
                        },
                    ],
                    sale: 20,
                },
                quantity: 1,
            },
        ];
        render(
            <MemoryRouter>
                <CartBody
                    cartItems={cartItem}
                    user={{}}
                    isDeleting={false}
                    isUpdating={false}
                    updateCartItem={vi.fn()}
                    deleteCartItem={vi.fn()}
                />
            </MemoryRouter>
        );

        expect(screen.getByTestId("total-price")).toHaveTextContent("$45.00");

        const deliverySelect = screen.getByTestId("delivery-select");
        fireEvent.change(deliverySelect, { target: { value: /Door Step/i } });

        expect(screen.getByTestId("total-price")).toHaveTextContent("$47.00");
    });
});
