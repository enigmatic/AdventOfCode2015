fs = require('fs');

fs.readFile('d3Input.txt', 'utf8', function (err, data) {

    if (err) {
        return console.log(err);
    }

    var directions = data.split(''),
        map = {},
        houses = 1,
        lat = 0,
        long = 0,
        robo = false,
        rlat = 0,
        rlong = 0;



    map["0,0"] = 1;

    for (var d of directions) {
        if (robo) {
            switch (d) {
                case '<':
                    rlat--;
                    break;
                case '>':
                    rlat++;
                    break;
                case '^':
                    rlong++;
                    break;
                case 'v':
                    rlong--;
                    break;

            }

            if (!map[rlat + "," + rlong]) {
                houses++;
                map[rlat + "," + rlong] = 1;
            } else {
                map[rlat + "," + rlong]++;
            }
        } else {

            switch (d) {
                case '<':
                    lat--;
                    break;
                case '>':
                    lat++;
                    break;
                case '^':
                    long++;
                    break;
                case 'v':
                    long--;
                    break;

            }

            if (!map[lat + "," + long]) {
                houses++;
                map[lat + "," + long] = 1;
            } else {
                map[lat + "," + long]++;
            }
        }
        robo = !robo;
    }

    console.log("Houses Visited: " + houses);

});
