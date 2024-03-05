//Initializing variables for tilemap 

let tilemap = [];
let numDown = 12;
let numAcross = 12;
let tileSize = 50;
let textures = []; 


//Graphic map and tile rules 
let graphicMap = [

//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 2
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 4
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 5    THIS IS OUR X AXIS
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 6
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 7
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 8
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 9
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 10 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 11
]

let tileRules = [

//         THIS IS OUR Y AXIS
//0 1  2  3  4  5  6  7  8  9  10 11
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //0
[0, 6, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0], // 1
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 2
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 3
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 4
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 5    THIS IS OUR X AXIS
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 6
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 7
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 8
[0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], // 9
[0, 8, 3, 3, 3, 3, 3, 3, 3, 3, 7, 0], // 10 
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  // 11
]

//Initialising variables for player one - monkey
let monkey
let monkeySprite;
let monkeySpeed = 40; 
let monkeySize = tileSize; 

//For player two - bear
let bear;
let bearSprite;
let bearSpeed = 40; 
let bearSize = tileSize; 

// For ball
let ball;
let ballSprite;
let ballSpeed = 2;
let ballSize = tileSize ; 
let xpos, ypos; // Starting position of shape 


function preload() {
//Tile Textures
    textures [0] = loadImage("grass.png") ; 
    textures [1] = loadImage("grass1.png") ; 
    textures [2] = loadImage("grass2.png") ; 
    textures [3] = loadImage("grass3.png") ; 
    textures [4] = loadImage("grass4.png") ; 
    textures [5] = loadImage("grassUR.png") ; 
    textures [6] = loadImage("grassUL.png") ; 
    textures [7] = loadImage("grassBR.png") ; 
    textures [8] = loadImage("grassBL.png") ; 



//Loading sprites for player characters
    monkeySprite = loadImage("monkey.png");
    bearSprite = loadImage ("bear.png");
    ballSprite = loadImage ("ball.png");
}

function setup() {
createCanvas (600,600) ;

    let tileID = 0; // sets our tileID for the first tile that we make 

//Creates all tiles
    for (let across = 0; across < numAcross; across++) {
tilemap[across] = [];
    for (let down = 0; down < numDown; down++) {
//Setting Texture For Tile
    let textureNum = graphicMap[down][across];

//Initialising Tile
    tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); // THIS LINE CREATES OUR NEW TILE!
    tileID++;
        }
} //Tile creation finished


//Create Player
    monkey = new Monkey(monkeySprite, 2, 5, tileSize, monkeySpeed, tileSize, tileRules);
    bear = new Bear(bearSprite, 9, 5, tileSize, bearSpeed, tileSize, tileRules);
    ball = new Ball(ballSprite, ballSize, ballSpeed, tileSize, tileRules);

ball.setDirection(); //Setting intial direction for ball
}


function draw() {
    background(0);
    
// Loops through all tiles each time draw() is called
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
        
            //Calling the display() and debug() method for the current tile 
            tilemap[across][down].display(); 
            tilemap[across][down].debug(); 
        }
    }

// Finishes looping through all tiles within each draw() loop
    monkey.display();
    monkey.move();

    bear.display();
    bear.move();

    ball.display();
    ball.move();

}

function keyPressed() {
    monkey.setDirection();
    bear.setDirection();
}


class Monkey {
    constructor(monkeySprite, startAcross, startDown, monkeySize, monkeySpeed, tileSize, tileRules) {
    // Attach the monkey sprite to the class instance
        this.sprite = monkeySprite;

    // Store the starting tile coordinates
        this.across = startAcross;
        this.down = startDown;
        
    // Convert tile coordinates to pixel coordinates    
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

    // Store the size and speed of the monkey
        this.size = monkeySize;
        this.speed = monkeySpeed;

    // Store tile rules for collisions    
        this.tileRules = tileRules;
        this.tileSize = tileSize;

    // Direction of movement (initialized as 0)
        this.dirX = 0;
        this.dirY = 0;
        
    // Flag indicating if the monkey is currently moving    
        this.isMoving = false;
        
    // Target position (initialized to the current position)    
        this.tx = this.xPos; 
        this.ty = this.yPos;
    
    }

setDirection() {
    //87 is the 'W' key in ASCII
if (keyIsDown(87)) { 
    monkey.yPos -= monkey.speed; 
    }

    //83 is the 'S' key in ASCII   
if (keyIsDown(83)) { 
    monkey.yPos += monkey.speed;
    }
}


checkTargetTile() {
//Determines the current tile coordinates based on the monkey's position    
    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);

//Calculates the coordinates of the target tile based on the intended direction     
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

//Checking if the target tile is within the boundaries of the map
    if (
        nextTileHorizontal >= 0 && //top of map
        nextTileHorizontal < numAcross && //bottom of map
        nextTileVertical >= 0 && //left edge of map
        nextTileVertical < numDown //right edge of map
    ) {

//Check if the target tile is walkable, ie, not blocked (tileRules value isn't 1)        
        if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
            //Calculate the precide x and y coordinates of the target tile
            this.tx = nextTileHorizontal * this.tileSize;
            this.ty = nextTileVertical * this.tileSize;
            
            //Set the flag to indicate that the monkey is ready to move to the target tile
            this.isMoving = true;
        }
    }
}

move() { 
    //The draw loop method that executres every frame
    
    //Check if the player is currently in motion
    if (this.isMoving) {
        //this code block will only activate when this.isMoving = true. Otherwise, nothing happens.
       
        //Move the player in the direction set by setDirection()
        this.xPos += this.speed * this.dirX;
        this.yPos += this.speed * this.dirY;

        //Check if the player has reached the target position
        if (this.xPos === this.tx && this.yPos === this.ty) {
            //If the player is at the target position, stop moving and reset variables
            this.dirX = 0;
            this.dirY = 0;
        }
    }
}


display() {
    imageMode(CORNER);
    image(this.sprite, this.xPos, this.yPos, this.size, this.size);
        }
    }



class Bear {
    constructor(bearSprite, startAcross, startDown, bearSize, bearSpeed, tileSize, tileRules) {
        //Attach sprite to key in object
        this.sprite = bearSprite;

        //Store starting tile info. Later, we will use these to store the current tile the bear is on.
        this.across = startAcross;
        this.down = startDown;
        
        //Convert tile coordinates into pixel coordinates
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;

        //Store size and speed
        this.size = bearSize;
        this.speed = bearSpeed;

        //Check rules/collisions for the tile the bear wants to move to (target Tile)
        this.tileRules = tileRules;
        this.tileSize = tileSize;

        // Extra properties used to control bear movement
        // Set the initial direction to zero (not moving)
        this.dirX = 0;
        this.dirY = 0;
        
        //Check if the bear is currently moving to another tile
        this.isMoving = false;
        
        //The x/y position of the tile the bear is moving to (the target)
        this.tx = this.xPos; //Set these to the initial bear position
        this.ty = this.yPos;
    }


setDirection() {
    if (keyIsDown(UP_ARROW) && !bear.isMoving) {
        bear.yPos -= bear.speed;
    }
    if (keyIsDown(DOWN_ARROW) && !bear.isMoving) {
        bear.yPos += bear.speed;
    }
}

//This checks what tile the player wants to move to and if
//The player is allowed to move there
checkTargetTile() {
//First, get what tile the player is currently on
    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);

//Calculate the coordinates of the target tile
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

//Check is that tile is in bounds of the map
// Remember: && means AND (i.e. below is asking if ALL conditions are true)
if (
    nextTileHorizontal >= 0 && //Top of map
    nextTileHorizontal < numAcross && //Bottom of map
    nextTileVertical >= 0 && //Left edge of map
    nextTileVertical < numDown //Right edge of map
) {
    //If it is in bounds, have we set it as moveable in our ruleMap:
    if (this.tileRules[nextTileVertical][nextTileHorizontal] != 1) { // remember we have to swap these!
        //if the target tile is walkable, then...
        //...calculate the precise x and y coordinate of the target tile...
        this.tx = nextTileHorizontal * this.tileSize;
        this.ty = nextTileVertical * this.tileSize;
        
        //Because the player is ready to move there, we can set isMoving to true!
        this.isMoving = true;
        }
    }
}


    move() {
        //This is in our draw loop, so called move() is called every frame BUT...
        if (this.isMoving) {
            //This code block will only activate when this.isMoving = true. Otherwise, nothing happens.
            //So first, start by moving in direction set by setDirection()
            this.xPos += this.speed * this.dirX;
            this.yPos += this.speed * this.dirY;

            //Now check if player has reached targetX
            if (this.xPos === this.tx && this.yPos === this.ty) {
                //If there, stop moving and reset our variables
                this.isMoving = false;
                this.dirX = 0;
                this.dirY = 0;
            }
        }
    }

    display() {
        imageMode(CORNER);
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }

}
  

class Ball {
    constructor(ballSprite, ballSize, ballSpeed, tileSize, tileRules) {
        //Initialize ball properties
        this.sprite = ballSprite;
        this.size = ballSize;
        this.speed = ballSpeed;
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        this.dirX = 0;
        this.dirY = 0;
        this.isMoving = false;
        this.tx = 0;
        this.ty = 0;
        
    //Randomly position the ball on valid tiles    
        this.randomizePosition();
    }

    //Randomly position the ball on valid tiles
    
    
randomizePosition() {
    //Flag to ensure a valid position is found
    let validPosition = false;

    //Keep looping until a valid position is found
    while (!validPosition) {
        this.across = floor(random(numAcross));
        this.down = floor(random(numDown));
        
    //Check if the selected tile is valid for ball placement    
    if (this.tileRules[this.down][this.across] !== 1) {
        //Calculating pixel coordinates based on tile position
        this.xPos = this.across * this.tileSize;
        this.yPos = this.down * this.tileSize;
                validPosition = true;
            }
        }
    }

setDirection() {
    if (!this.isMoving) {
        // Randomly select -1 or 1 for left or right movement
        let randomDirection = random([-1, 1]);

        // Always move horizontally
        this.dirX = randomDirection;
        this.dirY = 0;

        // Set target tile to the canvas boundaries
        this.tx = this.dirX === -1 ? 0 : width - this.size;

        // Start moving
        this.isMoving = true;
    }
}

checkTargetTile() {
    //Calculating the next tile coordinates based on the direction
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;

    //Checking if the next tile is within the bounds of the tilemap
    if (
        nextTileHorizontal >= 0 &&
        nextTileHorizontal < numAcross &&
        nextTileVertical >= 0 &&
        nextTileVertical < numDown
    ) {
        //Checking if the next tile is valid (not an obstacle)
        if (this.tileRules[nextTileVertical][nextTileHorizontal] !== 1) {
            this.tx = nextTileHorizontal * this.tileSize;
            this.ty = nextTileVertical * this.tileSize;
            this.isMoving = true;
        }
    }
}

    move() {
        if (this.isMoving) {
            // Move the ball horizontally
            this.xPos += this.speed * this.dirX;
    
            // Check for collisions with monkey and bear
            if (this.xPos + this.size >= monkey.xPos && this.xPos <= monkey.xPos + monkey.size &&
                this.yPos + this.size >= monkey.yPos && this.yPos <= monkey.yPos + monkey.size) {
                // Reverse horizontal direction
                this.dirX *= -1;
                // Randomly change vertical direction
                this.dirY = random([-1, 1]);
            }
    
            if (this.xPos + this.size >= bear.xPos && this.xPos <= bear.xPos + bear.size &&
                this.yPos + this.size >= bear.yPos && this.yPos <= bear.yPos + bear.size) {
                // Reverse horizontal direction
                this.dirX *= -1;
                // Randomly change vertical direction
                this.dirY = random([-1, 1]);
            }
    
            // Move the ball vertically
            this.yPos += this.speed * this.dirY;
    
            // Check if the ball hits the canvas boundaries vertically
            if (this.yPos <= 0 || this.yPos + this.size >= height) {
                // Reverse vertical direction
                this.dirY *= -1;
            }
    
            // Move to the target position if the ball is close enough
            if (dist(this.xPos, this.yPos, this.tx, this.ty) < this.speed) {
                this.isMoving = false;
                this.xPos = this.tx;
                this.yPos = this.ty;
            }
        }
    }
    

    

    display() {
        imageMode(CORNER);
        // displaying the sprite image 
        image(this.sprite, this.xPos, this.yPos, this.size, this.size);
    }
}
        


class Tile {
    constructor(texture, across, down, tileSize, tileID) {
        this.texture = texture;
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize; 
        this.tileID = tileID;
    }

display() {
    // Displays the texture of the instance of the Tile class
    noStroke();
    image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize);
}

debug() {
    
    
    }
}



