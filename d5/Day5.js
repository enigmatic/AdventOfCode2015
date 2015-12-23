fs = require('fs');

fs.readFile('d5Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    var lines = data.split('\n'),
        nice = 0;


    var doubles = ['aa', 'bb', 'cc', 'dd', 'ee', 'ff', 'gg', 'hh', 'ii', 'jj', 'kk', 'll', 'mm', 'nn', 'oo', 'pp', 'qq', 'rr', 'ss', 'tt', 'uu', 'vv', 'ww', 'xx', 'yy', 'zz'];
    var dReg = new RegExp(doubles.join("|"), "g");


    var bad = ['ab', 'cd', 'pq', 'xy'];
    var bReg = new RegExp(bad.join("|"), "g");

    for (var line of lines) {
        var vR = line.match(/a|e|i|o|u/g) || [],
            bad = line.match(bReg) || [];

        var v = 0;
        if (vR)
            v = vR.length;

        var letters = line.match(dReg) || [];

        var d = letters.length,
            b = bad.length;

        if (v > 2 && d > 0 && b == 0)
            nice++;
    }

    console.log('Total Nice: ' + nice);
});
