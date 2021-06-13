var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var beam1;
var beam2;
var beam3;
var engine, world;

function preload(){
   
	helicopterIMG = loadImage("helicopter.png");
	packageIMG = loadImage("package.png");

}

function setup() {

	createCanvas(800, 800);
    engine = Engine.create();
    world = engine.world;
	beam1 = new Box(400, 750, 200, 10);
	beam2 = new Box(296, 705, 10, 100)
	beam3 = new Box(500, 705, 10, 100);

	var options = {
		isStatic:true,
		restitution:1,
		frictionAir: 0.1
	}
	packageBody=Bodies.circle(400, 100, 10, options);
	World.add(world, packageBody);
	
	packageSprite=createSprite(400, 100);
	packageSprite.addImage("h", packageIMG);
	packageSprite.scale=0.2;
		

	helicopterSprite=createSprite(400, 100, 30, 30);
	helicopterSprite.addImage("h", helicopterIMG);
	helicopterSprite.scale=0.5;
	World.add(world, helicopterSprite);	
	World.add(world, packageSprite);
	
	Engine.run(engine);

}

function draw() {

	background(0);
    Engine.update(engine);

	if(keyDown(LEFT_ARROW)) {
		if (helicopterSprite.x > 100) {
			helicopterSprite.x=helicopterSprite.x-10;
			if (packageSprite.y == helicopterSprite.y)
				Matter.Body.translate(packageBody, {x:-10, y:0});
		}
	}
	if(keyDown(RIGHT_ARROW)) {
		if (helicopterSprite.x < 700) {
			helicopterSprite.x=helicopterSprite.x+10;
			if (packageSprite.y == helicopterSprite.y)
				Matter.Body.translate(packageBody, {x:10, y:0});
		}
	}
	packageSprite.x = packageBody.position.x;
	packageSprite.y = packageBody.position.y;	

	if(keyDown(DOWN_ARROW)) {
		console.log("down");
		Matter.Body.setStatic(packageBody, false);
	}

	beam1.display();
	beam2.display();
	beam3.display();

	drawSprites();

}
