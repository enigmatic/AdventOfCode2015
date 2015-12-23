var md5 = require('md5');

function checkString(str) {
    return str.substring(0, 5) == '00000';
}

function checkString2(str) {
    return str.substring(0, 6) == '000000';
}

var key = 'iwrupvqb',
    checkNum = 1,
    hash = md5(key + checkNum);

while (!checkString(hash)) {
    checkNum++;
    hash = md5(key + checkNum);
}

console.log('Result: ' + checkNum);

while (!checkString2(hash)) {
    checkNum++;
    hash = md5(key + checkNum);
}

console.log('Result2: ' + checkNum);
