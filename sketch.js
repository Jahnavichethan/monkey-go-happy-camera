var PLAY=1
var END=0
var gameState=PLAY
var monkey , monkeyrunning,ground,invisibleGround
var banana ,bananaImage, stone, stoneImage,stopImage
var bananaGroup, stoneGroup
var score

function preload(){
monkeyrunning = loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
bananaImage = loadImage("banana.png");
stoneImage = loadImage("obstacle.png");
stopImage = loadImage("sprite_0.png");
}

function setup() {
createCanvas(displayWidth,displayHeight-150);

ground=createSprite(150,350,15000,15);

  
monkey=createSprite(60,317,15,15)  
monkey.addAnimation("monkey",monkeyrunning)
monkey.addImage("monkeystop",stopImage);
monkey.scale=0.10

invisibleGround=createSprite(200,355,400,10)
invisibleGround.visible=false

bananaGroup=new Group();
stoneGroup=new Group();
score=0;  
}

function draw() {
background("lightblue");
textSize(20);
text("Score: "+score,displayWidth/2,25);

camera.position.x=displayWidth/2;

  monkey.collide(invisibleGround)  
if(gameState==PLAY){

  text("press 'space key' to jump",10,20);
  if(keyDown("space")&&monkey.y>=160){
    monkey.velocityY=-10;
  }
  monkey.velocityY = monkey.velocityY + 0.4
  
  ground.velocityX=-5
  if (ground.x < 10){
      ground.x = 600/2;
    
    }
  spawnbanana();
  spawnstones();
  
  if(monkey.isTouching(bananaGroup)){
    score=score+1;
    bananaGroup.destroyEach();
  }
  
  if(monkey.isTouching(stoneGroup)){
    gameState=END;
  }
}
else if(gameState==END){
  stoneGroup.setVelocityXEach(0);
  banana.velocityX=0;
  ground.velocityX=0;
  monkey.changeImage("monkeystop",stopImage);
  text("press 'r' to restart",displayWidth/2,200);
  if(keyDown("r")&&gameState==END){
   gameState=PLAY;
  stoneGroup.destroyEach();
  bananaGroup.destroyEach();
  monkey.changeAnimation("monkey",monkeyrunning)
  score=0
  }
}
    
drawSprites();
}

function spawnbanana(){
if(frameCount%150 ==0){
  banana=createSprite(1500,100,40,10);
  banana.addImage(bananaImage);
  banana.y=Math.round(random(50,150))
  banana.scale=0.1;
  banana.velocityX=-5;
  banana.setCollider("circle",0,0,200);
  bananaGroup.add(banana);
  banana.lifetime=-1
}
}

function spawnstones(){
if(frameCount%100 ==0){
  stone=createSprite(1500,100,40,10);
  stone.addImage(stoneImage);
  stone.y=Math.round(random(330,332))
  stone.scale=0.1
  stone.velocityX=-4
  stone.setCollider("circle",0,0,200);
  stoneGroup.add(stone);
  stone.lifetime=-1
}
}




