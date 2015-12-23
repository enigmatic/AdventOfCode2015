var wire = {},
    wireList = [],
    wireCache = {};

function getSignal(wireName, depth) {
    if (!isNaN(parseInt(wireName))) {
        return parseInt(wireName)
    }

    if (!wire.hasOwnProperty(wireName)) {
        return -1;
    }

    if (wireCache.hasOwnProperty(wireName)) {
        //        console.log(depth + wireName + ' - CACHED:' + wireCache[wireName]);
        return wireCache[wireName];
    }

    //console.log(depth + wireName + ' - ' + wire[wireName]);
    if (-1 != depth.search(":" + wireName + ":")) {
        //        console.log("Loop on " + wireName);
        process.exit(1);
    }
    var s1, s2;

    switch (wire[wireName][0]) {
        case "VALUE":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            wireCache[wireName] = s1;
            break;
        case "AND":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            s2 = getSignal(wire[wireName][2], depth + wireName + ":");
            if (s1 == -1 || s2 == -1) {
                wireCache[wireName] = -1;
            } else {
                wireCache[wireName] = s1 & s2;
            }
            break;
        case "OR":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            s2 = getSignal(wire[wireName][2], depth + wireName + ":");
            if (s1 == -1 || s2 == -1) {
                wireCache[wireName] = -1;
            } else {
                wireCache[wireName] = s1 | s2;
            }

            break;
        case "LSHIFT":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            s2 = getSignal(wire[wireName][2], depth + wireName + ":");
            if (s1 == -1 || s2 == -1) {
                wireCache[wireName] = -1;
            } else {
                wireCache[wireName] = s1 << s2;
            }
            break;
        case "RSHIFT":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            s2 = getSignal(wire[wireName][2], depth + wireName + ":");
            if (s1 == -1 || s2 == -1) {
                wireCache[wireName] = -1;
            } else {
                wireCache[wireName] = s1 >> s2;
            }
            break;
        case "NOT":
            s1 = getSignal(wire[wireName][1], depth + wireName + ":");
            if (s1 == -1) {
                wireCache[wireName] = -1;
            } else {
                wireCache[wireName] = 65536 + ~s1; //can't handle 16-bit :(
            }
            break;
    }
    return wireCache[wireName];
}

fs = require('fs');

fs.readFile('d7Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var lines = data.split('\n');

    for (var line of lines) {
        var words = line.trim().split(' -> ');

        var wireName = words[1];

        var gate = words[0].split(' ');

        if (gate[0] == 'NOT') {
            wire[wireName] = ['NOT', gate[1]];
        } else if (gate.length == 1) {
            wire[wireName] = ['VALUE', gate[0]];
        } else {
            wire[wireName] = [gate[1], gate[0], gate[2]];
        }

        //        console.log('"' + line.trim() + '" Parsed ' + wireName + ' : ' + wire[wireName]);
    }


    var aVal = getSignal('a', "");
    console.log('Part 1) Wire a : ' + aVal);
    wireCache = {};
    wire['b'] = ['VALUE', aVal];
    console.log('Part 2) Wire a : ' + getSignal('a', ""));

});
