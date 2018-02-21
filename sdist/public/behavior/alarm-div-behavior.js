// let delete = $('.delete-alarm');
var _this = this;
$('.delete-alarm').click(function () {
    var id = $(_this).attr('id');
    $(_this).toggleClass('red');
    console.log(id);
});
//# sourceMappingURL=alarm-div-behavior.js.map