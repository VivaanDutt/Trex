var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground;
var survivalTime = 0;
var gameState = "start";
var jungleBackground;

function preload(){
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleBackground = loadImage("Jungle Background ( delete later ).jpg");
}



function setup() {
  createCanvas(displayWidth - 20, displayHeight - 20);
  monkey = createSprite(80, 315, 20, 20); 
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = (displayWidth*displayHeight)/9900000;
  // monkey.debug = true;
  
  
  ground = createSprite(0, displayHeight - 20, displayHeight*10, displayHeight/15);
  ground.shapeColor = "green";

  // ground.velocityX = -7;  
  // ground.x = ground.width/2;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(jungleBackground);
  camera.position.x = monkey.x;
  camera.position.y = displayHeight/2;
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  if(obstacleGroup.isTouching(monkey) === false) {
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime, 100, 50);
  }
  if (keyDown("space") && monkey.y > 800) {
    monkey.velocityY = -25;
  }   
  
  ground.velocityX = monkey.velocityX;
  // if (ground.x < 0) {
  //   ground.x = ground.width/2;
  // } 
  monkey.velocityY += 0.8;
  monkey.collide(ground);
  
  if (monkey.isTouching(foodGroup)) {
    foodGroup.destroyEach();
    score += 1;
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
    banana = createSprite(400, random((displayHeight-displayHeight/2), (displayHeight - 30)), 20, 20);
    banana.addImage(bananaImage); 
    banana.velocityX = -7;
    banana.scale = 0.1;
    banana.lifetime = 150;
    foodGroup.add(banana);
  } 
}

function createObstacle() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(displayWidth + 20, ground.y - 50, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -7;
    obstacle.scale = (displayWidth*displayHeight)/3000000;
    obstacleGroup.add(obstacle);
    obstacle.lifetime = 2000;
    // obstacle.debug = true;
    obstacle.setCollider("circle", 0, 0, 150);
  }
}


