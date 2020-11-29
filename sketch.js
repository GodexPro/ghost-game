var ghost,ghostim;
var tower;
var block1,block2;
var doorim,doorgroup,door;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var railing,railingim,railinggroup,invisibleblock,invisiblegroup;

function preload(){
  ghostim = loadImage("ghost-jumping.png");
  doorim = loadImage("door.png");
  railingim = loadImage("climber.png");
}

function setup(){
  createCanvas(570,450);
  
  ghost = createSprite(285,225,20,20);
  ghost.addImage(ghostim);
  ghost.scale = 0.35;  
  
  tower = loadImage("tower.png");
  
  block1 = createSprite(30,225,60,570);
  block1.visible = false;
  block2 = createSprite(540,225,60,570);
  block2.visible = false;
  
  doorgroup = createGroup();
  invisiblegroup = createGroup();
  railinggroup = createGroup();
  
  ghost.debug = true;
  
}

function draw(){
  background(tower);
  
  if(gamestate === PLAY){
  ghost.y = ghost.y+7;
  
  if(keyDown("space")){
    
    ghost.y = ghost.y-15;
  }
  
  if(keyDown("RIGHT_ARROW")){
    ghost.x = ghost.x+5;
  }
  
  
  if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x-5;
  }
    
  if(railinggroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
  }
    
    spawndoors();
    
    if(ghost.isTouching(invisiblegroup)){
      
      ghost.destroy();
      gamestate = END;
      door.velocityY = 0;
      railing.velocityY = 0;
    
    }
    
    if(ghost.y>450){
      ghost.destroy();
      gamestate = END;
      railinggroup.setVelocityYEach(0)
    }
  
  if(ghost.y<0){
    ghost.destroy();
      gamestate = END;
    railinggroup.setVelocityYEach(0)
  }
   
  }
  
  
  if(gamestate === END){
   
     
    textSize(40);
    text("Game Over",185,225);
    railinggroup.setVelocityYEach(0);
    invisiblegroup.setVelocityYEach(0);
    
    doorgroup.setVelocityYEach(0);
  }
  
  
  drawSprites();
  
  
  
  ghost.collide(block1);
  ghost.collide(block2);
  ghost.collide(railinggroup);
 
  
}

function spawndoors(){
  
  if(frameCount%80 ===0){
    
    rand = Math.round(random(80,490));
    door = createSprite(rand,-50,20,20);
    door.addImage(doorim);
    door.velocityY = +4;
    doorgroup.add(door);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth+1;
    railing = createSprite(rand,10,20,20);
    railing.velocityY = +4;
    railing.addImage(railingim);
    railinggroup.add(railing);
    railing.debug = false;
    
    invisibleblock = createSprite(rand,25,20,20);
    invisibleblock.velocityY = +4;
    invisiblegroup.add(invisibleblock);
    invisibleblock.visible = false;
    invisibleblock.debug = false;
  }
}