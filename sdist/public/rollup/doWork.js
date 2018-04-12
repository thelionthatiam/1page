function calculateAverage(arr) {
    return (arr.reduce((a, current) => a + current) / arr.length)
}


function giveLast() {
    // let arr = [1,2,3,4,5,6,7]
    let arr = [];
    for (let i = 0; i < 1000000; i++) {
        arr.push(i)
    }
    return arr
}

this.addEventListener('message', function (e) {
    var data = e.data;
    switch (data.cmd) {
        case 'average':
            var result = giveLast(); // Some function that calculates the average from the numeric array.
            self.postMessage(result);
            break;
        default:
            self.postMessage('Unknown command');
    }
}, false);