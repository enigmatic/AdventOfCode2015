fs = require('fs');

fs.readFile('d8Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }


    var lines = data.split('\n');
    var baseLen = 0,
        memLen = 0,
        eLen = 0;

    for (var line of lines) {
        var string = line.trim();

        var clean = string,
            encoded = string;

        /*escape codes:
         *   \\
         *   \"
         *   \x##
         */

        clean = clean.replace(/\\\\/g, '~');
        clean = clean.replace(/\\"/g, '~');
        clean = clean.replace(/\\x[0-9a-fA-F]{2}/g, '~');

        encoded = string.replace(/\\/g, '\\\\');
        encoded = encoded.replace(/"/g, '\\"');
        encoded = '"' + encoded + '"';

        var t = string.length,
            m = clean.length - 2,
            e = encoded.length;

        baseLen = baseLen + t;
        memLen = memLen + m;
        eLen = eLen + e;
        console.log(t + '-' + m + ' : ' + string + '->' + encoded);
    }

    console.log("Base: " + baseLen);
    console.log("Memory: " + memLen);
    console.log("Encoded: " + eLen);

    console.log("Part 1-Difference: " + (baseLen - memLen));
    console.log("Part 2-Difference: " + (eLen - baseLen));

});
