var dogs,database
var position

var feed,add
var foodobject
var Feedtime
var Lastfeed



function preload()

{
  dog = loadImage("images/dogImg.png")
  doghappy = loadImage("images/dogImg1.png")


}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dogs= createSprite(550,250,10,10);
  dogs.addImage(dog)
  dogs.scale=0.2
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);
  feed = createButton("FEED DOGX")
  feed.position(500,15)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,15)
  add.mousePressed(AddFood)

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(milk){
  if(milk>0){
   milk=milk-1
  }
  else{
    milk=0
  }
  database.ref('/').set({
    'Food':milk
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dogs.addImage(doghappy)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
