var cities = [],
    dist = {};

function doDist(fromCity, cityArray, path) {
    path = path + fromCity + ' -> ';


    if (cityArray.length == 1) {
        //    console.log(path + cityArray[0]);
        return [dist[fromCity + '-' + cityArray[0]], dist[fromCity + '-' + cityArray[0]]];
    }
    var minD = 10000,
        maxD = 0;

    for (var i = 0; i < cityArray.length; i++) {

        var toCity = cityArray[i];
        var myDist = 0;

        if (fromCity.length > 0) {
            myDist = dist[fromCity + '-' + toCity];
            //console.log('Found: ' + fromCity + '->' + toCity + ' : ' + myDist);
        }


        var toCities = [].concat(cityArray);
        toCities.splice(i, 1);

        var next = doDist(toCity, toCities, path)
        var minNext = myDist + next[0],
            maxNext = myDist + next[1];

        if (minD > minNext) {
            minD = minNext;
        }

        if (maxD < maxNext) {
            maxD = maxNext;
        }
    }
    return [minD, maxD];
}

fs = require('fs');

fs.readFile('d9Input.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    var lines = data.split('\n');

    for (var line of lines) {
        if (line.length = 0) {

            continue;
        }

        var string = line.trim();

        var clean = string.split(' ');
        var city1 = clean[0],
            city2 = clean[2],
            cityDist = clean[4];


        var city1Num = cities.indexOf(city1),
            city2Num = cities.indexOf(city2);

        if (city1Num == -1) {
            cities.push(city1);
            city1Num = cities.indexOf(city1);
        }

        if (city2Num == -1) {
            cities.push(city2);
            city2Num = cities.indexOf(city2);
        }

        dist[city1 + '-' + city2] = parseInt(cityDist);
        dist[city2 + '-' + city1] = parseInt(cityDist);

        console.log(city1 + '<->' + city2 + ' : ' + cityDist);
    }

    var r = doDist('', cities, '');
    var min = r[0],
        max = r[1];
    console.log('Min:' + min);
    console.log('Max:' + max);

});
