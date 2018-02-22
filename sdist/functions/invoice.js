"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = [];
function invoiceItems(result) {
    var invoiceItems = [];
    var total = 0;
    for (var i = 0; i < result.length; i++) {
        var subtotal = result[i].price * result[i].quantity;
        var quantity = result[i].quantity;
        var name_1 = result[i].name;
        var obj = {
            subtotal: subtotal,
            quantity: quantity,
            name: name_1
        };
        invoiceItems.push(obj);
    }
    return invoiceItems;
}
exports.invoiceItems = invoiceItems;
function total(invoiceItems) {
    var total = 0;
    for (var i = 0; i < invoiceItems.length; i++) {
        total = total + invoiceItems[i].subtotal;
    }
    return total;
}
exports.total = total;
function addDiscount(recieptContent) {
    for (var i = 0; i < recieptContent.length; i++) {
        if (recieptContent[i].discount === 0) {
            recieptContent[i].isDiscount = false;
        }
        else if (recieptContent[i].discount > 0) {
            recieptContent[i].isDiscount = true;
            recieptContent[i].discount = ((recieptContent[i].discount) * 100);
        }
    }
    return recieptContent;
}
exports.addDiscount = addDiscount;
function addEmail(recieptContent, email) {
    for (var i = 0; i < recieptContent.length; i++) {
        recieptContent[i].email = email;
    }
    return recieptContent;
}
exports.addEmail = addEmail;
function totalItems(recieptContent) {
    var totalQuantity = 0;
    for (var i = 0; i < recieptContent.length; i++) {
        totalQuantity = totalQuantity + parseInt(recieptContent[i].quantity, 10);
    }
    return totalQuantity;
}
exports.totalItems = totalItems;
//# sourceMappingURL=invoice.js.map