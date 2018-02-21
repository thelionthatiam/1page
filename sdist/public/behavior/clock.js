function addLeadingZeros(number) {
    if (number < 10) {
        return '0' + number.toString();
    }
    return number;
}
function theTime() {
    var clock = new Date();
    var h = addLeadingZeros(clock.getHours());
    var m = addLeadingZeros(clock.getMinutes());
    var s = addLeadingZeros(clock.getSeconds());
    return h + ':' + m;
}
window.setInterval(function () {
    var time = theTime();
    var awakeTime = $('.awakeTime').text();
    console.log(typeof awakeTime);
    $('#clock').text(time);
    if (time === awakeTime) {
        console.log('christmas miricale');
    }
}, 1000);
//# sourceMappingURL=clock.js.map