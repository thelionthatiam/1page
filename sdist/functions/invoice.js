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
function total(invoiceItems) {
    var total = 0;
    for (var i = 0; i < invoiceItems.length; i++) {
        total = total + invoiceItems[i].subtotal;
    }
    return total;
}
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
function addEmail(recieptContent, email) {
    for (var i = 0; i < recieptContent.length; i++) {
        recieptContent[i].email = email;
    }
    return recieptContent;
}
function totalItems(recieptContent) {
    var totalQuantity = 0;
    for (var i = 0; i < recieptContent.length; i++) {
        totalQuantity = totalQuantity + parseInt(recieptContent[i].quantity, 10);
    }
    return totalQuantity;
}
// DUMMY DATA
// let flan = [ {
//     product_id: 'NRA0-S-GUNS-4233',
//     name: 'National Rifle Association',
//     price: '2.00',
//     size: 's',
//     description: 'Advocates for gun-owners rights in America.',
//     quantity: '1',
//     discount: 0,
//     email: 'b@b.bb'
//   },
//    {
//       product_id: 'PPH0-S-FEM0-5783',
//       name: 'Planned Parenthood',
//       price: '2.00',
//       size: 's',
//       description: 'Advocates for womens rights in America.',
//       quantity: '25',
//       discount: 0,
//       email: 'b@b.bb' } ]
export { invoiceItems, total, addDiscount, addEmail, totalItems };
//# sourceMappingURL=invoice.js.map