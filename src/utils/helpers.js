export function calculateNewPrice(price, sale) {
    if (sale === 0) return price.toFixed(2);
    let saleAmount = (price * sale) / 100;
    return (price - saleAmount).toFixed(2);
}
