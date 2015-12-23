fs = require('fs');

function testDoublePairs(str) {
    for (var first = 0; first < str.length - 1; first++) {
        for (var check = first + 2; check < str.length - 1; check++) {
            if (str[first] == str[check] && str[first + 1] == str[check + 1]) {
                return true;
            }
        }

    }
    return false;
}

function testSkippedLetter(str) {
    for (var first = 0; first < str.length - 1; first++) {
        if (str[first] == str[first + 2]) {
            return true;
        }
    }
    return false;
}


fs.readFile('d5Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    var lines = data.split('\n'),
        nice = 0;
    for (var line of lines) {
        var double = testDoublePairs(line);
        var skipped = testSkippedLetter(line);

        if (skipped && double)
            nice++;

        //console.log(line.trim() + ': d-' + double + ' s-' + skipped);
    }

    console.log('Total Nice: ' + nice);
});
