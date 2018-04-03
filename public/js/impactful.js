var money_img;
var table;
var SCALE_FACTOR = 300; // Dollars per pixel
var curr_money = 50000;
var desired_money = curr_money;
var frameStep = 200;


function createDropdown() {
    var selector = createSelect();
    selector.position(30, 30);
    var majorSet = new Set();
    for(var i = 0; i < table.getRowCount(); i++) {
        majorSet.add(table.get(i, "Major"));
    }
    for (let major of majorSet) selector.option(major);
    selector.changed(function() { 
        desired_money = averageIncome(selector.value());
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
    imageMode(CENTER);
    textAlign(CENTER);
    textSize(50);
}

function updateDesired() {
    if (desired_money > curr_money + frameStep) {
        curr_money += frameStep;
    } else if (desired_money < curr_money - frameStep) {
        curr_money -= frameStep;
    } else {
        curr_money = desired_money;
    }
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
    updateDesired();
    image(money_img, width/2, height/2, curr_money/SCALE_FACTOR, curr_money/SCALE_FACTOR);
    text("$" + curr_money.toString(), width/2, height/6);
}