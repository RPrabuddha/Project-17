var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score;
var survivalTime = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600,200);
  monkey = createSprite(50,160,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  
 
  ground = createSprite(300,190,600,10);

  obstacleGroup = createGroup();
  foodGroup = createGroup();
  
  
}


function draw() {
  background(225);
  
 if(gameState === PLAY){
  monkey.collide(ground);
  if(keyDown("space")&& monkey.y>=100){
   monkey.velocityY = -12;
 }
 monkey.velocityY = monkey.velocityY + 0.8;
  
   obstacles();
   food();
   
   stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/200)
  text("survivalTime:"+survivalTime,100,50);
   
   if(obstacleGroup.isTouching(monkey)){
     gameState = END;
   }
}
   if(gameState === END){
     obstacle.velocityX = 0;
     monkey.velocityY = 0;
     monkey.velocityX = 0;
      monkey.collide(ground);
     monkey.collide(obstacleGroup);
   }
 
   
   
   if(foodGroup.isTouching(monkey)){
     foodGroup.destroyEach();
   }
  
 

  drawSprites();
 
  
}

function obstacles(){
  if (frameCount % 300 === 0){
   obstacle = createSprite(550,150,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.18;
    
    obstacle.depth = monkey.depth;
    monkey.depth  = monkey.depth+1;
    
    obstacleGroup.add(obstacle);
}
}

function food() {
  if (frameCount % 200 === 0) {
    var banana = createSprite(580,120,40,10);
    banana.y = Math.round(random(120,170));
    banana.addImage(bananaImage);
    banana.scale = 0.09;
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
    foodGroup.add(banana);
  }
  }




