function describeNumber(num) {
    var numStr = num.toString(),
        newString = "",
        lastChar = numStr.charAt(0),
        charCount = 1;

    for (var i = 1; i < numStr.length; i++) {
        var nextChar = numStr.charAt(i);

        if (lastChar == nextChar) {
            charCount = charCount + 1;
        } else {
            newString = newString + charCount + lastChar;
            lastChar = nextChar;
            charCount = 1;
        }
    }

    newString = newString + charCount.toString() + lastChar;

    return newString;
}

str = '3113322113';
var count = 0;

while (count < 50) {
    count++;
    newStr = describeNumber(str);
    str = newStr;
}

console.log('length: ' + str.length);
