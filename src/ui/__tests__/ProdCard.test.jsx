import { MemoryRouter } from "react-router-dom";
import ProdCard from "../ProdCard";
import { useUser } from "../../hook/auth/useUser";
import { useProductDetails } from "../../hook/products/useProductDetails";
import { vi } from "vitest";
import { useAddCartItem } from "../../hook/cart/useAddCartItem";
import { useAddLocalCartItem } from "../../hook/cart/useAddLocalCartItem";

const MockProdCard = (id) => {
    <MemoryRouter>
        <ProdCard id={id} />;
    </MemoryRouter>;
};

vi.mock("../../hook/auth/useUser", () => ({
    useUser: vi.fn(),
}));
useUser.mockReturnValue({
    user: {
        role: "authenticated",
    },
    isLoading: false,
});
vi.mock("../../hook/products/useProductDetails", () => ({
    useProductDetails: vi.fn(),
}));
useProductDetails.mockReturnValue({
    isLoading: false,
    productInfo: {
        name: "test01",
        price: 120,
        sale: 10,
        soldOut: false,
        category: "sockets",
        imgs: [
            {
                imgUrl: "https://www.w3schools.com/images/w3schools_green.jpg",
                imgAlt: "image",
            },
        ],
    },
});

vi.mock("../../hook/cart/useAddCartItem", () => ({
    useAddCartItem: vi.fn(),
}));
useAddCartItem.mockReturnValue({
    isInserting: false,
    addCartItem: vi.fn(),
});
vi.mock("../../hook/cart/useAddLocalCartItem", () => ({
    useAddLocalCartItem: vi.fn(),
}));
useAddLocalCartItem.mockReturnValue({
    isAdding: false,
    addLocalCartItem: vi.fn(),
});
