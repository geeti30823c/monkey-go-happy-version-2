var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score=0;
var survivalTime=0;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
 
}



function setup() {
   createCanvas(600,600); 

  
  
  monkey=createSprite(80,386,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.15;

 survivalTime=0;
  
 obstacleGroup = createGroup();
 foodGroup = createGroup(); 
  
  
}


function draw() {
background("green");
  
 ground=createSprite(400,435,900,10);
  ground.velocityX=-12; 
  ground.x = ground.width /2;
  
  if (gameState===PLAY){
    
     survivalTime =survivalTime + Math.round(getFrameRate()/60);
    
  
    
    //jump when the space key is pressed
    if(keyDown("space")) {
       monkey.velocityY = -12;
      
      if (foodGroup.isTouching(monkey)){
        
        score=score+1;
        foodGroup.destroyEach();
      }
        
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    
    if(obstacleGroup.isTouching(monkey)){
        
        gameState = END;
       
      
    }
  }
    if (gameState === END) {
      
     
   
     ground.velocityX = 0;
     monkey.velocityY = 0
      
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
     
     obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
      
      
      textSize(80);
      fill("yellow");
      text("gameover",100,200);
      
      
   }
  
 
  //stop trex from falling down
  monkey.collide(ground);
    
   

  
  spawnObstacles();
  spawnBananas();
  
  
 // survivalTime =survivalTime + Math.round(getFrameRate()/60);
    
  
  drawSprites();
  
  textSize(20);
  fill("black");
  text("SURVIVAL TIME :",360,70);
  text(survivalTime,550,70)
  
  text("SCORE :"+score,360,90);
  
}



function spawnBananas(){
  
  if(frameCount%80===0){
  
var banana=createSprite(600,330,40,20); 
 //  banana.y=Math.round(random(80,330))
     banana.y=Math.round(random(120,200))
   banana.addImage(bananaImage);
  banana.scale=0.1;
    banana.velocityX=-3;
    
    banana.lifetime=200;
    
    foodGroup.add(banana);
  }
  
}



function spawnObstacles(){
  
  if(frameCount%300===0){
    
   var obstacle=createSprite(600,409,10,40) ;
obstacle. addImage(obstacleImage);
  obstacle.scale=0.1;  
    obstacle.velocityX=-3;
    obstacle.lifetime=200;
    obstacleGroup.add(obstacle);
  }
  
}



