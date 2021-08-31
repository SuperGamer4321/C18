var trex, trex_running, edges;
var groundImage;
var ground; 
var invisibleGrnd;
var rand;
var cloud , cloudImage;
var obstacle,obs1,obs2,obs3,obs4,obs5,obs6;
var score = 0 ;
var clouds , obstacles;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver , gameOverImg;
var restart , restarImg;
var jumpSnd ,dieSnd , checkpointSnd;
var endImage;

function preload(){
  
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
  restartImg = loadImage("restart.png");
  gameOverImg = loadImage("gameOver.png");
  endImage = loadAnimation("trex_collided.png");
  jumpSnd = loadSound("jump.mp3");
  checkpointSnd = loadSound("checkpoint.mp3");
  dieSnd = loadSound("die.mp3");
}

function setup(){
  createCanvas(600,200);
  
  // creating trex, properties & function
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("end",endImage);
  trex.scale = 0.5;
  trex.x = 50;
  trex.debug = false;
  trex.setCollider("rectangle",0,0,100,trex.height);
    
  ground = createSprite(300,190,600,10);
  ground.velocityX = -3
  ground.addImage("grnd" , groundImage)
  ground.x = ground.width/2;

  invisibleGrnd = createSprite(300,197,600,10);
  invisibleGrnd.visible = false

  clouds = createGroup();
  obstacles = createGroup(); 

  restart = createSprite(300,160,10,10);
  restart.addImage("restart",restartImg);
  restart.scale = 0.5;
  restart.visible = false;

  gameOver = createSprite(300,130,10,10);
  gameOver.addImage("gameO",gameOverImg);
  gameOver.scale = 0.5
  gameOver.visible = false;

  //frameRate(10);
}


function draw(){
  //set background color 
  background("white");
  // with respect to time 
  console.log(getFrameRate());

   if(gameState === PLAY){
      ground.velocityX = -(3+score/100);
      
      if(keyDown("space") && trex.y > 140){
        trex.velocityY = -10;
        jumpSnd.play();
        let message = "Hello Huda!!!"
        console.log(message);
      }
      
      trex.velocityY = trex.velocityY + 0.5;
      
      if(ground.x < 0){
        ground.x = ground.width/2;
      }
      spawnClouds();
      spawnObstacles();
      
      //= ==> assignment operator
      //=== ===> comparision operator

      //score += Math.round(getFrameRate()/60);
      
      if(frameCount%60 === 0)
      {
        score += 1;
      }  
       
      if(score % 100 === 0 && score > 0){
      checkpointSnd.play();
      }
      
      if(trex.isTouching(obstacles)){
        /*trex.velocityY = -10
        jumpSnd.play();*/
        gameState = END
        dieSnd.play();
      }
      
   }
   else if(gameState === END){
     trex.changeAnimation("end");
     ground.velocityX = 0;
     obstacles.setVelocityXEach(0);
     clouds.setVelocityXEach(0);
     clouds.setLifetimeEach(-1);
     obstacles.setLifetimeEach(-1);
     trex.velocityY = 0;
     restart.visible = true;
     gameOver.visible = true;
     if(mousePressedOver(restart)){
      reset();
    }
  }
   

  //stop trex from falling down
  trex.collide(invisibleGrnd);

  //creating clouds
  

  drawSprites();
  //depth
  text("Score : " + score , 500 ,20);
}

function reset(){
  gameState = PLAY
  gameOver.visible = false;
  restart.visible = false;
  clouds.destroyEach();
  obstacles.destroyEach();
  trex.changeAnimation("running");
  score = 0
}

function spawnClouds(){
  if(frameCount%80===0){
    cloud = createSprite(600,10,10,10);
    cloud.velocityX = -3;
    cloud.addImage("clouds" , cloudImage);
    cloud.scale = 0.5;
    cloud.y = Math.round(random(10,70));
    cloud.lifetime = 210; //-1
    //speed = distance/time ===> time = distance/speed
    cloud.depth = trex.depth;
    trex.depth += 1;
    clouds.add(cloud);
  }
}

function spawnObstacles(){
  if (frameCount%100===0){
    obstacle = createSprite(600,180,10,10);
    rand = Math.round(random(1,6));
    obstacle.velocityX = -(3+score/100);
    switch(rand){
      case 1 :
        obstacle.addImage("ob1" , obs1);
        break;
      case 2 :
       obstacle.addImage("ob2" , obs2); 
       break;
      case 3 :
        obstacle.addImage("ob3" , obs3);
        break;
      case 4 :
       obstacle.addImage("ob4" , obs4); 
       break;
      case 5 :
        obstacle.addImage("ob5" , obs5);
        break;
      case 6 :
       obstacle.addImage("ob6" , obs6); 
       break;
    } 
    obstacle.scale = 0.4
    obstacle.lifetime = 210;
    obstacles.add(obstacle);
  }
}





















