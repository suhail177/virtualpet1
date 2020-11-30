var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg;
function preload()
{
	dogImg = loadImage("Dog.png");
	happyDogImg = loadImage("happydog.png");
}

function setup() {
	database = firebase.database();
	createCanvas(800, 700);
	dog = createSprite(250,300,150,150);
	dog.addImage(dogImg);
	dog.scale = 0.15;
	foodStock = database.ref('food');
	foodStock.on("value",readStock);
	textSize(20);
}


function draw() {
  
	background(46,139,87);
    if(keyWentDown(UP_ARROW)){
		writeStock(foodS);
		dog.addImage(happyDogImg);
	}
	drawSprites();
	fill(255,255,255);
	stroke("black");
	text("Food Remaining: "+foodS,170,200);
	textSize(13);
	text("Note: Press up arrow to feed Drago milk!",130,10,300,20);
}
function readStock(data){
	foodS = data.val();
}
function writeStock(x){
	if(x<=0){
		x = 0
	}
	else{
		x = x-1;
	}
	database.ref('/').update({
		food:x
	})
}

