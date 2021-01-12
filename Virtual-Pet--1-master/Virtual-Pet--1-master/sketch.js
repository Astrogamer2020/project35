//Create variables here
var dog,dogImage,happyDogImage,database,foodS=20,foodStock;
var button1,button2;
var fedTime, lastFed;
var food1
function preload()
{
  //load images here
  dogImage=loadImage("images/dogImg.png");
  happyDogImage=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 1000);
  dog=createSprite(200,250,1,1);
  dog.addImage(dogImage);
  database=firebase.database();
  foodStock=database.ref("Food")
  foodStock.on("value",readStock);
  food1=new Foodclass(10,12);
  feed=createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food")
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  fedTime=database.ref("feedTime")
  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(DOWN_ARROW)){
    rewriteStock(foodS);
    
  }
  if(lastFed>=12){
    fill("black")
    text("Last Feed : "+ fedTime%12 + "PM", 350,30 );
}
else if (lastFed==0){
  fill("black")
    text("Last Feed : 12 AM",350,30);
}else{
  fill("black")
    text("Last Feed : "+fedTime +"AM",350,30);
}
  fill("black");
  text(foodS,250,250);
//fill("black");
 // text("Note:Press UP_ARROW to feed Thor",230,140);
 // fill("black");
 // text("Note:Press DOWN_ARROW to reset the game.",230,190);
 // fill("black");
 // text("Note:PLease reset the course before leaving",200,100);
  dogImage.resize(100, 100);
  happyDogImage.resize(100, 100);
food1.display();
  drawSprites();
  //add styles here

}

function readStock(data){
foodS=data.val();

}

function writeStock(m){
  if(m<=0){
    m=0;
  }
  else{
    m=m-1;
  }
database.ref("/").update({
  Food:m
})
}
function rewriteStock(m){
  if(m<=0){
    m=20;
    dog.addImage(dogImage)
  }
 
database.ref("/").update({
  Food:m
})
}
function addFoods(){
foodS++
database.ref('/').update({
  Food:foodS
})

}
function feedDog (){
  dog.addImage(happyDogImage);
foodS=foodS-1;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
  })
}