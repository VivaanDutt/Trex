var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var ground;
var survivalTime = 0;


function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");


  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {

  createCanvas(displayWidth - 20, displayHeight - 20);

  monkey = createSprite(80, 315, 20, 20); 
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;  
  ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background("white");
  camera.position.x = monkey.x;
  camera.position.y = displayHeight/2;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
    
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }   
  
  if (ground.x < 0) {
    ground.x = ground.width/2;
  }
  monkey.velocityY += 0.8;
  monkey.collide(ground);
  
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
  }
  
  if (monkey.isTouching(obstacleGroup)) {
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
} else {
  createBanana();
  createObstacle();
}
  

  drawSprites();
}

function createBanana() {
  if (frameCount % 140 === 0) {
    banana = createSprite(400, Math.round(random(120, 200)), 20, 20);
    banana.addImage(bananaImage); 
    banana.velocityX = -6;
    banana.scale = 0.1;
    banana.lifetime = 150;
    foodGroup.add(banana);
  } 
}

function createObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(410, 310, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -6;
    obstacle.scale = 0.26;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 150;
  }
}


