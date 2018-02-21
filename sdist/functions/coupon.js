function percentOff(percent, price) {
    return price - (price * percent);
}
function twentyOffTotal(total) {
    return percentOff(total, 0.20);
}
function itemPresent(items, item) {
    for (var i = 0; i < items.length; i++) {
        if (items[i] === item) {
            return true;
        }
    }
    return false;
}
export { percentOff };
//# sourceMappingURL=coupon.js.map