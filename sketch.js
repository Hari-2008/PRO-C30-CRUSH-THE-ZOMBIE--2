const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var stones = [];

function preload(){
  zombie1 = loadImage("./assets/zombie1.png");
  zombie2 = loadImage("./assets/zombie2.png");
  zombie3 = loadImage("./assets/zombie3.png");
  zombie4 = loadImage("./assets/zombie4.png");

  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0,height-10,width*2,20,"blue");
  rightWall = new Base(width,height/2+50,200,100,"brown")
  leftWall = new Base(0,height/2+50,200,100,"brown")

  bridge = new Bridge(24,{x:width/2-590,y:height/2}) 
  jointPoint = new Base(width - 100, height / 2 + 10, 40, 20, "#8d6e63", true);
  
  Matter.Composite.add(bridge.body,jointPoint);
  jointLink = new Link(bridge,jointPoint)

  for(var i = 0;i <=8; i++){
    var x =  random(width/2-200,width/2+300)
    var y =  random(-100,140);
    var stone = new Stone(x,y,40,40);
    stones.push(stone)
  }

  zombie = createSprite(width/2,height -110);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie3)
  zombie.addAnimation("righttoleft",zombie1,zombie2,zombie3)
  zombie.scale = 0.1;
  zombie.velocityX = 5;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  //breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  ground.show()
  //fill("brown")
  leftWall.show()
  rightWall.show()
  bridge.show();

  /*for(var i = 0;i<stones.length;i++){
    stones[i].show();
  }*/
  for(var stone of stones){
    stone.show()
  }

  drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  bridge.break()
  //setTimeout(()=>{
    //bridge.break();

  //},1500);
}
