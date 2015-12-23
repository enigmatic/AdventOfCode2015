fs = require('fs');

fs.readFile('d2Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    var lines = data.split('\n'),
        area = 0,
        ribbon = 0;

    for (var line of lines) {
        var directions = line.split('x');
        var l = parseInt(directions[0]),
            w = parseInt(directions[1]),
            h = parseInt(directions[2]);

        var surface = 2 * l * w + 2 * w * h + 2 * h * l;

        var extra = 0;

        ribbon = ribbon + l * w * h;

        if (l < w) {
            ribbon = ribbon + l * 2;
            if (w < h) {
                ribbon = ribbon + w * 2;
                extra = l * w;
            } else {
                ribbon = ribbon + h * 2;
                extra = l * h;
            }
        } else { // w < l
            ribbon = ribbon + w * 2;
            if (l < h) {
                ribbon = ribbon + l * 2;
                extra = l * w;
            } else {
                ribbon = ribbon + h * 2;
                extra = w * h;
            }
        }

        area = area + surface + extra;

    }

    console.log('Total Area: ' + area);
    console.log('Ribbon: ' + ribbon);
});
