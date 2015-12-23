var lightmap = new Array(1000);
for (var i = 0; i < 1000; i++) {
    lightmap[i] = new Array(1000);
    for (var j = 0; j < 1000; j++) {
        lightmap[i][j] = 0;
    }
}

function setLights(x1, y1, x2, y2, state) {
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);
    console.log('Setting <' + x1 + ',' + y1 + '> to <' + x2 + ',' + y2 + '> ' + state);
    for (var x = x1; x < x2 + 1; x++) {
        for (var y = y1; y < y2 + 1; y++) {

            lightmap[x][y] = state;
        }
    }
}

function toggleLights(x1, y1, x2, y2) {
    x1 = parseInt(x1);
    x2 = parseInt(x2);
    y1 = parseInt(y1);
    y2 = parseInt(y2);

    console.log('Toggling <' + x1 + ',' + y1 + '> to <' + x2 + ',' + y2 + '> ');
    for (var x = x1; x < x2 + 1; x++) {
        for (var y = y1; y < y2 + 1; y++) {
            lightmap[x][y] = 1 - lightmap[x][y];
        }
    }
}

function countState(state) {
    var count = 0;
    for (var x = 0; x < 1000; x++) {
        for (var y = 0; y < 1000; y++) {
            if (lightmap[x][y] == state) {
                count++;
            }
        }
    }
    return count;
}

fs = require('fs');

fs.readFile('d6Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    var lines = data.split('\n');

    for (var line of lines) {
        var words = line.split(' ');
        if (words[0] == 'turn') {

            var state;
            if (words[1] == 'on') {
                state = 1;
            } else {
                state = 0;
            }

            var start = words[2].split(',');
            var end = words[4].split(',');

            console.log(line.trim());

            setLights(start[0], start[1], end[0], end[1].trim(), state);
        } else { //toggle
            var start = words[1].split(',');
            var end = words[3].split(',');

            toggleLights(start[0], start[1], end[0], end[1].trim());
        }
    }

    console.log('Total lit: ' + countState(1));
});
