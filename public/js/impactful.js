var money_img;
var table;
var SCALE_FACTOR = 500; // Dollars per pixel
var curr_money = 100000;


function createDropdown() {
    var selector = createSelect();
    selector.position(30, 30);
    var majorSet = new Set();
    for(var i = 0; i < table.getRowCount(); i++) {
        majorSet.add(table.get(i, "Major"));
    }
    for (let major of majorSet) selector.option(major);
    selector.changed(function() { 
        curr_money = averageIncome(selector.value());
    });
}

function preload() {
    money_img = loadImage("https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Mcol_money_bag.svg/2000px-Mcol_money_bag.svg.png");
    table = loadTable("https://raw.githubusercontent.com/thomas-schweich/hci-dfu/master/public/assets/all-ages.csv", "csv", "header");
}

function setup() {
    createCanvas(750, 750);
    print(table);
    createDropdown();
}

function averageIncome(major) {
    var sum = 0;
    var num = 0;
    for (var i = 0; i < table.getRowCount(); i++) {
        var currMajor = table.get(i, "Major");
        if (currMajor === major) {
            sum += parseInt(table.get(i, "Median"));
            num++;
        }
    }
    return sum/num;
}

function draw() {
    background(255);
    image(money_img, width/2, height/2, curr_money/SCALE_FACTOR, curr_money/SCALE_FACTOR);
}