var fs = require('fs')
var csv = require('fast-csv')


var stream = fs.createReadStream("test.csv");
var input = []
var csvStream = csv()
    .on("data", function(data){
        // console.log(data)
        input.push(data);
    })
    .on("end", function(){
        //  console.log(input)
         calculate(input)
    });
stream.pipe(csvStream)

function calculate(input) {
    var index = input.shift()
    index.shift()
    index.shift()
    var howmany = index.length;
    console.log(input.reverse())
    input.reverse().map((value, index) => {
        
    })
}
