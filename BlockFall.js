// YouTube Link: 
// Cameron Martin, April 2022
// Controller Assignment

/* 
    Begin Graphics Initialization
*/

// Array showing state of the Game Board
// 0 = Empty, 1 = Player's Current Block, 2 = Enemy, 3 = Solid Block, 4 = Unbreakable Block
let gameBoard = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0]
]

// Game State Variable
let gameState = "wait";

let canvasHeight = 600;
let canvasWidth = 600;

// Variables for Game Board
let gameX = 145;
let gameY = 0;
let gameHeight = 730;
let gameWidth = 310;

// Variable for Game Board Color
let boardColor;

// Variable for Border Color
let borderColor;

// Variables for Block/Enemy/Space Colors
let enemyColor;
let playerColor;
let blockColor;
let unbreakableColor;
let emptyColor;

// Variable for currently moving Block
let curBlock;

// Array holding currently living Enemies
let enemies = [];

// Variable for Enemy Spawn Rate [0-1]
let enemySpawnRate = .5;

// Variables for Game Timer, Score
let gameTime = 0;
let score = 0;

/* 
    End Graphics Initialization
*/

/* 
    Begin Audio Initialization
*/

// Variable to store if tone has been started
let toneStarted = false;

// Variables for synths for BGM
let lowSynth;
let highSynth;

// Variable to quickly change speed of BGM
let timeCoeff = .25;

/* 
    End Audio Initialization
*/

/*
    Begin Physical Initialization
*/

// Variables for serialPDM and name of port
let serialPDM;
let portName = "COM5";

/*
    End Physical Initialization
*/

// function preload()
// {

// }

function setup() 
{
  /*
      Begin Graphics Set-Up
  */

  createCanvas(canvasWidth,canvasHeight);
  textAlign(CENTER);
  imageMode(CENTER);

  // Variable for Game Board Color
  boardColor = color(175);

  // Variable for Border Color
  borderColor = color(100);

  // Variables for Block/Enemy/Space Colors
  enemyColor = color(255,0,0);
  playerColor = color(0,0,255);
  blockColor = color(0,255,0);
  unbreakableColor = color(0);
  emptyColor = color(255);
    
  /*
      End Graphics Set-Up
  */

  /*
      Begin Audio Set-Up
  */

  // buzzer = new Tone.Player("/end_buzzer.mp3");
  // buzzer.toDestination();

  songLoop = writeSong()

  /*
      End Audio Set-Up
  */

  /*
      Begin Physical Set-Up
  */

  // // Initialize serialPDM with portName
  // serialPDM = new PDMSerial(portName);

  /*
      End Physical Set-Up
  */
}

function draw() 
{
  /*
      Begin Physical Read-In
  */

  // // Read in joyX and joyY and set cursor's movement to their values
  // let ourJoyX = serialPDM.sensorData.joyX;
  // let ourJoyY = serialPDM.sensorData.joyY;

  /*
      End Physical Read-In
  */

  /*
      Begin Graphics Draw
  */

  // Draw background and game area
  background(borderColor);
  
  
  // While waiting to start...
  if(gameState == "Wait")
  {

    // Create start text
    fill(0);
    textSize(30);
    text("Use your arduino controller or W/S to change enemy spawn rate\nThen click the play button to start the game!",300,300);
  }
  
  // When Playing the game...
  else if(gameState == "Play")
  {
    // Draw Game Board
    fill(boardColor);
    rect(gameX,gameY,gameWidth,gameHeight);

    // Create Score and Time text at bottom of screen
    fill(0);
    textSize(15);
    text("Score: " + score, 100,650);
    text("Time Left: " + timeLeft, 500,650);

    // Once per second...
    if(frameCount % 60 == 0) 
    { 
      // If block has just been placed, give player a new block
      if(curBlock == null)
      {
        curBlock = new PlayerBlock();
      }
      else
      {
        curBlock.moveDown();
      }

      // Increment timer
      gameTime += 1;
    }
  }
  
  // If game is over...
  else if(gameState == "end")
  {

    // Create final score and game over text
    fill(0);
    textSize(30);
    text("Game Over!",300,300);
    text("Final Score: " + score, 300,400);
  }

  /*
      End Graphics Draw
  */
}

function mouseClicked()
{
  if(!toneStarted) 
  {
    Tone.context.resume();
    toneStarted = true;
  }

  if(gameState == "wait")
  {
    // Update to if mouse over start button
    if(true)
    {
      // Update Game State
      gameState = "play";

      // Start music loop
      songLoop.start();
      Tone.Transport.start();

      score = 0;
      gameTime = 0;
    }
  }
  else if(gameState == "end")
  {
    // Update to if mouse over restart button
    if(true)
    {
      // Update Game State
      gameState = "play";

      // Start music loop
      songLoop.start();
      Tone.Transport.start();
    }
    // Update to if mouse over menu button
    else if(true)
    {
      // Update Game State
      gameState = "wait";
    }
  }
}

function keyPressed()
{
  if(!toneStarted) 
  {
    Tone.context.resume();
    toneStarted = true;
  }

  // A = Move Block left
  if(keyCode == 65)
  {
    if(gameState == "play")
    {

    }
  }
  // S = Place Block ("play") | Decrease Enemy Spawn Rate ("wait")
  else if(keyCode == 83)
  {
    if(gameState == "play")
    {

    }
    else if(gameState == "wait")
    {
      if(enemySpawnRate > 0) enemySpawnRate -= .1;
    }
  }
  // D = Move Block Right
  else if(keyCode == 68)
  {
    if(gameState == "play")
    {

    }
  }
  // W = Rotate Block Clockwise ("play") | Increase Enemy Spawn Rate ("wait")
  else if(keyCode == 87)
  {
    if(gameState == "play")
    {

    }
    else if(gameState == "wait")
    {
      if(enemySpawnRate < 1) enemySpawnRate += .1;
    }
  }
  // Spacebar = Swap with Hold Space
  else if(keyCode == 32)
  {
    if(gameState == "play")
    {

    }
  }
}

// Return the loop of the background music
function writeSong()
{
  return new Tone.Loop(function(time) {
    
    // Plucky Synth for low notes
    lowSynth = new Tone.Synth({
      oscillator: {
        type: "sawtooth"
      }
    }).toDestination();

    // Chimey Synth for high notes
    highSynth = new Tone.Synth({
      oscillator: {
        type: "triangle"
      }
    }).toDestination();
    
    let now = Tone.now();

    // Low Measure 1
    lowSynth.triggerAttackRelease("E3", timeCoeff, now);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff);
    lowSynth.triggerAttackRelease("E3", timeCoeff, now + timeCoeff*2);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff*3);
    lowSynth.triggerAttackRelease("E3", timeCoeff, now + timeCoeff*4);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff*5);
    lowSynth.triggerAttackRelease("E3", timeCoeff, now + timeCoeff*6);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff*7);

    // High Measure 1
    highSynth.triggerAttackRelease("E6", timeCoeff*2, now);
    highSynth.triggerAttackRelease("B5", timeCoeff, now + timeCoeff*2);
    highSynth.triggerAttackRelease("C6", timeCoeff, now + timeCoeff*3);
    highSynth.triggerAttackRelease("D6", timeCoeff, now + timeCoeff*4);
    highSynth.triggerAttackRelease("E6", timeCoeff/2, now + timeCoeff*5);
    highSynth.triggerAttackRelease("D6", timeCoeff/2, now + timeCoeff*11/2);
    highSynth.triggerAttackRelease("C6", timeCoeff, now + timeCoeff*6);
    highSynth.triggerAttackRelease("B5", timeCoeff, now + timeCoeff*7);

    // Low Measure 2
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*8);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*9);
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*10);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*11);
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*12);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*13);
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*14);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*15);

    // High Measure 2
    highSynth.triggerAttackRelease("A5", timeCoeff*2, now + timeCoeff*8);
    highSynth.triggerAttackRelease("A5", timeCoeff, now + timeCoeff*10);
    highSynth.triggerAttackRelease("C6", timeCoeff, now + timeCoeff*11);
    highSynth.triggerAttackRelease("E6", timeCoeff*2, now + timeCoeff*12);
    highSynth.triggerAttackRelease("D6", timeCoeff, now + timeCoeff*14);
    highSynth.triggerAttackRelease("C6", timeCoeff, now + timeCoeff*15);

    // Low Measure 3
    lowSynth.triggerAttackRelease("G#3", timeCoeff, now + timeCoeff*16);
    lowSynth.triggerAttackRelease("G#4", timeCoeff, now + timeCoeff*17);
    lowSynth.triggerAttackRelease("G#3", timeCoeff, now + timeCoeff*18);
    lowSynth.triggerAttackRelease("G#4", timeCoeff, now + timeCoeff*19);
    lowSynth.triggerAttackRelease("E3", timeCoeff, now + timeCoeff*20);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff*21);
    lowSynth.triggerAttackRelease("E3", timeCoeff, now + timeCoeff*22);
    lowSynth.triggerAttackRelease("E4", timeCoeff, now + timeCoeff*23);

    // High Measure 3
    highSynth.triggerAttackRelease("B5", timeCoeff*2, now + timeCoeff*16);
    highSynth.triggerAttackRelease("B5", timeCoeff/2, now + timeCoeff*18);
    highSynth.triggerAttackRelease("B5", timeCoeff/2, now + timeCoeff*37/2);
    highSynth.triggerAttackRelease("C6", timeCoeff, now + timeCoeff*19);
    highSynth.triggerAttackRelease("D6", timeCoeff*2, now + timeCoeff*20);
    highSynth.triggerAttackRelease("E6", timeCoeff*2, now + timeCoeff*22);

    // Low Measure 4
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*24);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*25);
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*26);
    lowSynth.triggerAttackRelease("A4", timeCoeff, now + timeCoeff*27);
    lowSynth.triggerAttackRelease("A3", timeCoeff, now + timeCoeff*28);
    lowSynth.triggerAttackRelease("B3", timeCoeff, now + timeCoeff*29);
    lowSynth.triggerAttackRelease("C3", timeCoeff, now + timeCoeff*30);
    lowSynth.triggerAttackRelease("D3", timeCoeff, now + timeCoeff*31);

    // High Measure 4
    highSynth.triggerAttackRelease("C6", timeCoeff*2, now + timeCoeff*24);
    highSynth.triggerAttackRelease("A5", timeCoeff*2, now + timeCoeff*26);
    highSynth.triggerAttackRelease("A5", timeCoeff*4, now + timeCoeff*28);
  }, timeCoeff*32)
}

// Mark game as over and stop the background music
function endGame()
{
  gameState = "end"
  songLoop.stop();
}

// Class for Enemies
class Enemy
{
    constructor(location)
    {

    }

    draw()
    {

    }

    moveDown()
    {

    }
}

// Class for currently controlled Block
class PlayerBlock
{
    constructor()
    {
      // Pick random shape from 5 shapes
      // 0 = Square, 1 = L, 2 = Z, 3 = T, 4 = S
      this.shape = Math.floor(Math.random() * 5);
      this.mainBlockPos = [0,5];

      // Variables for whether an enemy is covered by a non-solid block
      this.mainBlockingEnemy = false;
      this.oneBlockingEnemy = false;
      this.twoBlockingEnemy = false;
      this.threeBlockingEnemy = false;

      // Block Locations = [y,x]
      // +x = Right
      // +y = Down
      // Direction Distance
      if(this.shape = 0)
      {
        this.blockOne = [1,0];
        this.blockTwo = [0,1];
        this.blockThree = [1,1];
      }
      else if(this.shape = 1)
      {
        this.blockOne = [0,-1];
        this.blockTwo = [0,1];
        this.blockThree = [0,2];
      }
      else if(this.shape = 2)
      {
        this.blockOne = [0,-1];
        this.blockTwo = [1,0];
        this.blockThree = [1,1];
      }
      else if(this.shape = 3)
      {
        this.blockOne = [0,-1];
        this.blockTwo = [1,0];
        this.blockThree = [0,1];
      }
      else
      {
        this.blockOne = [1,0];
        this.blockTwo = [1,-1];
        this.blockThree = [0,1];
      }

      // If the block can't be spawned, end the game
      if(!this.determineValidLocation()) endGame();
      else this.addToBoard();
    }

    // Shift block left by 1 if possible
    moveLeft()
    {
      tempMainPos = [this.mainBlockPos[0],this.mainBlockPos[1] - 1];
      if(this.determineValidLocation(tempMainPos))
      {
        this.removeFromBoard();

        this.mainBlockPos = tempMainPos;

        this.addToBoard();
      }
    }

    // Shift block right by 1 if possible
    moveRight()
    {
      tempMainPos = [this.mainBlockPos[0],this.mainBlockPos[1] + 1];
      if(this.determineValidLocation(tempMainPos))
      {
        this.removeFromBoard();

        this.mainBlockPos = tempMainPos;

        this.addToBoard();
      }
    }

    // Shift Block down by 1 or Solidify if not possible
    moveDown()
    {
      tempMainPos = [this.mainBlockPos[0] + 1,this.mainBlockPos[1]];
      if(this.determineValidLocation(tempMainPos))
      {
        this.removeFromBoard();

        this.mainBlockPos = tempMainPos;

        this.addToBoard();
      }
      else
      {
        solidifyBlock();
      }
    }

    // Move Block down as far as possible then Solidify
    placeDown()
    {
      tempMainPos = [this.mainBlockPos[0] + 1,this.mainBlockPos[1]];
      while(this.determineValidLocation(tempMainPos))
      {
        tempMainPos[0] += 1;
      }
      tempMainPos[0] -= 1;

      solidifyBlock();
    }

    // Rotate Block clockwise
    rotate()
    {
      // Check if new rotation is valid
      tempBlockOne = [this.blockOne[1],-1*this.blockOne[0]];
      tempBlockTwo = [this.blockTwo[1],-1*this.blockTwo[0]];
      tempBlockThree = [this.blockThree[1],-1*this.blockThree[0]];
      if(!this.determineValidLocation(this.mainBlockPos, tempBlockOne, tempBlockTwo, tempBlockThree)) return;
      
      // Remove old locations from board
      this.removeFromBoard();

      // Update Block Locations
      this.blockOne = tempBlockOne;
      this.blockTwo = tempBlockTwo;
      this.blockThree = tempBlockThree;

      // // Update block distances
      // tempUpBlock = this.upBlock;
      // this.upBlock = this.leftBlock;
      // this.leftBlock = this.downBlock;
      // this.downBlock = this.rightBlock;
      // this.rightBlock = tempUpBlock;

      // Add new locations to board
      this.addToBoard();
    }

    // Determine if block locations are valid (not on solid or unbreakable blocks, within bounds)
    determineValidLocation(thisBlock = this.mainBlockPos, tempBlockOne = this.blockOne, tempBlockTwo = this.blockTwo, tempBlockThree = this.blockThree)
    {
      // Make sure blocks are within edges of the board and don't move onto a solid block or unbreakable block
      // Block 1
      if(thisBlock[0] + tempBlockOne[0] < 0 || thisBlock[0] + tempBlockOne[0] >= 24 
        || thisBlock[1] + tempBlockOne[1] < 0 || thisBlock[1] + tempBlockOne[1] >= 10
        || gameBoard[thisBlock[0] + tempBlockOne[0]][thisBlock[1] + tempBlockOne[1]] >= 3)
      {
        return false;
      }
      // Block 2
      if(thisBlock[0] + tempBlockTwo[0] < 0 || thisBlock[0] + tempBlockTwo[0] >= 24 
        || thisBlock[1] + tempBlockTwo[1] < 0 || thisBlock[1] + tempBlockTwo[1] >= 10
        || gameBoard[thisBlock[0] + tempBlockTwo[0]][thisBlock[1] + tempBlockTwo[1]] >= 3)
      {
        return false;
      }
      // Block 3
      if(thisBlock[0] + tempBlockThree[0] < 0 || thisBlock[0] + tempBlockThree[0] >= 24 
        || thisBlock[1] + tempBlockThree[1] < 0 || thisBlock[1] + tempBlockThree[1] >= 10
        || gameBoard[thisBlock[0] + tempBlockThree[0]][thisBlock[1] + tempBlockThree[1]] >= 3)
      {
        return false;
      }
      return true;
    }

    // Set the current block locations to 0 or, if there was an enemy there, to 2
    removeFromBoard()
    {
      if(this.mainBlockingEnemy) 
      {
        this.mainBlockingEnemy = false;
        gameBoard[this.mainBlockPos[0]][this.mainBlockPos[1]] = 2;
      }
      else gameBoard[this.mainBlockPos[0]][this.mainBlockPos[1]] = 0;

      if(this.oneBlockingEnemy) 
      {
        this.oneBlockingEnemy = false;
        gameBoard[this.mainBlockPos[0] + this.blockOne[0]][this.mainBlockPos[1] + this.blockOne[1]] = 2;
      }
      else gameBoard[this.mainBlockPos[0] + this.blockOne[0]][this.mainBlockPos[1] + this.blockOne[1]] = 0;

      if(this.twoBlockingEnemy) 
      {
        this.twoBlockingEnemy = false;
        gameBoard[this.mainBlockPos[0] + this.blockTwo[0]][this.mainBlockPos[1] + this.blockTwo[1]] = 2;
      }
      else gameBoard[this.mainBlockPos[0] + this.blockTwo[0]][this.mainBlockPos[1] + this.blockTwo[1]] = 0;

      if(this.threeBlockingEnemy) 
      {
        this.threeBlockingEnemy = false;
        gameBoard[this.mainBlockPos[0] + this.blockThree[0]][this.mainBlockPos[1] + this.blockThree[1]] = 2;
      }
      else gameBoard[this.mainBlockPos[0] + this.blockThree[0]][this.mainBlockPos[1] + this.blockThree[1]] = 0;
    }

    // Set the current block locations to 1, if an enemy was there, save that information
    addToBoard()
    {
      if(gameBoard[this.mainBlockPos[0]][this.mainBlockPos[1]] == 2) this.mainBlockingEnemy = true;
      gameBoard[this.mainBlockPos[0]][this.mainBlockPos[1]] = 1;

      if(gameBoard[this.mainBlockPos[0] + this.blockOne[0]][this.mainBlockPos[1] + this.blockOne[1]] == 2) this.oneBlockingEnemy = true;
      gameBoard[this.mainBlockPos[0] + this.blockOne[0]][this.mainBlockPos[1] + this.blockOne[1]] = 1;

      if(gameBoard[this.mainBlockPos[0] + this.blockTwo[0]][this.mainBlockPos[1] + this.blockTwo[1]] == 2) this.twoBlockingEnemy = true;
      gameBoard[this.mainBlockPos[0] + this.blockTwo[0]][this.mainBlockPos[1] + this.blockTwo[1]] = 1;

      if(gameBoard[this.mainBlockPos[0] + this.blockThree[0]][this.mainBlockPos[1] + this.blockThree[1]] == 2) this.threeBlockingEnemy = true;
      gameBoard[this.mainBlockPos[0] + this.blockThree[0]][this.mainBlockPos[1] + this.blockThree[1]] = 1;
    }
}