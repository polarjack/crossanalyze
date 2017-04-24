var json2csv = require('json2csv')
var fs = require('fs')
var csv = require('fast-csv')

var chicken = require('./chicken_white.json')
var duck = require('./duck.json')


function threemonth(data, what) {
    var jan = data.filter((i) => {
        return (i["日期"].indexOf("2017/01/") == 0)
    })
    var feb = data.filter((i) => {
        return (i["日期"].indexOf("2017/02/") == 0)
    })
    var mar = data.filter((i) => {
        return (i["日期"].indexOf("2017/03/") == 0)
    })
    var day1 = [8, 16, 24, 31]
    var day2 = [7, 14, 21, 28]
    var jangroup = grouping(jan, day1, what)
    // console.log(jangroup)
    var febgroup = grouping(feb, day2, what)
    // console.log(febgroup)
    var margroup = grouping(mar, day1, what)
    // console.log(margroup)
    var valueall = [what].concat(jangroup).concat(febgroup).concat(margroup)
    // console.log(outputdatejan)

    return valueall;
    // return "aa"
}

function grouping(data, groupby, what) {
    var first = 0,
        second = 0,
        third = 0,
        forth = 0;
    var fday = 0,
        sday = 0,
        tday = 0,
        forthday = 0;
    data.reverse().map((value, index) => {
            if(value[what] == "休市")
                value[what] = 0
            if (index < groupby[0] - 1) {
                first += parseInt(value[what])
                fday += 1
            } else if (index < groupby[1] - 1) {
                second += parseInt(value[what])
                sday += 1
            } else if (index < groupby[2] - 1) {
                third += parseInt(value[what])
                tday += 1
            } else if (index < groupby[3] - 1) {
                forth += parseInt(value[what])
                forthday += 1
            } else {

            }
        })
    
    return [first / fday, second / sday, third / tday, forth / forthday].map(i => i.toFixed(2));
}

function buildcsv(filename, data) {
    var day1 = [8, 16, 24, 31]
    var day2 = [7, 14, 21, 28]
    var outputdatejan = [
        "17/01/01~17/01/0" + day1[0],
        "17/01/09~17/01/" + day1[1],
        "17/01/17~17/01/" + day1[2],
        "17/01/25~17/01/" + day1[3]
    ]
    var outputdatefeb = [
        "17/02/01~17/02/0" + day2[0],
        "17/02/08~17/02/" + day2[1],
        "17/02/15~17/02/" + day2[2],
        "17/02/22~17/02/" + day2[3]
    ]
    var outputdatemar = [
        "17/03/01~17/03/0" + day1[0],
        "17/03/09~17/03/" + day1[1],
        "17/03/17~17/03/" + day1[2],
        "17/03/25~17/03/" + day1[3]
    ]
    var dateall = ["日期"].concat(outputdatejan).concat(outputdatefeb).concat(outputdatemar)

    csv.write([
            dateall, data[0], data[1], data[2], data[3]
        ], {
            headers: true
        })
        .pipe( fs.createWriteStream(filename+'.csv', {encoding: "utf8"}));
}

// var aa = threemonth(duck, "肉鵝(白羅曼)")
// var bb = threemonth(duck, "正番鴨(公)")
// var cc = threemonth(duck, "土番鴨(75天)")
// var dd = threemonth(duck, "鴨蛋(新蛋)(台南)")

// var input =[aa, bb, cc, dd]

// buildcsv("鴨", input)

var keys = []
for(var k in chicken[0]) keys.push(k);
keys.shift()
keys.shift()
var input = []
keys.map((i) => {
    input.push(threemonth(chicken, i))
})
buildcsv("雞", input)

