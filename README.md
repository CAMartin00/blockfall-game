# BlockFall

 The game BlockFall created by Cameron Martin for the CSC 2463 Programming Digital Media Final Project

## Description

 BlockFall is heavily inspired by Tetris: the player moves blocks across a playfield, rotating them as necessary, trying to fill rows of the screen. The player also has access to a Hold space which allows them to store a block and swap it with another at a later time, allowing planning and preparation.
 
 In addition to usual Tetris rules, the player must also defend their blocks from enemies which will appear at the top of a column of blocks, destroying one each time a block is placed then making a row of undestroyable blocks after clearing the column. The enemies may be crushed with a block or used to clear a line, either will destroy them and prevent them from destroying more blocks or creating a row of undestroyable blocks.

## Project Description
 
 For the project we were required to set up 3 distinct sections: Graphics, Audio, and Physical Computing.

 For the Graphics Section, I created 3 distinct scenes: a welcome scene which allows the player to use the physical controller to change enemy spawn rates and a start button to begin play, a game play scene featuring the game's playing field and user information (such as their hold space, their score, etc.), and a game over scene which allows players to return to the welcome scene or game scene and displays their score and game time. I also created 2 classes (in their own .js files) to handle the blocks the player moves and the enemies the player tries to destroy.
 All game interaction is handled via the keyboard (the mouse is used to start the game, however).

 For the Audio Section, I created a Loop which plays the game song while in the game scene, as well as event which triggers the start of a sample when an enemy creates a row of unbreakable blocks. The Loop consists of two synths, one with a sawtooth oscillator and ADSR envelope, the other with a triangle oscillator.

 For the Physical Section, I assembled and programmed a controller with 2 buttonsfor increasing/decreasing enemy spawn rates as well as indicating when a row of unbreakable blocks is created with a red LED. Initially I wanted to control the entire game via the arduino and use mouse/keyboard interaction only for non-gameplay input, but, for the sake of recording the video and ease of play, I simplified the physical portion (The USB cord for my Arduino is too short to effectively record both it and the screen, and when playing with the controller was not intuitive due to the placement of buttons being restricted on the Arduino's breadboard).
 (In the end, my entire Arduino seemed to be having technical difficulties, my code is available, and I tested it prior to the issues with my Arduino and it seemed to work appropriately. The Arduino is omitted from the video as it was unusable for the gameplay).

## Demo

 [Click here to watch a YouTube video of the game!](https://youtube.com/shorts/oX35Qakjlhs?feature=share)
 
 [Click here to play the game yourself!](BlockFall/index.html)

## Controls

 Arduino buttons: | Increase/Decrease Enemy Spawn Rate on Start Screen
 
 A/D: | Move Blocks Left/Right on Play Screen
 
 W: | Increase Enemy Spawn Rate on Start Screen | Rotate Block Clockwise on Play Screen
 
 S: | Decrease Enemy Spawn Rate on Start Screen | Place Block instantly on Play Screen
 
 Spacebar: | Swap Block with Hold Space on Play Screen

## Future Development
 
 In the future, my dream for the game would be to add a story to it and make art which is cohesive to this story. I would also like to create a controller for the game, though that would require creating a chip with the buttons in the desired places, which is far outside the realm of what I can do.

 My final goal for the game would be to create a handheld device to play the game on,  with a screen for showing the game and a controller attached to it. This would require a lot of optimization and hard work in designing the device, making it infeasible for this project's time frame, but doable in the long-term.
