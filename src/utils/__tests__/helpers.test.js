import { describe, expect, it } from "vitest";
import { calculateNewPrice, isWhitespace } from "../helpers";

describe("calculate the new price ", () => {
    it("return the first argument rounded to two decimal places  if the second argument is 0", () => {
        const result = calculateNewPrice(120.554, 0);
        expect(result).toBe("120.55");
    });
    it("should return the new price rounded to two decimal places after the cutting the sale percentage", () => {
        const result = calculateNewPrice(50, 10);
        expect(result).toBe("45.00");
    });
});

describe("is whitespace", () => {
    it("should return true if the argument is whitespace", () => {
        const response = isWhitespace(" ");
        expect(response).toBeTruthy();
    });
    it("should return false if the argument is whitespace", () => {
        const response = isWhitespace("*");
        expect(response).toBeFalsy();
    });
});
