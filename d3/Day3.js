fs = require('fs');

fs.readFile('d3Input.txt', 'utf8', function (err, data) {

    if (err) {
        return console.log(err);
    }

    var directions = data.split(''),
        map = {},
        houses = 1,
        lat = 0,
        long = 0;

    map["0,0"] = 1;

    for (var d of directions) {

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
        console.log(d + ' : <' + lat + ',' + long + '> Visits: ' + map[lat + "," + long]);
    }

    console.log("Houses Visited: " + houses);

});
