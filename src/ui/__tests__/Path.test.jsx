import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Path from "../Path";

it("reneders elements", () => {
    render(
        <MemoryRouter>
            <Path dest={["about", "payment"]} />
        </MemoryRouter>
    );
    screen.getByRole("link", { name: /home/i });

    const dest = screen.getByRole("link", { name: /about/i });
    expect(dest).toHaveAttribute("href", "/about");

    screen.getByText(/payment/i);
});
